import { and, eq } from 'drizzle-orm';
import { verifyAffiliateTokenSchema } from '~~/schemas/onboarding';

export default defineEventHandler(async (event) => {
  const { user } = getCurrentAuth(event)!;

  const { token } = await readValidatedBody(event, verifyAffiliateTokenSchema.parse);

  try {
    const db = useDb();

    const [affiliateApplication] = await db.update(tables.affiliateApplications)
      .set({ status: 'verified'  })
      .where(and(
        eq(tables.affiliateApplications.email, user.email),
        eq(tables.affiliateApplications.verification_code, token),
        eq(tables.affiliateApplications.status, 'accepted'),
      ))
      .returning();
    
    
    if (!affiliateApplication) {
      console.log("Failed to verify affiliate token:", { token, userId: user.id });
      return createError({ statusCode: 400, statusMessage: 'Invalid token or application not accepted' });
    }

    await invalidateCacheEntry({ name: 'authProfile', key: user.id });

    return { success: true };
  } catch (error) {
    console.error("Error verifying affiliate token:", error);
    return createError({ statusCode: 500, statusMessage: "It's not you, it's us. Please try again later or reach out to our support team!" });
  }
})
