elements.ItemAdd({
	id: 'vault-keys',
	icon: 'lock',
	name: 'Vault Keys',
	description: 'Secrets for one group of a category. Each declared key gets a field, secrets are masked, saving a value encrypts it on the instance.',
	category: 'Vault',
	collection: 'Home',
	author: 'OneType',
	metadata: { addon: 'vault' },
	config: {
		category: {
			type: 'string',
			description: 'Category id the group belongs to.'
		},
		group: {
			type: 'string',
			description: 'Group whose keys are shown.'
		}
	},
	render: function()
	{
		this.keys = [];
		this.values = {};
		this.saving = {};
		this.loading = true;

		this.load = async () =>
		{
			await $ot.vault.list();

			this.keys = vault.Fn('keys', this.category, this.group);

			for(const key of this.keys)
			{
				this.values[key.key] = key.value ? key.value : '';
			}

			this.loading = false;
			this.Update();
		};

		this.input = (key, value) =>
		{
			this.values[key] = value;
			this.Update();
		};

		this.save = async (item) =>
		{
			const value = this.values[item.key];

			if(!value)
			{
				return;
			}

			this.saving[item.key] = true;
			this.Update();

			const result = await $ot.vault.set(item.key, value);

			this.saving[item.key] = false;

			if(result.code === 200)
			{
				$ot.float.toast({ title: 'Vault', message: item.name + ' saved.' });
				await this.load();
			}
			else
			{
				$ot.float.toast({ title: 'Vault', message: result.message, type: 'error' });
			}

			this.Update();
		};

		this.Compute(() =>
		{
			if(this.category && this.group)
			{
				this.meta = vault.Fn('category', this.category);
				this.load();
			}
		});

		return `
			<div class="box">
				<e-status-empty
					ot-if="!category || !group"
					icon="lock"
					title="Vault"
					description="Pick a group on the left to fill in its credentials. Every value is encrypted before it is stored."
				></e-status-empty>

				<div ot-if="category && group" class="panel">
					<div class="head">
						<h1>{{ group }}</h1>
						<p>{{ meta.description ? meta.description : 'Credentials for ' + meta.name + '. Encrypted before storage.' }}</p>
					</div>

					<div ot-if="loading" class="loading"><i class="spin">progress_activity</i></div>

					<div ot-if="!loading" class="keys">
						<div ot-for="item in keys" :ot-key="item.key" class="key">
							<div class="meta">
								<span class="name">
									{{ item.name }}
									<span ot-if="item.filled" class="dot"><i>check_circle</i></span>
								</span>
								<span ot-if="item.description" class="hint">{{ item.description }}</span>
							</div>
							<div class="field">
								<e-form-input
									:type="item.secret ? 'password' : 'text'"
									:value="values[item.key]"
									:placeholder="item.filled ? '•••••••• stored' : 'Enter value'"
									:clearable="false"
									:_input="({ value }) => input(item.key, value)"
								></e-form-input>
								<e-form-button
									text="Save"
									icon="save"
									:disabled="!values[item.key]"
									:loading="saving[item.key]"
									:_click="() => save(item)"
								></e-form-button>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
	}
});
