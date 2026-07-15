/* Secrets */
import './addons/secrets/addon.js';
import secrets from '#vault-back/secrets/addon.js';
import './addons/secrets/functions/get.js';
import './addons/secrets/functions/set.js';
import './addons/secrets/functions/filled.js';

/* Commands */
import './items/commands/list.js';
import './items/commands/set.js';

/* Back facade for other packages: $ot.vault.get(key) */
import onetype from '@onetype/framework';

onetype.$ot.vault = {
	get: (key) => secrets.Fn('get', key)
};
