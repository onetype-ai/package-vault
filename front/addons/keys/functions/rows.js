vault.keys.Fn('rows', function()
{
	return Object.values(this.Items()).map((item) =>
	{
		const category = vault.categories.ItemGet(item.Get('category'));

		return {
			id: item.Get('key'),
			name: item.Get('name'),
			key: item.Get('key'),
			category: category ? category.Get('name') : 'General',
			section: item.Get('group') ? item.Get('group') : (category ? category.Get('name') : 'General'),
			filled: item.Get('filled'),
			status: item.Get('filled') ? { label: 'Stored', color: 'green' } : { label: 'Empty', color: 'orange' },
			value: item.Get('secret') ? (item.Get('filled') ? '••••••••' : '') : (item.Get('value') ? item.Get('value') : ''),
			secret: item.Get('secret'),
			description: item.Get('description')
		};
	});
});
