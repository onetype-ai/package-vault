onetype.AddonReady('developer.addons', (developer) =>
{
	developer.Item({
		id: 'vault.keys',
		group: 'vault',
		name: 'Keys',
		description: 'Encrypted instance secrets. Packages declare the keys they need, users fill them in through the vault UI.',
		content: `
## What it does

The vault stores credentials encrypted in the \`vault_keys\` table. Packages declare the keys they need, the vault UI shows them grouped by category, and the values never leave the back unencrypted unless the key is not a secret.

## Declaring keys

Keys are declared on the back only — the front reads them from the instance through \`vault:keys:list\`.

\`\`\`js
onetype.AddonReady('vault.keys', (keys) =>
{
	keys.Item({
		key: 'SLACK_CLIENT_ID',
		name: 'Slack Client ID',
		description: 'From your Slack app OAuth settings.',
		category: 'connect',
		group: 'Slack'
	});
});
\`\`\`

Set \`secret: true\` for passwords — their values are never sent to the front.

## Facade

\`\`\`js
await $ot.vault.get('SLACK_CLIENT_ID');
await $ot.vault.set('SLACK_CLIENT_ID', value);
await $ot.vault.clear('SLACK_CLIENT_ID');
await $ot.vault.list();
\`\`\`

Wrap a key in percents to read it straight from the environment: \`$ot.vault.get('%SLACK_CLIENT_ID%')\` returns \`process.env.SLACK_CLIENT_ID\`.
		`
	});
});
