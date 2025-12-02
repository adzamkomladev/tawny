import type { Message } from '@cloudflare/workers-types/experimental';

import { EmailsPayload, SmsPayload } from "~~/types/queues";

export const processEmailMessagesJob = async (message: Message<EmailsPayload>) => {
    const { to, subject, templateId, data } = message.body;
    await sendTemplatedEmail(to, subject, templateId, data);
    message.ack();
}

export const processSmsMessagesJob = async (message: Message<SmsPayload>) => {
    const { recipients, message: smsMessage } = message.body;

    await sendSms(recipients, smsMessage);
    message.ack();
}