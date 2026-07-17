import onetype from '@onetype/framework';

onetype.EmitRegister('vault.keys.clear', {
	description: 'Fires after a vault value is cleared.',
	metadata: { addon: 'vault.keys' },
	config: {
		key: {
			type: 'string',
			description: 'Key that was cleared.'
		}
	}
});
