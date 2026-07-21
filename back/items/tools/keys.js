/*
	The vault commands as agent tools — one door for the UI and for
	agents. Not global: they belong to the Vault agent. Secrets are
	sensitive, so the descriptions steer the agent to read what is
	declared before touching anything.
*/

const tools = [
	{
		id: 'vault:keys:many',
		name: 'List vault keys',
		description: 'Lists every declared vault key with whether it is filled — call it first to learn which keys exist.',
		input: {}
	},
	{
		id: 'vault:keys:get',
		name: 'Read vault key',
		description: 'Reads the decrypted value of one declared key. Returns null when nothing is stored yet.',
		input: {
			key: { type: 'string', required: true, description: 'Key to read, exactly as it appears in the list.' }
		}
	},
	{
		id: 'vault:keys:set',
		name: 'Set vault key',
		description: 'Encrypts and stores a value for a declared key, replacing whatever was there.',
		input: {
			key: { type: 'string', required: true, description: 'Key to store the value under.' },
			value: { type: 'string', required: true, description: 'Value to encrypt and store.' }
		}
	},
	{
		id: 'vault:keys:clear',
		name: 'Clear vault key',
		description: 'Removes the stored value of a declared key. The key stays declared, only its value is wiped.',
		input: {
			key: { type: 'string', required: true, description: 'Key to clear.' }
		}
	}
];

onetype.AddonReady('agents.tools', (registry) =>
{
	for(const tool of tools)
	{
		registry.Item({
			id: tool.id,
			name: tool.name,
			description: tool.description,
			input: tool.input,
			command: tool.id
		});
	}
});
