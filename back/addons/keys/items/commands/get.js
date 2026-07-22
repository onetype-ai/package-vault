import commands from '@onetype/framework/commands';
import vault from '#vault/addon.js';

commands.Item({
    id: 'vault:keys:get',
    exposed: true,
    method: 'GET',
    endpoint: '/api/vault/keys/get',
    description: 'Returns the decrypted value of a declared vault key that is not a secret.',
    metadata: { addon: 'vault.keys' },
    condition: function()
    {
        if(!this.http || !this.http.state.user)
        {
            return 'Sign in to manage the vault.';
        }
    },
    in: {
        key: {
            type: 'string',
            required: true,
            description: 'Key to read the value of.'
        }
    },
    out: {
        value: {
            type: 'string',
            description: 'The decrypted value, null while nothing is stored.'
        }
    },
    callback: function(properties, resolve, direct)
    {
        const item = Object.values(vault.keys.Items()).find((entry) => entry.Get('key') === properties.key);

        if(!item)
        {
            return resolve(null, 'Key ' + properties.key + ' is not declared.', 404);
        }

        if(!direct && item.Get('secret'))
        {
            return resolve(null, 'Key ' + properties.key + ' is a secret, its value only reads on the back.', 403);
        }

        resolve({ value: vault.keys.Fn('get', properties.key) }, 'Value read.');
    }
});
