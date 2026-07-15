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
			this.build = () =>
			{
				const filled = vault.StoreGet('filled') || {};
				const groups = {};

				for(const item of Object.values(vault.Items()))
				{
					const label = item.Get('provider') ? item.Get('provider') : (item.Get('group') ? item.Get('group') : 'General');

					if(!groups[label])
					{
						groups[label] = { label, value: label, total: 0, done: 0 };
					}

					groups[label].total++;

					if(filled[item.Get('key')])
					{
						groups[label].done++;
					}
				}

				this.tree = Object.values(groups).map((group) => ({
					label: group.label,
					value: group.value,
					icon: group.done === group.total ? 'check_circle' : 'key',
					badge: group.done + '/' + group.total
				}));
			};

			this.refresh = async () =>
			{
				const keys = await $ot.vault.list();
				const filled = {};

				for(const key of keys)
				{
					filled[key.key] = key.filled;
				}

				vault.StoreSet('filled', filled);

				this.build();
				this.Update();
			};

			this.build();

			if(!vault.StoreGet('filled'))
			{
				this.refresh();
			}

			this.On('vault.saved', () => this.refresh());

			this.pick = ({ value }) =>
			{
				value.value && $ot.ui.screens.open('vault.group', { group: value.value });
			};

			return `<e-navigation-sidebar title="Vault" :search="true" :items="tree" :active="vaultGroup" :_click="pick"></e-navigation-sidebar>`;
		}
	});
});
