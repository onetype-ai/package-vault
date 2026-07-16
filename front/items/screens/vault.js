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
		route: '/vault/:category/:group',
		app: 'vault',
		metadata: { addon: 'vault' },
		data: function()
		{
			return { vaultCategory: this.category, vaultGroup: this.group };
		}
	});
});
