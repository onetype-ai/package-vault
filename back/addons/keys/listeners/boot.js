import onetype from '@onetype/framework';
import vault from '#vault/addon.js';

onetype.MiddlewareIntercept('boot', async (middleware) =>
{
	await vault.keys.Fn('sync');

	await middleware.next();
});
