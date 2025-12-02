export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook('cloudflare:queue', async ({ batch, env, context }) => {
        console.log('[Queue] Batch wrapper received:', JSON.stringify(batch, null, 2));
        console.log(batch.messages, batch.queue);
        console.log(env)
        console.log(context)
    });
})
