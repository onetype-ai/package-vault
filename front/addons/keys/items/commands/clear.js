commands.Item({
	id: 'vault:keys:clear',
	description: 'Removes the stored value of a declared vault key on the instance.',
	metadata: { addon: 'vault.keys' },
	in: {
		key: {
			type: 'string',
			required: true,
			description: 'Key to clear the value of.'
		}
	},
	out: {
		key: {
			type: 'string',
			description: 'Key that was cleared.'
		}
	},
	callback: async function(properties, resolve)
	{
		await vault.keys.Fn('clear', properties.key);

		resolve({ key: properties.key }, 'Cleared.');
	}
});
