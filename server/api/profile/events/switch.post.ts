import { switchEventSchema } from '~~/schemas/auth';

export default defineEventHandler(async (event) => {
  const { user } = getCurrentAuth(event)!;

  const { eventId } = await readValidatedBody(event, switchEventSchema.parse);

  try {
    const db = useDb();

    const eventRecord = await db.query.events.findFirst({
      where: (events, { eq }) => eq(events.id, eventId),
      columns: { id: true, teamId: true },
    });

    if (!eventRecord) {
      return createError({ statusCode: 404, statusMessage: 'Event not found' });
    }

    const key = `user:${user.id}:selected`;
    await hubKV().set(key, { teamId: eventRecord.teamId, eventId });

    await invalidateCacheEntry({ name: 'authProfile', key: user.id });

    return { success: true };
  } catch (error) {
    console.error("Error in switching event:", error);
    return createError({ statusCode: 500, statusMessage: "It's not you, it's us. Please try again later or contact support!" });
  }
});