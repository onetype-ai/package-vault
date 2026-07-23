import commands from 'addon-commands';
import vault from '#vault/addon.js';

commands.Item({
    id: 'vault:categories:many',
    exposed: true,
    method: 'GET',
    endpoint: '/api/vault/categories',
    description: 'Lists every declared vault category, sorted by order.',
    metadata: { addon: 'vault.categories' },
    condition: function()
    {
        if(!this.http || !this.http.state.user)
        {
            return 'Sign in to manage the vault.';
        }
    },
    out: {
        categories: {
            type: 'array',
            each: {
                type: 'object',
                config: 'vault.category'
            },
            description: 'The declared categories, sorted by order.'
        }
    },
    callback: function(properties, resolve)
    {
        resolve({ categories: vault.categories.Fn('list') });
    }
});
