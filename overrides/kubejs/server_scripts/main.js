var tweaks = [
    new DeleteTweak('Silver tweak')
        .filters([{ mod: 'mythicmetals' }, { mod: 'create' }])
        .itemTags([
            'mythicmetals:silver_ingot',
            'mythicmetals:raw_silver',
            'mythicmetals:silver_nugget',
            'mythicmetals:silver_helmet',
            'mythicmetals:silver_chestplate',
            'mythicmetals:silver_leggings',
            'mythicmetals:silver_boots'])
        .items(['mythicmetals:silver_ingots', 'mythicmetals:raw_silver_ores'])
        .blockTags([
            'mythicmetals:silver_ore',
            'mythicmetals:raw_silver_block',
            'mythicmetals:silver_block',
            'mythicmetals:silver_anvil'])
        .blocks(['mythicmetals:silver_blocks', 'mythicmetals:raw_silver_blocks']),
    new DeleteTweak('Steel Tweaks')
        .filters([{ mod: 'mythicmetals' }])
        .itemTags(['mythicmetals:steel_ingot', 'mythicmetals:steel_nugget'])
        .items(['mythicmetals:steel_ingots'])
        .blockTags(['mythicmetals:steel_block'])
        .blocks(['mythicmetals:steel_blocks'])
];

var steelTweakRecipes = (event) => {
    // Remove Mythic metal Steel recipes
    event.remove({ mod: 'mythicmetals', output: 'minecraft:flint_and_steel' });

    // Remove Ad astra smelting and blasting default recipes
    event.remove({ type: 'minecraft:smelting', output: 'ad_astra:steel_ingot' });
    event.remove({ type: 'minecraft:blasting', output: 'ad_astra:steel_ingot' });

    // Add alloying (Alloy forgery & BetterEnd) for Ad astra steel ingot
    [{ tag: 'c:iron_ingots' }, { item: 'minecraft:raw_iron' }].forEach(ironIn =>
        alloying(event, [ironIn, { item: 'minecraft:coal' }], 'ad_astra:steel_ingot', 1, [{ tier: '2+', count: 2 }]));
    alloying(event, [{ tag: 'minecraft:iron_ores' }, { tag: 'minecraft:coal_ores' }], 'ad_astra:steel_ingot', 2, [{ tier: '2+', count: 3 }]);
    balloying(event, [{ tag: 'c:iron_ingots' }, { item: 'minecraft:coal' }], 'ad_astra:steel_ingot', 3, 2.1);
};

ServerEvents.tags('item', event => {
    event.add('horyzonea:workbenchs', ['#c:workbench', 'minecraft:crafting_table']);
    deleteItemTags(event, tweaks);
});

ServerEvents.tags('block', event => {
    event.add('horyzonea:workbenchs', ['#c:workbench', 'minecraft:crafting_table']);
    deleteBlockTags(event, tweaks);
});

ServerEvents.recipes(event => {
    event.remove({ type: 'minecraft:crafting_shaped', output: 'create:andesite_alloy' });
    [{ tag: 'c:iron_nuggets' }, { tag: 'c:zinc_nuggets' }].forEach(nugget =>
        alloying(event, [{ item: 'minecraft:andesite' }, { item: 'minecraft:andesite' }, nugget, nugget], 'create:andesite_alloy', 2, [{ tier: '2+', count: 3 }]));
    
    steelTweakRecipes(event);
    
    deleteRecipes(event, tweaks);
});