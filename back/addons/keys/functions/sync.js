import vault from '#vault/addon.js';

vault.keys.Fn('sync', async function()
{
    const seen = {};

    for(const [id, item] of Object.entries(this.Items()))
    {
        const key = item.Get('key');

        if(seen[key])
        {
            this.ItemRemove(id, false);
        }
        else
        {
            seen[key] = item;
        }
    }

    for(const item of Object.values(this.Items()))
    {
        const row = await this.Find().filter('key', item.Get('key')).one();

        if(row)
        {
            item.Set('id', row.Get('id'), false);
            item.Set('value', row.Get('value'), false);
        }
    }
});
