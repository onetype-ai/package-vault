import onetype from '@onetype/framework';
import vault from '#vault/addon.js';

onetype.MiddlewareIntercept('boot', async (middleware) =>
{
	for(const item of Object.values(vault.Items()))
	{
		const row = await vault.Find().filter('key', item.Get('key')).one();

		if(row)
		{
			item.Set('id', row.Get('id'), false);
			item.Set('value', row.Get('value'), false);
		}
	}

	await middleware.next();
});
