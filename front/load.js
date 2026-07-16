$ot.vault = {
	list: async () =>
	{
		const result = await $ot.command('vault:list', {});

		return result.code === 200 ? result.data.keys : [];
	},
	get: async (key) =>
	{
		const result = await $ot.command('vault:get', { key });

		return result.code === 200 ? result.data.value : null;
	},
	set: (key, value) => $ot.command('vault:set', { key, value })
};
