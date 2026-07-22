onetype.EmitRegister('vault.keys.set', {
    description: 'Fires after a vault value is stored.',
    metadata: { addon: 'vault.keys' },
    config: {
        key: {
            type: 'string',
            description: 'Key that was stored.'
        }
    }
});
