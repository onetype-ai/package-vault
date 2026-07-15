import vault from '#vault/addon.js';

vault.Fn('filled', function()
{
	return Object.values(this.Items()).filter((item) => item.Get('value')).map((item) => item.Get('key'));
});
