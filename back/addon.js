import onetype from '@onetype/framework';

const vault = onetype.Addon('vault', (addon) =>
{
	addon.Table('vault');

	addon.Field('id', {
		type: 'number',
		description: 'Unique row id.'
	});

	addon.Field('key', {
		type: 'string',
		required: true,
		description: 'Env style key the value is stored under, like SLACK_CLIENT_ID.'
	});

	addon.Field('value', {
		type: 'string',
		description: 'Encrypted value. Never leaves the back. Empty on declaration only items.'
	});

	addon.Field('name', {
		type: 'string',
		metadata: { column: false },
		description: 'Human readable name shown in the vault UI. Declaration only, not stored.'
	});

	addon.Field('description', {
		type: 'string',
		metadata: { column: false },
		description: 'Hint about where to find the value. Declaration only, not stored.'
	});

	addon.Field('provider', {
		type: 'string',
		metadata: { column: false },
		description: 'Slug the key groups under in the UI. Declaration only, not stored.'
	});

	addon.Field('group', {
		type: 'string',
		metadata: { column: false },
		description: 'Label the key groups under when there is no provider. Declaration only, not stored.'
	});

	addon.Field('secret', {
		type: 'boolean',
		value: false,
		metadata: { column: false },
		description: 'When true the value is a password. Declaration only, not stored.'
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

onetype.DataSchema('vault.key', {
	key: { type: 'string', description: 'Env style key the value is stored under.' },
	name: { type: 'string', description: 'Human readable name shown in the vault UI.' },
	description: { type: 'string', description: 'Hint about where to find the value.' },
	provider: { type: 'string', description: 'Slug the key groups under in the UI.' },
	group: { type: 'string', description: 'Label the key groups under when there is no provider.' },
	secret: { type: 'boolean', description: 'Whether the value is a password.' },
	filled: { type: 'boolean', description: 'Whether the instance has a value stored for this key.' }
});

export default vault;
