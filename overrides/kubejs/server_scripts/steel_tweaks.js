var steel_tweaks = {
    toDelete: {
        filters: [{ mod: 'mythicmetals' }],
        items: {
            list: ['mythicmetals:steel_ingot', 'mythicmetals:steel_nugget'],
            tags: ['mythicmetals:steel_ingots']
        },
        blocks: {
            list: ['mythicmetals:steel_block'],
            tags: ['mythicmetals:steel_blocks']
        }
    }
};

ServerEvents.tags('item', event => {
    deleteItemTags(event, steel_tweaks);
});

ServerEvents.tags('block', event => {
    deleteBlockTags(event, steel_tweaks);
});

ServerEvents.recipes(event => {
    // Remove Mythic metal Steel recipes
    deleteRecipes(event, steel_tweaks);
    event.remove({ mod: 'mythicmetals', output: 'minecraft:flint_and_steel' });

    // Remove Ad astra smelting and blasting default recipes
    event.remove({ type: 'minecraft:smelting', output: 'ad_astra:steel_ingot' });
    event.remove({ type: 'minecraft:blasting', output: 'ad_astra:steel_ingot' });

    // Add alloying (Alloy forgery & BetterEnd) for Ad astra steel ingot
    [{ tag: 'c:iron_ingots' }, { item: 'minecraft:raw_iron' }].forEach(ironIn =>
        alloying(event, [ironIn, { item: 'minecraft:coal' }], 'ad_astra:steel_ingot', 1, [{ tier: '2+', count: 2 }]));
    alloying(event, [{ tag: 'minecraft:iron_ores' }, { tag: 'minecraft:coal_ores' }], 'ad_astra:steel_ingot', 2, [{ tier: '2+', count: 3 }]);
    balloying(event, [{ tag: 'c:iron_ingots' }, { item: 'minecraft:coal' }], 'ad_astra:steel_ingot', 3, 2.1);
});