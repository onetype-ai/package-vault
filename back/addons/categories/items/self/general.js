import vault from '#vault/addon.js';

vault.categories.Item({
    id: 'general',
    name: 'General',
    description: 'Keys that do not belong to any category.',
    icon: 'key',
    order: 1000,
    metadata: { addon: 'vault' }
});
