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
	category: {
		type: 'string',
		description: 'Category id the key belongs to in the UI, like connect.'
	},
	group: {
		type: 'string',
		description: 'Label the key groups under inside its category.'
	},
	secret: {
		type: 'boolean',
		description: 'Whether the value is a password.'
	},
	value: {
		type: 'string',
		description: 'The plain value when the key is not a secret, null otherwise.'
	},
	filled: {
		type: 'boolean',
		description: 'Whether the instance has a value stored for this key.'
	}
});
