import onetype from '@onetype/framework';

const secrets = onetype.Addon('vault.secrets', (addon) =>
{
	addon.Table('vault');

	addon.Field('id', {
		type: 'number',
		description: 'Unique secret id.'
	});

	addon.Field('key', {
		type: 'string',
		required: true,
		description: 'Env style key the value is stored under.'
	});

	addon.Field('value', {
		type: 'string',
		description: 'Encrypted value. Never leaves the back.'
	});

	addon.Field('updated_at', {
		type: 'string',
		description: 'Timestamp of the last change.'
	});

	addon.Field('created_at', {
		type: 'string',
		description: 'Timestamp of when the secret was first stored.'
	});

	addon.Schema('id bigserial primary key');
	addon.Schema('key varchar(255) not null');
	addon.Schema('value text');
	addon.Schema('updated_at timestamptz not null default now()');
	addon.Schema('created_at timestamptz not null default now()');
	addon.Schema('unique (key)');
});

export default secrets;
