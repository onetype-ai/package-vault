# Vault

**Encrypted secrets for the instance.** Packages declare the keys they need, admins fill them in through the UI, packages read them at runtime.

Credentials stop living in `.env` files and deployment scripts. A package ships with a declaration of what it needs — the vault shows those keys in one place, stores the values encrypted, and hands them back only on the back where they are used.

## How it works

- A package declares its keys on the back, grouped under a category it also declares
- The vault app lists every declared key with its status, so an admin sees at a glance what is filled and what is missing
- Values are encrypted with the instance `VAULT_KEY` before they touch the database and decrypted only on the back
- Keys marked `secret` never send their value to the front — the UI shows only that they are stored

## Declaring keys

Declarations are back only. The front reads everything from the instance.

```js
onetype.AddonReady('vault.keys', (keys) =>
{
	keys.Item({
		key: 'SLACK_CLIENT_ID',
		name: 'Slack Client ID',
		description: 'From your Slack app OAuth settings.',
		category: 'connect',
		group: 'Slack'
	});

	keys.Item({
		key: 'SLACK_CLIENT_SECRET',
		name: 'Slack Client Secret',
		description: 'From your Slack app OAuth settings.',
		category: 'connect',
		group: 'Slack',
		secret: true
	});
});
```

And the category the keys sit under:

```js
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
```

## Reading and writing

The facade is the same on both sides:

```js
await $ot.vault.get('SLACK_CLIENT_ID');
await $ot.vault.set('SLACK_CLIENT_ID', value);
await $ot.vault.clear('SLACK_CLIENT_ID');
await $ot.vault.list();
```

Wrap a key in percents to read it straight from the environment instead of the vault:

```js
await $ot.vault.get('%DB_HOSTNAME%'); // process.env.DB_HOSTNAME
```

## Commands

| Command | What it does |
| --- | --- |
| `vault:keys:list` | Lists every declared key with its filled status |
| `vault:keys:get` | Reads the decrypted value of a key |
| `vault:keys:set` | Encrypts and stores a value |
| `vault:keys:clear` | Removes a stored value |
| `vault:categories:list` | Lists declared categories sorted by order |

## Emitters

- `vault.keys.set` — fires after a value is stored
- `vault.keys.clear` — fires after a value is cleared

## Requirements

The instance needs a `VAULT_KEY` environment variable — the key the values are encrypted with. Rotating it invalidates everything stored.
