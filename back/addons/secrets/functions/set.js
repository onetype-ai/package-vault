import onetype from '@onetype/framework';
import secrets from '#vault-back/secrets/addon.js';

secrets.Fn('set', async function(key, value)
{
	const encrypted = onetype.Encrypt(value, process.env.VAULT_KEY);
	const existing = await this.Find().filter('key', key).one();

	if(existing)
	{
		existing.Set('value', encrypted);
		existing.Set('updated_at', new Date().toISOString());

		await existing.Update();

		return existing;
	}

	const secret = this.Item({ key, value: encrypted });

	await secret.Create();

	return secret;
});
