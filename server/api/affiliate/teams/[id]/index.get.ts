import { eq, and, sql, count } from 'drizzle-orm';
import type { TeamDetails, TeamEvent } from '~~/types/affiliate/portfolio';

export default defineCachedEventHandler(
  async (event) => {
    const teamId = getRouterParam(event, 'id');

    if (!teamId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Team ID is required',
      });
    }

    const { user } = getCurrentAuth(event)!;

    try {
      const db = useDb();
      const now = new Date().toISOString();

      // Fetch team with owner info
      const teamResult = await db
        .select({
          id: tables.teams.id,
          name: tables.teams.name,
          slug: tables.teams.slug,
          description: tables.teams.description,
          tags: tables.teams.tags,
          logo: tables.teams.logo,
          banner: tables.teams.banner,
          createdAt: tables.teams.createdAt,
          ownerId: tables.teams.ownerId,
          ownerName: tables.users.name,
          ownerEmail: tables.users.email,
          ownerImage: tables.users.image,
        })
        .from(tables.teams)
        .leftJoin(tables.users, eq(tables.teams.ownerId, tables.users.id))
        .where(
          and(
            eq(tables.teams.id, teamId),
            eq(tables.teams.affiliateId, user.id)
          )
        )
        .limit(1);

      if (!teamResult.length) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Team not found',
        });
      }

      const team = teamResult[0];

      // Fetch stats
      const statsResult = await db
        .select({
          totalEvents: count(),
          liveEvents: sql<number>`count(*) filter (
            where ${tables.events.startDate} <= ${now}
            and (${tables.events.endDate} is null or ${tables.events.endDate} >= ${now})
            and ${tables.events.status} = 'published'
          )`.as('live_events'),
        })
        .from(tables.events)
        .where(eq(tables.events.teamId, teamId));

      const stats = statsResult[0] || { totalEvents: 0, liveEvents: 0 };

      // Fetch recent events (last 5)
      const recentEventsResult = await db
        .select({
          id: tables.events.id,
          title: tables.events.title,
          slug: tables.events.slug,
          status: tables.events.status,
          startDate: tables.events.startDate,
          endDate: tables.events.endDate,
          venue: tables.events.venue,
        })
        .from(tables.events)
        .where(eq(tables.events.teamId, teamId))
        .orderBy(sql`${tables.events.startDate} desc nulls last`)
        .limit(5);

      // Get asset URLs
      const assetIds = [team.logo, team.banner].filter(Boolean) as string[];
      const assetUrlsMap = await getAssetUrlsBulk(assetIds, { expiresIn: 60 * 60 });

      // Transform events (mock ticket sales and revenue for now)
      const recentEvents: TeamEvent[] = recentEventsResult.map((e) => ({
        id: e.id,
        title: e.title,
        slug: e.slug,
        status: e.status,
        startDate: e.startDate,
        endDate: e.endDate,
        venue: e.venue,
        ticketsSold: 0, // TODO: Calculate from tickets table
        totalRevenue: 0, // TODO: Calculate from payments table
      }));

      // Mock earnings data (TODO: Calculate from actual payment records)
      const earnings = {
        totalRevenue: 0,
        totalFees: 0,
        affiliateShare: 0,
        pendingPayout: 0,
        lastPayoutDate: null,
      };

      const teamDetails: TeamDetails = {
        id: team.id,
        name: team.name,
        slug: team.slug,
        description: team.description,
        tags: (team.tags as string[]) || [],
        logo: team.logo ? assetUrlsMap[team.logo] || null : null,
        banner: team.banner ? assetUrlsMap[team.banner] || null : null,
        createdAt: team.createdAt,
        owner: {
          id: team.ownerId,
          name: team.ownerName,
          email: team.ownerEmail,
          image: team.ownerImage,
        },
        stats: {
          totalEvents: Number(stats.totalEvents) || 0,
          liveEvents: Number(stats.liveEvents) || 0,
          totalTicketsSold: 0, // TODO: Calculate
        },
        earnings,
        recentEvents,
      };

      return {
        success: true,
        data: teamDetails,
      };
    } catch (error: any) {
      if (error.statusCode) throw error;

      console.error('Error fetching team details:', error);
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
      });
    }
  },
  {
    maxAge: 60 * 5, // Cache for 5 minutes
    swr: true,
    getKey: (event) => {
      const { user } = getCurrentAuth(event) || {};
      const teamId = getRouterParam(event, 'id');
      return `affiliate-team-details:${user?.id || 'anon'}:${teamId}`;
    },
  }
);
