vault.Fn('category', function(id)
{
	const item = vaultCategories.ItemGet(id && vaultCategories.ItemGet(id) ? id : 'general');

	return item.Get(['id', 'name', 'description', 'icon']);
});
