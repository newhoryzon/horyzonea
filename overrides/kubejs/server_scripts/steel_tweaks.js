settings.logAddedRecipes = true;
settings.logRemovedRecipes = true;
settings.logSkippedRecipes = false;
settings.logErroringRecipes = true;

var steel_tweaks = {
    itemToDelete: [
        'mythicmetals:steel_ingot',
        'mythicmetals:steel_nugget'
    ],
    blockToDelete: [
        'mythicmetals:steel_block'
    ]
};

onEvent('tags.items', event => {
    ['mythicmetals:steel_ingots', 'mythicmetals:steel_blocks'].forEach(tag => { event.removeAll(tag); event.removeAllTagsFrom(tag); });
    steel_tweaks.itemToDelete.forEach(thing => event.removeAllTagsFrom(thing));
    steel_tweaks.blockToDelete.forEach(thing => event.removeAllTagsFrom(thing));
});

onEvent('tags.blocks', event => {
    ['mythicmetals:steel_blocks'].forEach(tag => { event.removeAll(tag); event.removeAllTagsFrom(tag); });
    steel_tweaks.blockToDelete.forEach(thing => event.removeAllTagsFrom(thing));
});

onEvent('recipes', event => {
    // Remove Mythic metal Steel recipes
    steel_tweaks.itemToDelete.forEach(item => event.remove({ output: item }));
    steel_tweaks.blockToDelete.forEach(block => event.remove({ output: block }));
    event.remove({ mod: 'mythicmetals', output: 'minecraft:flint_and_steel' });

    // Remove Ad astra smelting and blasting default recipes
    event.remove({ type: 'minecraft:smelting', output: 'ad_astra:steel_ingot' });
    event.remove({ type: 'minecraft:blasting', output: 'ad_astra:steel_ingot' });

    // Add alloying (Alloy forgery & BetterEnd) for Ad astra steel ingot
    [{ tag: 'c:ingots/iron' }, { item: 'minecraft:raw_iron' }].forEach(ironIn =>
        alloying(event, [ironIn, { item: 'minecraft:coal' }], 'ad_astra:steel_ingot', 1, [{ tier: '2+', count: 2 }]));
    alloying(event, [{ tag: 'minecraft:iron_ores' }, { tag: 'minecraft:coal_ores' }], 'ad_astra:steel_ingot', 2, [{ tier: '2+', count: 3 }]);
    balloying(event, [{ tag: 'c:ingots/iron' }, { item: 'minecraft:coal' }], 'ad_astra:steel_ingot', 3, 2.1);
});