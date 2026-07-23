onetype.schemas.ItemAdd({
    id: 'vault.category',
    config: {
        id: {
            type: 'string',
            description: 'Unique category id, like connect.'
        },
        name: {
            type: 'string',
            description: 'Category name shown in the vault sidebar.'
        },
        description: {
            type: 'string',
            description: 'One line on what the category credentials are for.'
        },
        icon: {
            type: 'string',
            description: 'Material Symbols icon name.'
        },
        order: {
            type: 'number',
            description: 'Sort position in the vault sidebar.'
        }
    }
});
