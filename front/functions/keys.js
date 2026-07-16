vault.Fn('keys', function(category, group)
{
	return Object.values(this.Items())
		.filter((item) => (vaultCategories.ItemGet(item.Get('category')) ? item.Get('category') : 'general') === category)
		.filter((item) => (item.Get('group') ? item.Get('group') : 'General') === group)
		.map((item) => item.GetData());
});
