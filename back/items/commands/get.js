import commands from '@onetype/framework/commands';
import vault from '#vault/addon.js';

commands.Item({
	id: 'vault:get',
	exposed: true,
	method: 'GET',
	endpoint: '/api/vault/get',
	description: 'Returns the decrypted value of a declared vault key, falling back to the environment.',
	metadata: { addon: 'vault' },
	condition: function()
	{
		if(this.http && !this.http.state.user)
		{
			return 'Sign in to manage the vault.';
		}
	},
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
	callback: function(properties, resolve)
	{
		const item = Object.values(vault.Items()).find((entry) => entry.Get('key') === properties.key);

		if(!item)
		{
			return resolve(null, 'Key ' + properties.key + ' is not declared.', 404);
		}

		resolve({ value: vault.Fn('get', properties.key) }, 'Value read.');
	}
});
