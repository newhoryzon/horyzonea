ServerEvents.tags('item', event => {
    event.add('horyzonea:workbenchs', ['#c:workbench', 'minecraft:crafting_table']);
});

ServerEvents.tags('block', event => {
    event.add('horyzonea:workbenchs', ['#c:workbench', 'minecraft:crafting_table']);
});

ServerEvents.recipes(event => {
    event.remove({ type: 'minecraft:crafting_shaped', output: 'create:andesite_alloy' });
    [{ tag: 'c:iron_nuggets' }, { tag: 'c:zinc_nuggets' }].forEach(nugget =>
        alloying(event, [{ item: 'minecraft:andesite' }, { item: 'minecraft:andesite' }, nugget, nugget], 'create:andesite_alloy', 2, [{ tier: '2+', count: 3 }]));
});