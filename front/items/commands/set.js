commands.Item({
	id: 'vault:set',
	description: 'Stores an encrypted value for a declared vault key on the instance.',
	metadata: { addon: 'vault' },
	in: {
		key: {
			type: 'string',
			required: true,
			description: 'Key to store the value under.'
		},
		value: {
			type: 'string',
			required: true,
			description: 'Value to encrypt and store.'
		}
	},
	out: {
		key: {
			type: 'string',
			description: 'Key that was stored.'
		}
	},
	callback: async function(properties, resolve)
	{
		const { data, message, code } = await $ot.command('vault:set', properties, true);

		if(code !== 200)
		{
			return resolve(null, message, code);
		}

		const item = Object.values(vault.Items()).find((entry) => entry.Get('key') === properties.key);

		if(item)
		{
			item.Set('filled', true);

			if(!item.Get('secret'))
			{
				item.Set('value', properties.value);
			}
		}

		onetype.Emit('vault.save', { key: properties.key });

		resolve(data, message);
	}
});
