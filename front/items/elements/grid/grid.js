elements.ItemAdd({
    id: 'vault-grid',
    icon: 'grid_on',
    name: 'Vault Grid',
    description: 'Grid of the declared vault keys with inline value editing through the vault popup.',
    category: 'Vault',
    collection: 'Home',
    author: 'OneType',
    metadata: { addon: 'vault.keys' },
    config: {
        background: {
            type: 'number',
            value: 1,
            options: [0, 1, 2, 3],
            description: 'Background depth of the grid, 0 renders transparent.'
        }
    },
    render: function()
    {
        this.fields = [
            { key: 'name', label: 'Name', type: 'title', sub: 'description', width: '2fr' },
            { key: 'key', label: 'Key', type: 'text', width: '1.3fr' },
            { key: 'status', label: 'Status', type: 'status', width: '120px' },
            { key: 'value', label: 'Value', type: 'text', width: '1.5fr' }
        ];

        this.refresh = () =>
        {
            this.rows = vault.keys.Fn('rows');
        };

        this.refresh();

        this.On('vault.keys.set', () => this.refresh());
        this.On('vault.keys.clear', () => this.refresh());

        this.edit = ({ event, value }) =>
        {
            if(value.field !== 'value')
            {
                return;
            }

            const item = value.item;
            const background = Math.min(this.background + 1, 3);

            $ot.float.popup(event.target.closest('.cell'), function()
            {
                this.item = item;
                this.background = background;

                return /* html */ `
                    <e-vault-popup :key="item.key" :name="item.name" :secret="item.secret" :filled="item.filled" :background="background"></e-vault-popup>
                `;
            }, { id: 'vault-edit' });
        };

        return /* html */ `
            <e-admin-views-grid :fields="fields" :items="rows" :group="['category', 'section']" :background="background" :_select="edit" empty="No keys declared yet."></e-admin-views-grid>
        `;
    }
});
