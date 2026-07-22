vault.keys.Fn('get', async function(key)
{
    const { data, message, code } = await $ot.command('vault:keys:get', { key }, true);

    if(code !== 200)
    {
        throw onetype.Error(code, message);
    }

    return data.value;
});
