onetype.AddonReady('ui.layouts', (layouts) =>
{
	layouts.Item({
		id: 'vault-grid',
		isActive: true,
		condition: { app: ['vault'] },
		zone: 'root',
		slot: 'center',
		render: function()
		{
			return `<e-vault-grid></e-vault-grid>`;
		}
	});
});
