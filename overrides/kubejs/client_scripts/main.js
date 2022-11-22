// priority: 0

REIEvents.hide('item', event => {
    [
        // Mythic metals steel (replaced by steel of Ad astra)
        'mythicmetals:steel_ingot',
        'mythicmetals:steel_nugget',
        'mythicmetals:steel_block',
        // Mythic metals silver (removed)
        'mythicmetals:silver_ingot',
        'mythicmetals:raw_silver',
        'mythicmetals:silver_nugget',
        'mythicmetals:silver_helmet',
        'mythicmetals:silver_chestplate',
        'mythicmetals:silver_leggings',
        'mythicmetals:silver_boots',
        'mythicmetals:silver_ore',
        'mythicmetals:raw_silver_block',
        'mythicmetals:silver_block',
        'mythicmetals:silver_anvil'
    ].forEach(thing => { event.hide(thing) });
});