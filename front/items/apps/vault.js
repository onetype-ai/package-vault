onetype.AddonReady('ui.apps', (apps) =>
{
    apps.Item({
        id: 'vault',
        name: 'Vault',
        icon: 'lock',
        color: 'rgba(251, 191, 36, 1)',
        description: 'Encrypted instance secrets. Fill in the credentials your packages need to reach external services.',
        order: 8,
        isVisible: false
    });
});
