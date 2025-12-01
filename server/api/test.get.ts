import { EmailTemplate } from "~~/types/email";
import { EmailsPayload, Queues } from "~~/types/queues"

export default defineEventHandler(async (event) => {
  const emailsQueue = useQueue<EmailsPayload>(Queues.Emails, event);

  await emailsQueue.send({
    to: { email: "kilu@yopmail.com", name: "Kilu" },
    subject: "Test Email from Queue",
    templateId: EmailTemplate.AFFILIATE_APPLICATION_ACKNOWLEDGEMENT,
    data: { name: "Kilu" }
  });

  return 'Email queued successfully';
})
