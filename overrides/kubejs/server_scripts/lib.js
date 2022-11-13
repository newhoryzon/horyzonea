// priority: 0

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
        type: 'betterend:alloying',
        ingredients: ingredients,
        result: {item:outputItemID, count:count},
        experience: xp,
        smelttime: smeltTime
    });
};