import { eq } from 'drizzle-orm';
import { onboardingRoleSchema } from '~~/schemas/onboarding';

export default defineEventHandler(async (event) => {
  const { user } = getCurrentAuth(event)!;

  const { role } = await readValidatedBody(event, onboardingRoleSchema.parse);

  try {
    const db = useWsDb();

    const userWithRole = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.role, role),
      columns: { id: true, role: true },
    });

    if (userWithRole) {
      return createError({ statusCode: 400, statusMessage: 'Role of user has already been set' });
    }

    const [userWithRoleUpdated] = await db.update(tables.users)
      .set({ role })
      .where(eq(tables.users.id, user.id))
      .returning();

    await invalidateCacheEntry({ name: 'authProfile', key: user.id });

    if (!userWithRoleUpdated) {
      console.log("Failed to update user role:", { role, userId: user.id });
      return createError({ statusCode: 500, statusMessage: 'Failed to update user role' });
    }

    return { success: true };

  } catch (error) {
    console.error("Error in updating user role:", error);
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
  }
})
