import onetype from '@onetype/framework';
import commands from '@onetype/framework/commands';
import secrets from '#vault-back/secrets/addon.js';

commands.Item({
	id: 'vault:set',
	exposed: true,
	method: 'POST',
	endpoint: '/api/vault/set',
	description: 'Stores an encrypted value for a declared vault key.',
	metadata: { addon: 'vault' },
	condition: function()
	{
		if(!this.http.state.user)
		{
			return 'Sign in to manage the vault.';
		}
	},
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
		const vault = onetype.AddonGet('vault');

		if(!Object.values(vault.Items()).some((item) => item.Get('key') === properties.key))
		{
			return resolve(null, 'Key ' + properties.key + ' is not declared.', 404);
		}

		await secrets.Fn('set', properties.key, properties.value);

		resolve({ key: properties.key }, 'Saved.');
	}
});
