import type { EmailTemplate } from "~~/types/email";

export enum Queues {
    Emails = 'emails',
    Sms = 'sms',
}

export interface EmailsPayload {
    to: { name?: string; email: string };
    subject: string;
    templateId: EmailTemplate;
    data: Record<string, any>;
}

export interface SmsPayload {
    recipients: string[];
    message: string;
}