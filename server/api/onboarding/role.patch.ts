import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const { user } = getCurrentAuth(event)!;

  try {
    const db = useDb();

    const [userWithRoleUpdated] = await db.update(tables.users)
      .set({ role: null })
      .where(eq(tables.users.id, user.id))
      .returning();

    await invalidateCacheEntry({ name: 'authProfile', key: user.id });

    if (!userWithRoleUpdated) {
      console.log("Failed to clear role:", { role: null, userId: user.id });
      return createError({ statusCode: 500, statusMessage: 'Failed to clear user role' });
    }

    return { success: true };

  } catch (error) {
    console.error("Error in clearing user role:", error);
    return createError({ statusCode: 500, statusMessage: "It's not you, it's us. Please try again later or reach out to our support team!" });
  }
})
