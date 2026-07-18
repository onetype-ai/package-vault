commands.Item({
	id: 'vault:keys:many',
	description: 'Reads the declared vault keys from the instance.',
	metadata: { addon: 'vault.keys' },
	out: {
		keys: {
			type: 'array',
			each: {
				type: 'object',
				config: 'vault.key'
			},
			description: 'The declared keys with their filled status and plain values where allowed.'
		}
	},
	callback: async function(properties, resolve)
	{
		resolve({ keys: await vault.keys.Fn('list') });
	}
});
