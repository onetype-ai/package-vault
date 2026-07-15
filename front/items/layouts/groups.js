onetype.AddonReady('ui.layouts', (layouts) =>
{
	layouts.Item({
		id: 'vault-groups',
		isActive: true,
		condition: { app: ['vault'] },
		zone: 'root',
		slot: 'left',
		render: function()
		{
			this.tree = [];

			this.load = async () =>
			{
				const keys = await $ot.vault.list();
				const groups = {};

				for(const key of keys)
				{
					const label = key.provider ? key.provider : (key.group ? key.group : 'General');

					if(!groups[label])
					{
						groups[label] = { label, value: label, icon: 'key', total: 0, filled: 0 };
					}

					groups[label].total++;

					if(key.filled)
					{
						groups[label].filled++;
					}
				}

				this.tree = Object.values(groups).map((group) => ({
					label: group.label,
					value: group.value,
					icon: group.filled === group.total ? 'check_circle' : 'key',
					badge: group.filled + '/' + group.total
				}));
			};

			this.pick = ({ value }) =>
			{
				value.value && $ot.ui.screens.open('vault.group', { group: value.value });
			};

			this.OnReady(() => this.load());
			this.On('vault.saved', () => this.load());

			return `<e-navigation-sidebar title="Vault" :search="true" :items="tree" :active="vaultGroup" :_click="pick"></e-navigation-sidebar>`;
		}
	});
});
