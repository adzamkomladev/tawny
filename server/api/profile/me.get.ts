import { AuthProfile, ProfileTeam, ProfileUser } from '~~/types/profile';

export default defineEventHandler(async (event) => {
  const { user } = getCurrentAuth(event)!;
  
  try {
    await invalidateCacheEntry({ name: 'authProfile', key: user.id });

    const authProfile = await retrieveAuthProfile(user.id);

    return { success: true, user: authProfile };
  } catch (error) {
    console.error("Error in onboarding team creation:", error);
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
  }
});


const retrieveTeam = async (db: ReturnType<typeof useDb>, userId: string) => {
  const teams = await db.query.teams.findMany({
    where: (teams, { eq, and, or }) => and(
      eq(teams.ownerId, userId),
      or(eq(teams.affiliateId, userId), eq(teams.ownerId, userId))
    ),
    columns: {
      id: true,
      ownerId: true,
      affiliateId: true,
      name: true,
      slug: true,
      logo: true,
    },
  });

  const teamIds = teams.map(team => team.id);

  const events = await db.query.events.findMany({
    where: (events, { inArray }) => inArray(events.teamId, teamIds),
    columns: {
      id: true,
      teamId: true,
      title: true,
      slug: true,
      logo: true,
    },
  });

  return teams.map(team => {
    const teamEvents = events.filter(event => event.teamId === team.id);

    return {
      ...team,
      events: teamEvents,
    };
  })
}

const retrieveUser = async (db: ReturnType<typeof useDb>, userId: string) => {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, userId),
  });

  return user;
}

const retrieveSelected = async (userId: string) => {
  const key = `user:${userId}:selected`;
  const selected = await hubKV().get<{ teamId: string | null, eventId: string | null }>(key);

  return selected;
};

const getAssetIds = (user: ProfileUser, teams: ProfileTeam[]) => {
  const assetIds = new Set<string>();

  if (user.image) {
    assetIds.add(user.image);
  }

  teams.forEach(team => {
    if (team.logo) {
      assetIds.add(team.logo);
    }
    team.events.forEach(event => {
      if (event.logo) {
        assetIds.add(event.logo);
      }
    });
  });

  return Array.from(assetIds);
};


const assignAssetUrlsToProfileDetails = (
  user: ProfileUser,
  teams: ProfileTeam[],
  selected: { teamId: string | null, eventId: string | null } | null,
  assetsWithUrls: Record<string, string | null>
): AuthProfile => {
  if (user.image && assetsWithUrls[user.image]) {
    user.image = assetsWithUrls[user.image]!;
  } else {
    user.image = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&size=256`;
  }

  teams.forEach(team => {
    if (team.logo && assetsWithUrls[team.logo]) {
      team.logo = assetsWithUrls[team.logo]!;
    } else {
      team.logo = `https://ui-avatars.com/api/?name=${encodeURIComponent(team.name)}&background=random&size=256`;
    }
    team.events.forEach(event => {
      if (event.logo && assetsWithUrls[event.logo]) {
        event.logo = assetsWithUrls[event.logo]!;
      } else {
        event.logo = `https://ui-avatars.com/api/?name=${encodeURIComponent(event.title)}&background=random&size=256`;
      }
    });
  });

  return { ...user, teams, selected };
}


export const retrieveAuthProfile = defineCachedFunction(async (userId: string) => {
  const db = useDb();

  const [user, teams, selected] = await Promise.all([
    retrieveUser(db, userId),
    retrieveTeam(db, userId),
    retrieveSelected(userId),
  ]);

  const assetIds = getAssetIds(user!, teams);

  const assetsWithUrls = assetIds.length === 0 ? {} : await getAssetUrlsBulk(assetIds, { expiresIn: 60 * 60 * 2 });

  return assignAssetUrlsToProfileDetails(user!, teams, selected, assetsWithUrls);
}, {
  maxAge: 60 * 60 * 2, // 2 hours,
  name: "authProfile",
  getKey: (userId: string) => userId,
});
