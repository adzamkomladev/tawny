import type { EventHandler, EventHandlerRequest, H3Event } from 'h3'
import { Queues } from './../../types/queues';
import type { Queue } from '@cloudflare/workers-types/experimental';

export const defineWrappedResponseHandler = <T extends EventHandlerRequest, D> (
  handler: EventHandler<T, D>
): EventHandler<T, D> =>
    defineEventHandler<T>(async (event) => {
      try {
        const response = await handler(event)
        return { response }
      } catch (err) {
      // Error handling
        return { err }
      }
    })


export const useQueue = <T>(event: H3Event, queue: Queues) => {

  const { cloudflare } = event.context;

  if (queue === Queues.Emails) {
    return cloudflare.env.EMAIL_QUEUE as Queue<T>;
  }

  if (queue === Queues.Sms) {
    return cloudflare.env.SMS_QUEUE as Queue;
  }

  throw new Error(`Unknown queue: ${queue}`);
}
