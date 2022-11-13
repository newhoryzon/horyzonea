settings.logAddedRecipes = true;
settings.logRemovedRecipes = true;
settings.logSkippedRecipes = false;
settings.logErroringRecipes = true;

var silver_tweaks = {
    itemToDelete: [
        'mythicmetals:silver_ingot',
        'mythicmetals:raw_silver',
        'mythicmetals:silver_nugget',
        'mythicmetals:silver_helmet',
        'mythicmetals:silver_chestplate',
        'mythicmetals:silver_leggings',
        'mythicmetals:silver_boots'
    ],
    blockToDelete: [
        'mythicmetals:silver_ore',
        'mythicmetals:raw_silver_block',
        'mythicmetals:silver_block',
        'mythicmetals:silver_anvil'
    ]
};

onEvent('tags.items', event => {
    [
        'mythicmetals:silver_ingots',
        'mythicmetals:silver_blocks',
        'mythicmetals:raw_silver_ores',
        'mythicmetals:raw_silver_blocks'
    ].forEach(tag => { event.removeAll(tag); event.removeAllTagsFrom(tag); });

    silver_tweaks.itemToDelete.forEach(thing => event.removeAllTagsFrom(thing));
    silver_tweaks.blockToDelete.forEach(thing => event.removeAllTagsFrom(thing));

    event.remove('c:raw_ores', 'mythicmetals:raw_silver');
});

onEvent('tags.blocks', event => {
    ['mythicmetals:silver_blocks', 'mythicmetals:raw_silver_blocks'].forEach(tag => { event.removeAll(tag); event.removeAllTagsFrom(tag); });
    silver_tweaks.blockToDelete.forEach(thing => event.removeAllTagsFrom(thing));
});

onEvent('recipes', event => {
    silver_tweaks.itemToDelete.forEach(item => event.remove({ output: item }));
    silver_tweaks.blockToDelete.forEach(block => event.remove({ output: block }));
});