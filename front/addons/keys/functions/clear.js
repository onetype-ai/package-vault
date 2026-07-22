vault.keys.Fn('clear', async function(key)
{
    const { data, message, code } = await $ot.command('vault:keys:clear', { key }, true);

    if(code !== 200)
    {
        throw onetype.Error(code, message);
    }

    const item = Object.values(this.Items()).find((entry) => entry.Get('key') === key);

    if(item)
    {
        item.Set('filled', false);
        item.Set('value', null);
    }

    onetype.Emit('vault.keys.clear', { key });

    return data;
});
