import { onboardingTeamSchema } from '~~/schemas/onboarding/team';

export default defineEventHandler(async (event) => {
  const { user } = getCurrentAuth(event)!;

  const { name, slug, description } = await readValidatedBody(event, onboardingTeamSchema.parse);

  try {
    const db = useWsDb();
    const teamWithSlug = await db.query.teams.findFirst({
      where: (teams, { eq }) => eq(teams.slug, slug),
      columns: { id: true, slug: true },
    });

    if (teamWithSlug) {
      return createError({ statusCode: 400, statusMessage: 'Team slug already in use' });
    }

    const [team] = await db.insert(tables.teams)
      .values({ name, slug, description, ownerId: user.id })
      .returning();

    if (!team) {
      console.log("Failed to create team:", { name, slug, description, ownerId: user.id });
      return createError({ statusCode: 500, statusMessage: 'Failed to create team' });
    }

    const key = `user:${user.id}:selected`;
    await hubKV().set(key, { teamId: team.id, eventId: null });

    // Invalidate auth profile cache
    await invalidateCacheEntry({ name: 'authProfile', key: user.id });

    return { success: true };

  } catch (error) {
    console.error("Error in onboarding team creation:", error);
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
  }
})
