import commands from '@onetype/framework/commands';
import vault from '#vault/addon.js';

commands.Item({
	id: 'vault:list',
	exposed: true,
	method: 'GET',
	endpoint: '/api/vault/list',
	description: 'Lists every declared vault key with its filled status and the plain value for keys that are not secrets.',
	metadata: { addon: 'vault' },
	condition: function()
	{
		if(this.http && !this.http.state.user)
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
				config: 'vault'
			},
			description: 'The declared keys with their filled status and plain values where allowed.'
		}
	},
	callback: function(properties, resolve)
	{
		resolve({ keys: vault.Fn('list') });
	}
});
