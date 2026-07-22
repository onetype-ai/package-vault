onetype.AddonReady('developer.addons', (developer) =>
{
    developer.Item({
        id: 'vault.categories',
        group: 'vault',
        name: 'Categories',
        description: 'Sidebar sections the vault keys group under, declared by the packages that own them.',
        content: `
## What it does

Categories structure the vault sidebar. A package declares one category for its credentials and points its keys at it through the \`category\` field.

## Declaring a category

\`\`\`js
onetype.AddonReady('vault.categories', (categories) =>
{
    categories.Item({
        id: 'connect',
        name: 'Connect',
        description: 'OAuth credentials for the connected providers.',
        icon: 'link',
        order: 2
    });
});
\`\`\`
        `
    });
});
