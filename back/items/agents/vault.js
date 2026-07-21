onetype.AddonReady('agents', (agents) =>
{
	agents.Item({
		id: 'vault',
		name: 'Vault Agent',
		description: 'The encrypted secrets of the instance — API keys, tokens and endpoints packages declare. Ask it which keys exist and whether they are filled, or have it read, set and clear their values.',
		parent: 'orah',
		instructions: 'You keep the encrypted secrets of this instance, fully autonomous — act yourself. '
			+ 'List the keys first so you work only with declared ones; a value can only be set on a key that already exists. '
			+ 'Quote key names exactly as the list returns them, and report whether a key is filled rather than echoing a secret value back unless the user asked for it. '
			+ 'Clearing a value is permanent — restate the key before doing it. '
			+ 'If a lookup comes back empty, widen it once before reporting there is nothing.',
		tools: [
			'vault:keys:many',
			'vault:keys:get',
			'vault:keys:set',
			'vault:keys:clear'
		]
	});
});
