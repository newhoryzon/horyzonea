// priority: 0

var deleteItemTags = (event, tweaks) => {
    tweaks.toDelete.items.tags.forEach(tag => { event.removeAll(tag); event.removeAllTagsFrom(tag); });
    tweaks.toDelete.items.list.forEach(thing => event.removeAllTagsFrom(thing));
    tweaks.toDelete.blocks.list.forEach(thing => event.removeAllTagsFrom(thing));
};

var deleteBlockTags = (event, tweaks) => {
    tweaks.toDelete.blocks.tags.forEach(tag => { event.removeAll(tag); event.removeAllTagsFrom(tag); });
    tweaks.toDelete.blocks.list.forEach(thing => event.removeAllTagsFrom(thing));
};

var deleteRecipes = (event, tweaks) => {
    tweaks.toDelete.filters.forEach(filter => {
        tweaks.toDelete.items.list.forEach(item => {
            let itemFilter = Object.assign({}, filter);
            itemFilter.output = item;
            event.remove(itemFilter);
        });
        tweaks.toDelete.blocks.list.forEach(block => {
            let blockFilter = Object.assign({}, filter);
            blockFilter.output = block;
            event.remove(blockFilter);
        });
    });
};

var defaulted = (variable, defaultValue) => {
    return variable == undefined ? defaultValue : variable;
};

var alloying = (event, ingredients, outputItemID, basicCount, countByTier, minTier, fuelPerTick) => {
	countByTier = defaulted(countByTier, []);
	minTier = defaulted(minTier, 1);
	fuelPerTick = defaulted(fuelPerTick, 5);
    
	var recipe = {
		type: 'alloy_forgery:forging',
		inputs: ingredients,
		output: {id:outputItemID, count:basicCount},
		min_forge_tier: minTier,
		fuel_per_tick: fuelPerTick
	};
	if (countByTier.length > 0) {
		var overrides = {};
		countByTier.forEach(countTier => overrides[countTier.tier] = {id:outputItemID, count:countTier.count});
		recipe.overrides = overrides;
	}
	event.custom(recipe);
};

var balloying = (event, ingredients, outputItemID, count, xp, smeltTime) => {
    count = defaulted(count, 1);
    xp = defaulted(xp, 0.0);
    smeltTime = defaulted(smeltTime, 350);
    event.custom({
        type: 'bclib:alloying',
        ingredients: ingredients,
        result: {item:outputItemID, count:count},
        experience: xp,
        smelttime: smeltTime
    });
};