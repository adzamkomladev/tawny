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
    to: string[];
    message: string;
}