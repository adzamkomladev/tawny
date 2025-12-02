import { EmailsPayload, Queues } from "~~/types/queues";
import { processEmailMessagesJob, processSmsMessagesJob } from "~~/server/jobs/notifications";

export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook('cloudflare:queue', async ({ batch, env, context }) => {
        console.log(`[Queue] Batch received for queue: ${batch.queue}`);

        for (const message of batch.messages) {
            try {
                if (batch.queue === Queues.Emails) {
                    await processEmailMessagesJob(message as any);
                }

                if (batch.queue === Queues.Sms) {
                    await processSmsMessagesJob(message as any);
                }
            } catch (error) {
                console.error(`[Queue] Error processing message in queue ${batch.queue}:`, error);

                if (message.attempts > 2) {
                    return message.ack();
                }

                message.retry({ delaySeconds: 30 });
            }
        }

        console.log(`[Queue] Batch processing completed for queue: ${batch.queue}`);
    });
})
