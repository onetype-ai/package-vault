import onetype from '@onetype/framework';
import vault from '#vault/addon.js';

/* Schemas */
import '#vault/core/schemas/vault.js';

/* Functions */
import '#vault/functions/get.js';
import '#vault/functions/set.js';
import '#vault/functions/filled.js';

/* Commands */
import '#vault/items/commands/list.js';
import '#vault/items/commands/set.js';

/* Listeners */
import '#vault/listeners/boot.js';

/* Back facade */
onetype.$ot.vault = {
	get: (key) => vault.Fn('get', key)
};

export default vault;
