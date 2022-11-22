var silver_tweaks = {
    toDelete: {
        filters: [{ mod: 'mythicmetals' }, { mod: 'create' }],
        items: {
            list: [
                'mythicmetals:silver_ingot',
                'mythicmetals:raw_silver',
                'mythicmetals:silver_nugget',
                'mythicmetals:silver_helmet',
                'mythicmetals:silver_chestplate',
                'mythicmetals:silver_leggings',
                'mythicmetals:silver_boots'
            ],
            tags: ['mythicmetals:silver_ingots', 'mythicmetals:raw_silver_ores']
        },
        blocks: {
            list: [
                'mythicmetals:silver_ore',
                'mythicmetals:raw_silver_block',
                'mythicmetals:silver_block',
                'mythicmetals:silver_anvil'
            ],
            tags: ['mythicmetals:silver_blocks', 'mythicmetals:raw_silver_blocks']
        }
    }
};

ServerEvents.tags('item', event => {
    deleteItemTags(event, silver_tweaks);
});

ServerEvents.tags('block', event => {
    deleteBlockTags(event, silver_tweaks);
});

ServerEvents.recipes(event => {
    deleteRecipes(event, silver_tweaks);
});