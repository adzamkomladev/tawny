import type { H3Event } from 'h3'
import type { Queue } from '@cloudflare/workers-types/experimental';
import { Queues } from '~~/types/queues';


export const useQueue = <T>(queue: Queues, event?: H3Event) => {
  const queueHandle = event ? event?.context.cloudflare.env : globalThis?.__env__;

  if (!queueHandle) {
    throw new Error('Cloudflare environment bindings are not available.');
  }

  if (queue === Queues.Emails) {
    return queueHandle.EMAILS_QUEUE as Queue<T>;
  }

  if (queue === Queues.Sms) {
    return queueHandle.SMS_QUEUE as Queue<T>;
  }

  throw new Error(`Unknown queue: ${queue}`);
}
