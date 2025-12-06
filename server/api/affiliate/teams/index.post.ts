import { inArray } from 'drizzle-orm';
import { EmailTemplate } from '~~/types/email';
import { EmailsPayload, Queues } from '~~/types/queues';
import { createTeamSchema } from '~~/schemas/affiliate/teams';

export default defineEventHandler(async (event) => {
  const { user } = requireAuth(event);

  const body = await readValidatedBody(event, createTeamSchema.parse);

  try {
    const db = useDb();
    const auth = useAuth();

    const existingTeam = await db.query.teams.findFirst({
      where: (teams, { eq }) => eq(teams.slug, body.slug),
      columns: { id: true },
    });

    if (existingTeam) {
      return createError({
        statusCode: 400,
        statusMessage: 'Team slug is already in use',
      });
    }

    // Check if admin email already has an account
    const existingUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, body.adminEmail),
      columns: { id: true, email: true },
    });

    if (existingUser) {
      return createError({
        statusCode: 400,
        statusMessage: 'A user with this email already exists. Please use a different email for the team owner.',
      });
    }

    const plainPassword = generatePassword(12);
    const createUserRes = await auth.api.createUser({
      body: {
        name: body.adminName,
        email: body.adminEmail,
        password: plainPassword,
        role: 'organizer',
      },
    });


    if (!createUserRes?.user) {
      return createError({
        statusCode: 500,
        statusMessage: 'Failed to create admin user account',
      });
    }

    const adminUserId = createUserRes.user.id;

    const result = await db.transaction(async (tx) => {

      const [team] = await tx.insert(tables.teams)
        .values({
          name: body.name,
          slug: body.slug,
          description: body.description,
          tags: body.tags,
          ownerId: adminUserId,
          affiliateId: user.id,
          logo: body.logoAssetId ?? null,
          banner: body.bannerAssetId ?? null,
        })
        .returning();

      if (!team) {
        throw new Error('Failed to create team');
      }

      // TODO: Create membership record etc. as owner

      if (body.logoAssetId || body.bannerAssetId) {
        const assetIds = [body.logoAssetId, body.bannerAssetId].filter(Boolean) as string[];

        await tx.update(tables.assets)
          .set({ linkedAt: new Date() })
          .where(inArray(tables.assets.id, assetIds));
      }

      return { team };
    });

    // await invalidateCacheByPrefix('nitro:handlers:_:affiliateteams');


    const config = useRuntimeConfig();
    try {

      await useQueue<EmailsPayload>(Queues.Emails, event).send({
        to: { name: body.adminName, email: body.adminEmail },
        subject: `Welcome to ${body.name} on Tix4u`,
        templateId: EmailTemplate.TEAM_OWNER_WELCOME,
        data: {
          affiliateName: user.name || 'Affiliate',
          name: body.adminName,
          teamName: body.name,
          email: body.adminEmail,
          password: plainPassword,
          loginUrl: `${config.public.appUrl}/login`,
        }
      });
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
    }

    return {
      success: true,
      team: {
        id: result.team.id,
        name: result.team.name,
        slug: result.team.slug,
      },
    };
  } catch (error) {
    // Re-throw HTTP errors
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error;
    }

    console.error('Error creating team:', error);
    return createError({
      statusCode: 500,
      statusMessage: "It's not you, it's us. Kindly try again later or reach out to our support team!",
    });
  }
});
