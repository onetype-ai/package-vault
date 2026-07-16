import onetype from '@onetype/framework';
import vault from '#vault/addon.js';

/* Schemas */
import './core/schemas/vault.js';

/* Functions */
import './functions/get.js';
import './functions/set.js';
import './functions/filled.js';

/* Commands */
import './items/commands/list.js';
import './items/commands/set.js';

/* Listeners */
import './listeners/boot.js';

/* Back facade */
onetype.$ot.vault = {
	get: (key) => vault.Fn('get', key)
};

export default vault;
