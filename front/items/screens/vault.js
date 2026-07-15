onetype.AddonReady('ui.screens', (screens) =>
{
	screens.Item({
		id: 'vault',
		route: '/vault',
		app: 'vault',
		metadata: { addon: 'vault' }
	});

	screens.Item({
		id: 'vault.group',
		route: '/vault/:group',
		app: 'vault',
		metadata: { addon: 'vault' },
		data: function()
		{
			return { vaultGroup: this.group };
		}
	});
});
