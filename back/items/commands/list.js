import onetype from '@onetype/framework';
import commands from '@onetype/framework/commands';
import secrets from '#vault-back/secrets/addon.js';

commands.Item({
	id: 'vault:list',
	exposed: true,
	method: 'GET',
	endpoint: '/api/vault/list',
	description: 'Lists every declared vault key with whether the instance has a value stored, without exposing any value.',
	metadata: { addon: 'vault' },
	condition: function()
	{
		if(!this.http.state.user)
		{
			return 'Sign in to manage the vault.';
		}
	},
	in: {},
	out: {
		keys: {
			type: 'array',
			each: {
				type: 'object',
				config: 'vault.key'
			},
			description: 'The declared keys with their filled status.'
		}
	},
	callback: async function(properties, resolve)
	{
		const vault = onetype.AddonGet('vault');
		const filled = await secrets.Fn('filled');

		const keys = Object.values(vault.Items()).map((item) =>
		{
			return { ...item.Get(['key', 'name', 'description', 'provider', 'group', 'secret']), filled: filled.includes(item.Get('key')) };
		});

		resolve({ keys });
	}
});
