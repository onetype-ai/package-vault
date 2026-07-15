import onetype from '@onetype/framework';
import vault from '#vault/addon.js';

vault.Fn('get', function(key)
{
	const item = Object.values(this.Items()).find((entry) => entry.Get('key') === key);

	if(item && item.Get('value'))
	{
		return onetype.Decrypt(item.Get('value'), process.env.VAULT_KEY);
	}

	return process.env[key] !== undefined ? process.env[key] : null;
});
