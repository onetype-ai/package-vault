import secrets from '#vault-back/secrets/addon.js';

secrets.Fn('filled', async function()
{
	const items = await secrets.Find().many();

	return items.filter((item) => item.Get('value')).map((item) => item.Get('key'));
});
