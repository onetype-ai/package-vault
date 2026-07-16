import onetype from '@onetype/framework';
import vault from '#vault/addon.js';

vault.Fn('set', async function(key, value)
{
	const encrypted = onetype.Encrypt(value, process.env.VAULT_KEY);
	const item = Object.values(this.Items()).find((entry) => entry.Get('key') === key);

	if(!item)
	{
		return null;
	}

	item.Set('value', encrypted);

	if(item.Get('id') && await this.Find().filter('id', item.Get('id')).one())
	{
		await item.Update();
	}
	else
	{
		await item.Create();
	}

	return item;
});
