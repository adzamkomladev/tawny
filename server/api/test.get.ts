import { EmailTemplate } from "~~/types/email";
import { EmailsPayload, Queues, SmsPayload } from "~~/types/queues"

export default defineEventHandler(async (event) => {
  const emailsQueue = useQueue<EmailsPayload>(Queues.Emails, event);

  await emailsQueue.send({
    to: { email: "kilu@yopmail.com", name: "Kilu" },
    subject: "Test Email from Queue",
    templateId: EmailTemplate.AFFILIATE_APPLICATION_ACKNOWLEDGEMENT,
    data: { name: "Kilu" }
  });

  const smsQueue = useQueue<SmsPayload>(Queues.Sms, event);
  await smsQueue.send({
    recipients: ["+1234567890"],
    message: "This is a test SMS message from the queue."
  })

  return 'Email queued successfully';
})
