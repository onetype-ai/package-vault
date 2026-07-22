elements.ItemAdd({
    id: 'vault-popup',
    icon: 'key',
    name: 'Vault Popup',
    description: 'Inline value editor for a vault key, saves through the vault and closes its float on success.',
    category: 'Vault',
    collection: 'Home',
    author: 'OneType',
    metadata: { addon: 'vault.keys' },
    config: {
        key: {
            type: 'string',
            description: 'Key the value is stored under.'
        },
        name: {
            type: 'string',
            description: 'Human readable name shown in the toast.'
        },
        secret: {
            type: 'boolean',
            value: false,
            description: 'When true the input is a password.'
        },
        filled: {
            type: 'boolean',
            value: false,
            description: 'Whether the key has a stored value, shows the clear action.'
        },
        background: {
            type: 'number',
            value: 1,
            options: [1, 2, 3],
            description: 'Background depth of the popup from 1 to 3.'
        }
    },
    render: function()
    {
        this.draft = '';

        this.change = ({ value }) => this.draft = value;

        this.save = async () =>
        {
            try
            {
                await $ot.vault.set(this.key, this.draft);

                $ot.float.toast({ title: 'Vault', message: this.name + ' saved.' });
                $ot.float.close('vault-edit');
            }
            catch(error)
            {
                $ot.float.toast({ title: 'Vault', message: error.message, type: 'error' });
            }
        };

        this.clear = async () =>
        {
            try
            {
                await $ot.vault.clear(this.key);

                $ot.float.toast({ title: 'Vault', message: this.name + ' cleared.' });
                $ot.float.close('vault-edit');
            }
            catch(error)
            {
                $ot.float.toast({ title: 'Vault', message: error.message, type: 'error' });
            }
        };

        return /* html */ `
            <div :class="'box bg-' + background">
                <e-form-input
                    :type="secret ? 'password' : 'text'"
                    :background="Math.min(background + 1, 3)"
                    placeholder="Enter value"
                    :clearable="false"
                    :reveal="false"
                    :_input="change"
                ></e-form-input>
                <e-form-button icon="save" text="Save" :disabled="!draft" :_click="() => save()"></e-form-button>
                <e-form-button ot-if="filled" icon="delete" text="" color="red" :_click="() => clear()"></e-form-button>
            </div>
        `;
    }
});
