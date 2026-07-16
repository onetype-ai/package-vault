import vault from '#vault/addon.js';

vault.Fn('list', function()
{
	return Object.values(this.Items()).map((item) =>
	{
		return {
			...item.Get(['key', 'name', 'description', 'group', 'secret']),
			value: item.Get('secret') ? null : this.Fn('get', item.Get('key')),
			filled: !!item.Get('value')
		};
	});
});
