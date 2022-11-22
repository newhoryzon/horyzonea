ServerEvents.tags('item', event => {
    event.add('horyzonea:workbenchs', ['#c:workbench', 'minecraft:crafting_table']);
});

ServerEvents.tags('block', event => {
    event.add('horyzonea:workbenchs', ['#c:workbench', 'minecraft:crafting_table']);
});

ServerEvents.recipes(event => {
    event.remove({ type: 'minecraft:crafting_shaped', output: 'create:andesite_alloy' });
    [{ tag: 'c:nuggets/iron' }, { tag: 'c:nuggets/zinc' }].forEach(nugget =>
        alloying(event, [{ item: 'minecraft:andesite' }, { item: 'minecraft:andesite' }, nugget, nugget], 'create:andesite_alloy', 2, [{ tier: '2+', count: 3 }]));

    // Remove vanilla recipe from Charm chests tag (vanilla recipe has been changed to use c:wooden_chests)
    event.remove({ mod: 'charm', type: 'minecraft:crafting_shaped', output: 'minecraft:hopper' });
    event.remove({ mod: 'charm', type: 'minecraft:crafting_shaped', output: 'minecraft:shulker_box' });
    event.remove({ mod: 'charm', type: 'minecraft:crafting_shaped', output: 'minecraft:chest_minecart' });
});