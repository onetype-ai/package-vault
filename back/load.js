import vault from '#vault/addon.js';

/* Addons */
import '#vault/addons/categories/addon.js';
import '#vault/addons/categories/core/schemas/category.js';
import '#vault/addons/categories/functions/list.js';
import '#vault/addons/categories/items/commands/crud/list.js';
import '#vault/addons/categories/items/self/general.js';

import '#vault/addons/keys/addon.js';
import '#vault/addons/keys/core/schemas/key.js';
import '#vault/addons/keys/core/emitters/set.js';
import '#vault/addons/keys/core/emitters/clear.js';
import '#vault/addons/keys/functions/get.js';
import '#vault/addons/keys/functions/set.js';
import '#vault/addons/keys/functions/list.js';
import '#vault/addons/keys/functions/sync.js';
import '#vault/addons/keys/functions/clear.js';
import '#vault/addons/keys/items/commands/crud/list.js';
import '#vault/addons/keys/items/commands/get.js';
import '#vault/addons/keys/items/commands/set.js';
import '#vault/addons/keys/items/commands/clear.js';
import '#vault/addons/keys/listeners/boot.js';

/* Back facade */
$ot.vault = {
	get: (key) => vault.keys.Fn('get', key),
	set: (key, value) => vault.keys.Fn('set', key, value),
	clear: (key) => vault.keys.Fn('clear', key),
	list: () => vault.keys.Fn('list')
};

export default vault;
