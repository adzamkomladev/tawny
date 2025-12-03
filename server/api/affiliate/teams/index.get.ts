import { eq, and, ilike, or, count, sql, desc, type SQL } from 'drizzle-orm';
import { EventInfo, TeamData } from '~~/types/affiliate/teams';
import { listTeamsQuerySchema } from '~~/schemas/affiliate/teams';


export default defineCachedEventHandler(
  async (event) => {
    const { page, size, search } = await getValidatedQuery(event, listTeamsQuerySchema.parse);
    
    const { user } = getCurrentAuth(event)!;
    
    try {
      const db = useDb();
      const offset = (page - 1) * size;
      const now = new Date().toISOString();

      const whereCondition = buildSearchCondition(user.id, search);

      // Get total count and teams data in parallel
      const [countResult, teamsData] = await Promise.all([
        db
          .select({ total: count() })
          .from(tables.teams)
          .where(whereCondition),
        db
          .select({
            id: tables.teams.id,
            name: tables.teams.name,
            slug: tables.teams.slug,
            logo: tables.teams.logo,
            banner: tables.teams.banner,
            createdAt: tables.teams.createdAt,
            ownerId: tables.teams.ownerId,
            ownerName: tables.users.name,
            ownerEmail: tables.users.email,
          })
          .from(tables.teams)
          .leftJoin(tables.users, eq(tables.teams.ownerId, tables.users.id))
          .where(whereCondition)
          .orderBy(desc(tables.teams.createdAt))
          .limit(size)
          .offset(offset),
      ]);

      const total = countResult[0]?.total || 0;
      const teamIds = teamsData.map((t) => t.id);

      // Fetch event counts and ongoing status for each team
      const eventsData =
        teamIds.length > 0
          ? await db
              .select({
                teamId: tables.events.teamId,
                totalEvents: count(),
                hasOngoingEvent: sql<boolean>`bool_or(
                  ${tables.events.startDate} <= ${now}
                  AND (${tables.events.endDate} IS NULL OR ${tables.events.endDate} >= ${now})
                  AND ${tables.events.status} = 'published'
                )`.as('has_ongoing_event'),
              })
              .from(tables.events)
              .where(
                sql`${tables.events.teamId} IN (${sql.join(teamIds.map((id) => sql`${id}`), sql`, `)})`
              )
              .groupBy(tables.events.teamId)
          : [];

      const eventsMap = buildEventsMap(eventsData);

      // Get logo and banner asset URLs
      const logoIds = teamsData.map((t) => t.logo).filter(Boolean) as string[];
      const bannerIds = teamsData.map((t) => t.banner).filter(Boolean) as string[];
      const allAssetIds = [...new Set([...logoIds, ...bannerIds])];
      const assetUrlsMap = await getAssetUrlsBulk(allAssetIds, { expiresIn: 60 * 60 });

      // Transform to response format
      const teams = teamsData.map((team) =>
        transformTeamData(team, eventsMap, assetUrlsMap)
      );

      return {
        success: true,
        data: {
          teams,
          meta: buildPaginationMeta(page, size, total),
        },
      };
    } catch (error) {
      console.error('Error fetching affiliate teams:', error);
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
      });
    }
  },
  {
    maxAge: 60 * 60, // Cache for 1 hour (3600 seconds)
    swr: true, // Stale-while-revalidate
    getKey: (event) => {
      const { user } = getCurrentAuth(event) || {};
      const query = getQuery(event);
      const page = query.page || '1';
      const size = query.size || '10';
      const search = query.search || '';
      return `affiliate-teams:${user?.id || 'anon'}:${page}:${size}:${search}`;
    },
  }
);


// Helper functions
const buildSearchCondition = (affiliateId: string, search: string): SQL => {
  const baseCondition = eq(tables.teams.affiliateId, affiliateId);

  if (!search) return baseCondition;

  const searchCondition = or(
    ilike(tables.teams.name, `%${search}%`),
    ilike(tables.teams.slug, `%${search}%`)
  );

  return and(baseCondition, searchCondition)!;
};

const buildEventsMap = (
  eventsData: { teamId: string; totalEvents: number; hasOngoingEvent: boolean }[]
): Map<string, EventInfo> => {
  return new Map(
    eventsData.map((e) => [
      e.teamId,
      { totalEvents: e.totalEvents, hasOngoingEvent: e.hasOngoingEvent },
    ])
  );
};

const transformTeamData = (
  team: TeamData,
  eventsMap: Map<string, EventInfo>,
  assetUrlsMap: Record<string, string | null>
) => {
  const eventInfo = eventsMap.get(team.id);

  return {
    id: team.id,
    name: team.name,
    slug: team.slug,
    logo: team.logo ? assetUrlsMap[team.logo] || null : null,
    banner: team.banner ? assetUrlsMap[team.banner] || null : null,
    owner: {
      id: team.ownerId,
      name: team.ownerName,
      email: team.ownerEmail,
    },
    totalEvents: eventInfo?.totalEvents || 0,
    hasOngoingEvent: eventInfo?.hasOngoingEvent || false,
    createdAt: team.createdAt,
  };
};

const buildPaginationMeta = (page: number, size: number, total: number) => {
  const totalPages = Math.ceil(total / size);

  return {
    page,
    size,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
};
