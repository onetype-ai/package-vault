import vault from '#vault/addon.js';

vault.categories.Fn('list', function()
{
    return Object.values(this.Items())
        .sort((a, b) => a.Get('order') - b.Get('order'))
        .map((item) => item.Get(['id', 'name', 'description', 'icon', 'order']));
});
