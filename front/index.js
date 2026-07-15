$ot.vault = {
	list: async () =>
	{
		const result = await $ot.command('vault:list', {}, true);

		return result.code === 200 ? result.data.keys : [];
	},
	set: (key, value) => $ot.command('vault:set', { key, value }, true)
};
