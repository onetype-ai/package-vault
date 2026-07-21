onetype.AddonReady('vault', (vault) =>
{
	vault.keys = onetype.Addon('vault.keys', (addon) =>
	{
		addon.Table('vault_keys');

		addon.Field('id', {
			type: 'string',
			description: 'Unique row id, a bigint the database returns as a string.'
		});

		addon.Field('key', {
			type: 'string',
			required: true,
			description: 'Env style key the value is stored under, like SLACK_CLIENT_ID.'
		});

		addon.Field('value', {
			type: 'string',
			description: 'Encrypted value once stored. Declarations may set a plain default that applies until a value is stored.'
		});

		addon.Field('name', {
			type: 'string',
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
			description: 'When true the value is a password.'
		});

		addon.Field('updated_at', {
			type: 'string',
			description: 'Timestamp of the last change.'
		});

		addon.Field('created_at', {
			type: 'string',
			description: 'Timestamp of when the value was first stored.'
		});

		addon.Schema('id bigserial primary key');
		addon.Schema('key varchar(255) not null');
		addon.Schema('value text');
		addon.Schema('updated_at timestamptz not null default now()');
		addon.Schema('created_at timestamptz not null default now()');
		addon.Schema('unique (key)');
	});
});
