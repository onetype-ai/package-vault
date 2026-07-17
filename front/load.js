$ot.vault = {
	get: (key) => vault.keys.Fn('get', key),
	set: (key, value) => vault.keys.Fn('set', key, value),
	clear: (key) => vault.keys.Fn('clear', key),
	list: () => vault.keys.Fn('list')
};
