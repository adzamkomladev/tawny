import { applySchema } from '~~/schemas/affiliates';
import { EmailTemplate } from '../../../types/email';

export default defineEventHandler(async (event) => {
  const { name, email, phone, reason, acceptTerms } = await readValidatedBody(
    event,
    applySchema.parse
  );

  try {
    const db = useDb();

    // Check if there's already a pending or approved application with this email
    const existingApplication = await db.query.affiliateApplications.findFirst({
      where: (applications, { eq, and, inArray }) =>
        and(
          eq(applications.email, email),
          inArray(applications.status, ['pending', 'approved'])
        ),
      columns: { id: true, status: true },
    });

    if (existingApplication) {
      const message = existingApplication.status === 'pending'
        ? 'You already have a pending application. Please wait for our team to contact you.'
        : 'You have already been approved as an affiliate. Please sign up to complete your registration.';

      throw createError({
        statusCode: 400,
        statusMessage: message,
      });
    }

    // Create the affiliate application
    const [application] = await db
      .insert(tables.affiliateApplications)
      .values({
        name,
        email,
        phone,
        reason,
        acceptTerms,
        status: 'pending',
      })
      .returning();

    if (!application) {
      console.error("Failed to create affiliate application:", { name, email });
      return createError({
        statusCode: 500,
        statusMessage: 'Failed to submit application',
      });
    }

    try {
      await Promise.all([
        sendTemplatedEmail(
          { name, email },
          "Affiliate Application Received",
          EmailTemplate.AFFILIATE_APPLICATION_ACKNOWLEDGEMENT,
          { name }
        ),
        sendSms([phone], "Thank you for your affiliate application. We will review it and get back to you shortly.")
      ]);
    } catch (error) {
      console.error("Failed to send affiliate application confirmation:", error);
    }

    return { success: true };
  } catch (error) {
    // Re-throw if it's already a H3 error
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error;
    }

    console.error("Error in affiliate application:", error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    });
  }
});
