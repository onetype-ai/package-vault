import vault from '#vault/addon.js';

vault.keys.Fn('list', function()
{
    return Object.values(this.Items()).map((item) =>
    {
        const value = this.Fn('get', item.Get('key'));

        return {
            ...item.Get(['key', 'name', 'description', 'category', 'group', 'secret']),
            value: item.Get('secret') ? null : value,
            filled: value !== null
        };
    });
});
