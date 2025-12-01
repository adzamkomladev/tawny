import { EmailTemplate } from "../../types/email";
import { EmailsPayload, Queues } from "../../types/queues"
import { useQueue } from "../utils/queues"

export default defineEventHandler(async (event) => {
  const emailsQueue = useQueue<EmailsPayload>(event, Queues.Emails);

  await emailsQueue.send({
    to: { email: "kilu@yopmail.com", name: "Kilu" },
    subject: "Test Email from Queue",
    templateId: EmailTemplate.AFFILIATE_APPLICATION_ACKNOWLEDGEMENT,
    data: { name: "Kilu" }
  });

  return 'Email queued successfully';
})
