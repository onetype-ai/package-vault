import onetype from '@onetype/framework';
import commands from '@onetype/framework/commands';
import vault from '#vault/addon.js';

/* Schemas */
import '#vault/core/schemas/vault.js';

/* Functions */
import '#vault/functions/get.js';
import '#vault/functions/set.js';
import '#vault/functions/filled.js';

/* Commands */
import '#vault/items/commands/crud/list.js';
import '#vault/items/commands/get.js';
import '#vault/items/commands/set.js';

/* Listeners */
import '#vault/listeners/boot.js';

/* Back facade */
onetype.$ot.vault = {
	get: (key) => vault.Fn('get', key),
	set: async (key, value) =>
	{
		const result = await commands.Fn('run', 'vault:set', { key, value });

		if(result.code !== 200)
		{
			throw onetype.Error(result.code, result.message);
		}

		return true;
	}
};

export default vault;
