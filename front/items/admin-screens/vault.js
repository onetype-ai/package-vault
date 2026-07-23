onetype.AddonReady('admin.screens', (screens) =>
{
    screens.Item({
        id: 'vault',
        route: '/vault',
        app: 'vault',
        metadata: { addon: 'vault' }
    });
});
