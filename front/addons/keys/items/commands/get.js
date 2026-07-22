commands.Item({
    id: 'vault:keys:get',
    description: 'Reads the decrypted value of a declared vault key from the instance.',
    metadata: { addon: 'vault.keys' },
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
    callback: async function(properties, resolve)
    {
        resolve({ value: await vault.keys.Fn('get', properties.key) });
    }
});
