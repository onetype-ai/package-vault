onetype.AddonReady('ui.layouts', (layouts) =>
{
	layouts.Item({
		id: 'vault-keys',
		isActive: true,
		condition: { app: ['vault'] },
		zone: 'root',
		slot: 'center',
		render: function()
		{
			return `<e-vault-keys :group="vaultGroup"></e-vault-keys>`;
		}
	});
});
