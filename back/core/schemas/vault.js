import onetype from '@onetype/framework';

onetype.DataSchema('vault', {
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
	group: {
		type: 'string',
		description: 'Label the key groups under in the UI.'
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
