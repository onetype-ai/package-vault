onetype.AddonReady('onetype.emitters', function(emitters)
{
    emitters.ItemAdd({
        id: 'vault.keys.set',
        description: 'Fires after a vault value is stored on the instance.',
        metadata: { addon: 'vault.keys' },
        config: {
            key: {
                type: 'string',
                description: 'Key that was stored.'
            }
        }
    });
});
