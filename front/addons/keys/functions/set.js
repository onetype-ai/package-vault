vault.keys.Fn('set', async function(key, value)
{
    const { data, message, code } = await $ot.command('vault:keys:set', { key, value }, true);

    if(code !== 200)
    {
        throw onetype.Error(code, message);
    }

    const item = Object.values(this.Items()).find((entry) => entry.Get('key') === key);

    if(item)
    {
        item.Set('filled', true);

        if(!item.Get('secret'))
        {
            item.Set('value', value);
        }
    }

    onetype.Emit('vault.keys.set', { key });

    return data;
});
