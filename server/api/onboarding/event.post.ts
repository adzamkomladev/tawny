import { onboardingEventSchema } from '~~/schemas/onboarding';

export default defineEventHandler(async (event) => {
  const { user } = getCurrentAuth(event)!;

  const { name, slug, description } = await readValidatedBody(event, onboardingEventSchema.parse);

  try {

    const db = useDb();

    // Get the user's selected team
    const key = `user:${user.id}:selected`;
    const selected = await hubKV().get<{ teamId: string; eventId: string | null }>(key);

    if (!selected?.teamId) {
      throw createError({ statusCode: 400, statusMessage: 'No team selected' });
    }

    // Check if slug is already in use
    const eventWithSlug = await db.query.events.findFirst({
      where: (events, { eq }) => eq(events.slug, slug),
      columns: { id: true, slug: true },
    });

    if (eventWithSlug) {
      throw createError({ statusCode: 400, statusMessage: 'Event slug already in use' });
    }

    // Create the event
    const [newEvent] = await db.insert(tables.events)
      .values({
        title: name,
        slug,
        description,
        teamId: selected.teamId,
        creatorId: user.id,
      })
      .returning();

    if (!newEvent) {
      console.log("Failed to create event:", { name, slug, description, teamId: selected.teamId, creatorId: user.id });
      throw createError({ statusCode: 500, statusMessage: 'Failed to create event' });
    }

    // Update selected event in KV
    await hubKV().set(key, { teamId: selected.teamId, eventId: newEvent.id });

    // Invalidate auth profile cache
    await invalidateCacheEntry({ name: 'authProfile', key: user.id });

    return { success: true };

  } catch (error) {
    console.error("Error in onboarding event creation:", error);
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
  }
})
