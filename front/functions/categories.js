vault.Fn('categories', function()
{
	const categories = {};

	for(const item of Object.values(vaultCategories.Items()))
	{
		categories[item.Get('id')] = { ...item.Get(['id', 'name', 'description', 'icon', 'order']), groups: {}, total: 0, done: 0 };
	}

	for(const key of Object.values(this.Items()))
	{
		const category = categories[key.Get('category')] ? key.Get('category') : 'general';
		const group = key.Get('group') ? key.Get('group') : 'General';
		const entry = categories[category];

		if(!entry.groups[group])
		{
			entry.groups[group] = { label: group, total: 0, done: 0 };
		}

		entry.groups[group].total++;
		entry.total++;

		if(key.Get('filled'))
		{
			entry.groups[group].done++;
			entry.done++;
		}
	}

	return Object.values(categories)
		.filter((category) => category.total)
		.sort((a, b) => a.order - b.order)
		.map((category) => ({ ...category, groups: Object.values(category.groups) }));
});
