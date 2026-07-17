import commands from '@onetype/framework/commands';
import vault from '#vault/addon.js';

commands.Item({
	id: 'vault:keys:clear',
	exposed: true,
	method: 'POST',
	endpoint: '/api/vault/keys/clear',
	description: 'Removes the stored value of a declared vault key.',
	metadata: { addon: 'vault.keys' },
	condition: function()
	{
		if(!this.http || !this.http.state.user)
		{
			return 'Sign in to manage the vault.';
		}
	},
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
		const item = await vault.keys.Fn('clear', properties.key);

		if(!item)
		{
			return resolve(null, 'Key ' + properties.key + ' is not declared.', 404);
		}

		resolve({ key: properties.key }, 'Cleared.');
	}
});
