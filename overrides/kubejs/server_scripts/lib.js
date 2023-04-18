// priority: 0

function DeleteTweak(name) {
    this.name = name;
    this.filters = [];
    this.itemTags = [];
    this.items = [];
    this.blockTags = [];
    this.blocks = [];

    this.filters = (filters) => {
        this.filters = filters;
        return this;
    };
    
    this.itemTags = (itemTags) => {
        this.itemTags = itemTags;
        return this;
    };
    
    this.items = (items) => {
        this.items = items;
        return this;
    };
    
    this.blockTags = (blockTags) => {
        this.blockTags = blockTags;
        return this;
    };
    
    this.blocks = (blocks) => {
        this.blocks = blocks;
        return this;
    };
};

var deleteItemTags = (event, tweaks) => {
    let removeAllFrom = [];
    tweaks.forEach(tweak => {
        removeAllFrom.concat(tweak.items, tweak.blocks)
        tweak.itemTags.forEach(tag => { event.removeAll(tag); removeAllFrom.push('#' + tag); });
    });

    event.removeAllTagsFrom(removeAllFrom);
};

var deleteBlockTags = (event, tweaks) => {
    let removeAllFrom = [];
    tweaks.forEach(tweak => {
        removeAllFrom.concat(tweak.blocks)
        tweak.blockTags.forEach(tag => { event.removeAll(tag); removeAllFrom.push('#' + tag); });
    });

    event.removeAllTagsFrom(removeAllFrom);
};

var deleteRecipes = (event, tweaks) => {
    tweaks.forEach(tweak => {
        tweak.filters.forEach(filter => {
            tweak.items.forEach(item => {
                let itemFilter = Object.assign({}, filter);
                itemFilter.output = item;
                event.remove(itemFilter);
            });
            tweak.blocks.forEach(block => {
                let blockFilter = Object.assign({}, filter);
                blockFilter.output = block;
                event.remove(blockFilter);
            });
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