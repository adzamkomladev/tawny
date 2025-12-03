import { eq, and } from 'drizzle-orm';
import { updateTeamSchema } from '~~/schemas/affiliate/teams';

export default defineEventHandler(async (event) => {
  const teamId = getRouterParam(event, 'id');

  if (!teamId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Team ID is required',
    });
  }

  const { user } = getCurrentAuth(event)!;
  const body = await readValidatedBody(event, updateTeamSchema.parse);

  try {
    const db = useDb();

    // Verify team exists and belongs to this affiliate
    const existingTeam = await db
      .select({ id: tables.teams.id })
      .from(tables.teams)
      .where(
        and(
          eq(tables.teams.id, teamId),
          eq(tables.teams.affiliateId, user.id)
        )
      )
      .limit(1);

    if (!existingTeam.length) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Team not found',
      });
    }

    // Build update object
    const updateData: Record<string, unknown> = {};

    if (body.name !== undefined) updateData.name = body.name;
    if (body.slug !== undefined) updateData.slug = body.slug;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.tags !== undefined) updateData.tags = body.tags;
    if (body.logoAssetId !== undefined) updateData.logo = body.logoAssetId;
    if (body.bannerAssetId !== undefined) updateData.banner = body.bannerAssetId;

    // Only update if there are changes
    if (Object.keys(updateData).length > 0) {
      await db
        .update(tables.teams)
        .set(updateData)
        .where(eq(tables.teams.id, teamId));
    }

    return {
      success: true,
      message: 'Team updated successfully',
    };
  } catch (error: any) {
    if (error.statusCode) throw error;

    console.error('Error updating team:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    });
  }
});
