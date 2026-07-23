import vault from '#vault/addon.js';

onetype.middlewares.intercept('boot', async (middleware) =>
{
    await vault.keys.Fn('sync');

    await middleware.next();
});
