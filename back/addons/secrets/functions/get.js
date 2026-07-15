import onetype from '@onetype/framework';
import secrets from '#vault-back/secrets/addon.js';

secrets.Fn('get', async function(key)
{
	const secret = await this.Find().filter('key', key).one();

	if(secret && secret.Get('value'))
	{
		return onetype.Decrypt(secret.Get('value'), process.env.VAULT_KEY);
	}

	return process.env[key] !== undefined ? process.env[key] : null;
});
