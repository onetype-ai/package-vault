onetype.EmitRegister('vault.save', {
	description: 'Fires after a vault value is stored on the instance.',
	metadata: { addon: 'vault' },
	config: {
		key: {
			type: 'string',
			description: 'Key that was stored.'
		}
	}
});
