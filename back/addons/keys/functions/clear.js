import vault from '#vault/addon.js';

vault.keys.Fn('clear', async function(key)
{
    const item = Object.values(this.Items()).find((entry) => entry.Get('key') === key);

    if(!item)
    {
        return null;
    }

    if(item.Get('id') && await this.Find().filter('id', item.Get('id')).one())
    {
        await item.Delete();
    }

    item.Set('value', null, false);

    onetype.Emit('vault.keys.clear', { key });

    return item;
});
