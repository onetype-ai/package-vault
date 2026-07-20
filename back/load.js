import vault from '#vault/addon.js';

/* Addons */
import '#vault/addons/categories/load.js';
import '#vault/addons/keys/load.js';

/* Items */
import '#vault/items/tools/keys.js';
import '#vault/items/agents/vault.js';

/* Back facade */
$ot.vault = {
	get: (key) => vault.keys.Fn('get', key),
	set: (key, value) => vault.keys.Fn('set', key, value),
	clear: (key) => vault.keys.Fn('clear', key),
	list: () => vault.keys.Fn('list')
};

export default vault;
