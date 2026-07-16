onetype.AddonReady('ui.layouts', (layouts) =>
{
	layouts.Item({
		id: 'vault-categories',
		isActive: true,
		condition: { app: ['vault'] },
		zone: 'root',
		slot: 'left',
		render: function()
		{
			this.tree = [];

			this.refresh = async () =>
			{
				await $ot.vault.list();

				this.tree = vault.Fn('categories').map((category) => ({
					label: category.name,
					icon: category.done === category.total ? 'check_circle' : category.icon,
					badge: category.done + '/' + category.total,
					items: category.groups.map((group) => ({
						label: group.label,
						value: category.id + '/' + group.label,
						badge: group.done + '/' + group.total
					}))
				}));
			};

			this.refresh();

			this.On('vault.saved', () => this.refresh());

			this.pick = ({ value }) =>
			{
				if(!value.value)
				{
					return;
				}

				const [category, group] = value.value.split('/');

				$ot.ui.screens.open('vault.group', { category, group });
			};

			return `<e-navigation-sidebar title="Vault" :search="true" :items="tree" :active="vaultCategory + '/' + vaultGroup" :_click="pick"></e-navigation-sidebar>`;
		}
	});
});
