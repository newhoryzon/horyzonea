// priority: 0

var sleep = (millis) => {
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate - date < millis);
}

var deleteItemTags = (event, tweaks) => {
    let removeAllFrom = [];
    removeAllFrom.concat(tweaks.toDelete.items.list, tweaks.toDelete.blocks.list)

    tweaks.toDelete.items.tags.forEach(tag => { event.removeAll(tag); removeAllFrom.push('#' + tag); });
    event.removeAllTagsFrom(removeAllFrom);
};

var deleteBlockTags = (event, tweaks) => {
    let removeAllFrom = [];
    removeAllFrom.concat(tweaks.toDelete.blocks.list)
    tweaks.toDelete.blocks.tags.forEach(tag => { event.removeAll(tag); removeAllFrom.push('#' + tag); });
    sleep(1000);
    event.removeAllTagsFrom(removeAllFrom);
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