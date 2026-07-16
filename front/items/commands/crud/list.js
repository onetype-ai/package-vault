commands.Item({
	id: 'vault:list',
	description: 'Reads the declared vault keys from the instance.',
	metadata: { addon: 'vault' },
	out: {
		keys: {
			type: 'array',
			each: {
				type: 'object',
				config: 'vault'
			},
			description: 'The declared keys with their filled status and plain values where allowed.'
		}
	},
	callback: async function(properties, resolve)
	{
		const { data, message, code } = await $ot.command('vault:list', {}, true);

		if(code !== 200)
		{
			return resolve(null, message, code);
		}

		vault.ItemsRemove(false);
		vault.ItemsAdd(data.keys);

		resolve(data);
	}
});
