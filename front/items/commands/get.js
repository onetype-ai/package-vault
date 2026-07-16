commands.Item({
	id: 'vault:get',
	description: 'Reads the decrypted value of a declared vault key from the instance.',
	metadata: { addon: 'vault' },
	in: {
		key: {
			type: 'string',
			required: true,
			description: 'Key to read the value of.'
		}
	},
	out: {
		value: {
			type: 'string',
			description: 'The decrypted value, null while nothing is stored.'
		}
	},
	callback: async function(properties, resolve)
	{
		const { data, message, code } = await $ot.command('vault:get', properties, true);

		if(code !== 200)
		{
			return resolve(null, message, code);
		}

		resolve(data);
	}
});
