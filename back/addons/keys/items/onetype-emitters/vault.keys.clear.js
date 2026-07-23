onetype.emitters.ItemAdd({
    id: 'vault.keys.clear',
    description: 'Fires after a vault value is cleared.',
    metadata: { addon: 'vault.keys' },
    config: {
        key: {
            type: 'string',
            description: 'Key that was cleared.'
        }
    }
});
