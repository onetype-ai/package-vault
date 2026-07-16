const vaultCategories = onetype.Addon('vault.categories', (addon) =>
{
	addon.Field('id', {
		type: 'string',
		required: true,
		description: 'Unique category id, like connect.'
	});

	addon.Field('name', {
		type: 'string',
		required: true,
		description: 'Category name shown in the vault sidebar.'
	});

	addon.Field('description', {
		type: 'string',
		description: 'One line on what the category credentials are for.'
	});

	addon.Field('icon', {
		type: 'string',
		value: 'key',
		description: 'Material Symbols icon name.'
	});

	addon.Field('order', {
		type: 'number',
		value: 1,
		description: 'Sort position in the vault sidebar.'
	});

	addon.Field('metadata', {
		type: 'object',
		value: {},
		description: 'Ownership tags. The addon key names the addon the category belongs to.'
	});
});
