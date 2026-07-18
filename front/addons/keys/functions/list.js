vault.keys.Fn('list', async function()
{
	const { data, message, code } = await $ot.command('vault:keys:many', {}, true);

	if(code !== 200)
	{
		throw onetype.Error(code, message);
	}

	this.ItemsRemove(false);
	this.ItemsAdd(data.keys);

	return data.keys;
});
