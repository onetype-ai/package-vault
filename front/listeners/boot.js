onetype.MiddlewareIntercept('boot', async (middleware) =>
{
	const keys = await $ot.command('vault:keys:list', {}, true);

	if(keys.code === 200)
	{
		vault.keys.ItemsAdd(keys.data.keys);
	}

	const categories = await $ot.command('vault:categories:list', {}, true);

	if(categories.code === 200)
	{
		vault.categories.ItemsAdd(categories.data.categories);
	}

	await middleware.next();
});
