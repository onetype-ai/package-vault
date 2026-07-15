import onetype from '@onetype/framework';

const vault = onetype.Addon('vault', (addon) =>
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

	addon.Field('provider', {
		type: 'string',
		description: 'Slug the key groups under in the UI, like slack or github.'
	});

	addon.Field('group', {
		type: 'string',
		description: 'Label the key groups under when there is no provider.'
	});

	addon.Field('secret', {
		type: 'boolean',
		value: false,
		description: 'When true the value is a password: never sent back to the front, shown as set or empty.'
	});
});

import './schema.js';

export default vault;
