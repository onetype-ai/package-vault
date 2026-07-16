import onetype from '@onetype/framework';
import vault from '#vault/addon.js';

/* Addons */
import '#vault/addons/categories/addon.js';
import '#vault/addons/categories/core/schemas/category.js';
import '#vault/addons/categories/functions/list.js';
import '#vault/addons/categories/items/commands/crud/list.js';
import '#vault/addons/categories/items/self/general.js';

/* Schemas */
import '#vault/core/schemas/vault.js';

/* Functions */
import '#vault/functions/get.js';
import '#vault/functions/set.js';
import '#vault/functions/list.js';

/* Commands */
import '#vault/items/commands/crud/list.js';
import '#vault/items/commands/get.js';
import '#vault/items/commands/set.js';

/* Listeners */
import '#vault/listeners/boot.js';

/* Back facade */
const run = async (id, properties) =>
{
	const result = await $ot.command(id, properties, { system: true });

	if(result.code !== 200)
	{
		throw onetype.Error(result.code, result.message);
	}

	return result.data;
};

$ot.vault = {
	get: async (key) => (await run('vault:get', { key })).value,
	set: async (key, value) =>
	{
		await run('vault:set', { key, value });

		return true;
	},
	list: () => run('vault:list', {}).then((data) => data.keys)
};

export default vault;
