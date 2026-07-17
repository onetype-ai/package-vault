commands.Item({
	id: 'vault:keys:set',
	description: 'Stores an encrypted value for a declared vault key on the instance.',
	metadata: { addon: 'vault.keys' },
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
		await vault.keys.Fn('set', properties.key, properties.value);

		resolve({ key: properties.key }, 'Saved.');
	}
});
