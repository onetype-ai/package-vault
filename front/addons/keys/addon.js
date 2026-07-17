onetype.AddonReady('vault', (vault) =>
{
	vault.keys = onetype.Addon('vault.keys', (addon) =>
	{
		addon.Field('key', {
			type: 'string',
			required: true,
			description: 'Env style key the value is stored under, like SLACK_CLIENT_ID.'
		});

		addon.Field('name', {
			type: 'string',
			required: true,
			description: 'Human readable name shown in the vault UI.'
		});

		addon.Field('description', {
			type: 'string',
			description: 'Hint about where to find the value.'
		});

		addon.Field('category', {
			type: 'string',
			description: 'Category id the key belongs to in the UI, like connect.'
		});

		addon.Field('group', {
			type: 'string',
			description: 'Label the key groups under inside its category.'
		});

		addon.Field('secret', {
			type: 'boolean',
			value: false,
			description: 'When true the value is a password: never sent back to the front.'
		});

		addon.Field('value', {
			type: 'string',
			description: 'The plain value when the key is not a secret, null otherwise.'
		});

		addon.Field('filled', {
			type: 'boolean',
			value: false,
			description: 'Whether the instance has a value stored for this key.'
		});
	});
});
