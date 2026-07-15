import onetype from '@onetype/framework';

onetype.DataSchema('vault.key', {
	key: {
		type: 'string',
		description: 'Env style key the value is stored under.'
	},
	name: {
		type: 'string',
		description: 'Human readable name shown in the vault UI.'
	},
	description: {
		type: 'string',
		description: 'Hint about where to find the value.'
	},
	provider: {
		type: 'string',
		description: 'Slug the key groups under in the UI.'
	},
	group: {
		type: 'string',
		description: 'Label the key groups under when there is no provider.'
	},
	secret: {
		type: 'boolean',
		description: 'Whether the value is a password.'
	},
	filled: {
		type: 'boolean',
		description: 'Whether the instance has a value stored for this key.'
	}
});
