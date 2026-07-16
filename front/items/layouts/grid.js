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
			this.fields = [
				{ key: 'name', label: 'Name', type: 'text', width: '1.5fr' },
				{ key: 'key', label: 'Key', type: 'text', width: '1.5fr' },
				{ key: 'status', label: 'Status', type: 'status', width: '140px' },
				{ key: 'value', label: 'Value', type: 'text', width: '2fr' }
			];

			this.refresh = () =>
			{
				this.rows = vault.Fn('rows');
			};

			this.refresh();

			this.On('vault.save', () => this.refresh());

			this.edit = ({ event, value }) =>
			{
				const key = value.item ? value.item : value;

				if(value.field && value.field !== 'value')
				{
					return;
				}

				let draft = '';

				$ot.float.popup(event.target.closest('.cell'), function()
				{
					this.change = ({ value }) => draft = value;

					this.save = async () =>
					{
						const result = await $ot.vault.set(key.key, draft);

						if(result.code === 200)
						{
							$ot.float.toast({ title: 'Vault', message: key.name + ' saved.' });
							$ot.float.close('vault-edit');
						}
						else
						{
							$ot.float.toast({ title: 'Vault', message: result.message, type: 'error' });
						}
					};

					return `
						<div class="ot-flex-horizontal ot-gap-s ot-p-s">
							<e-form-input
								:type="${key.secret} ? 'password' : 'text'"
								placeholder="Enter value"
								:clearable="false"
								:_input="change"
							></e-form-input>
							<e-form-button icon="save" text="Save" :disabled="!draft" :_click="() => save()"></e-form-button>
						</div>
					`;
				}, { id: 'vault-edit' });
			};

			return `<e-views-grid :fields="fields" :items="rows" group="section" :background="2" :_select="edit" :_open="edit" empty="No keys declared yet."></e-views-grid>`;
		}
	});
});
