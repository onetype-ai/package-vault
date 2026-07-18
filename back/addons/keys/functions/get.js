import onetype from '@onetype/framework';
import vault from '#vault/addon.js';

vault.keys.Fn('get', function(key)
{
	if(key.startsWith('%') && key.endsWith('%'))
	{
		const name = key.slice(1, -1);

		return process.env[name] !== undefined ? process.env[name] : null;
	}

	const item = Object.values(this.Items()).find((entry) => entry.Get('key') === key);

	if(item && item.Get('value'))
	{
		return item.Get('id') ? onetype.Decrypt(item.Get('value'), process.env.VAULT_KEY) : item.Get('value');
	}

	return null;
});
