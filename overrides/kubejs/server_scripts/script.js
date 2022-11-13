// priority: 0

settings.logAddedRecipes = true
settings.logRemovedRecipes = true
settings.logSkippedRecipes = false
settings.logErroringRecipes = true

onEvent('recipes', event => {
	// Andesite alloy overrides
	event.remove({type: 'minecraft:crafting_shaped', output: 'create:andesite_alloy'});
	event.custom({
		"type": "alloy_forgery:forging",
		"inputs": [
			{ "item": "minecraft:andesite" },
			{ "item": "minecraft:andesite" },
			{ "tag": "c:nuggets/iron" },
			{ "tag": "c:nuggets/iron" }
		],
		"output": {
			"id": "create:andesite_alloy",
			"count": 1
		},
		"overrides": {
			"2": {
				"id": "create:andesite_alloy",
				"count": 2
			},
			"3+": {
				"id": "create:andesite_alloy",
				"count": 3
			}
		},
		"min_forge_tier": 1,
		"fuel_per_tick": 5
	});
	event.custom({
		"type": "alloy_forgery:forging",
		"inputs": [
		  { "item": "minecraft:andesite" },
		  { "item": "minecraft:andesite" },
		  { "tag": "c:nuggets/zinc" },
		  { "tag": "c:nuggets/zinc" }
		],
		"output": {
		  "id": "create:andesite_alloy",
		  "count": 1
		},
		"overrides": {
		  "2": {
			"id": "create:andesite_alloy",
			"count": 2
		  },
		  "3+": {
			"id": "create:andesite_alloy",
			"count": 3
		  }
		},
		"min_forge_tier": 1,
		"fuel_per_tick": 5
	});

	// Steel ingot overrides
	event.remove({type: 'minecraft:smelting', output: 'ad_astra:steel_ingot'});
	event.remove({type: 'minecraft:blasting', output: 'ad_astra:steel_ingot'});
	event.remove({type: 'spirit:soul_engulfing', output: 'spirit:soul_steel_ingot'});
	event.custom({
		"type": "alloy_forgery:forging",
		"inputs": [
			{ "tag": "c:ingots/iron" },
			{ "item": "minecraft:coal" }
		],
		"output": {
			"id": "ad_astra:steel_ingot",
			"count": 1
		},
		"overrides": {
			"2+": {
				"id": "ad_astra:steel_ingot",
				"count": 2
			}
		},
		"min_forge_tier": 1,
		"fuel_per_tick": 5
	});
	event.custom({
		"type": "alloy_forgery:forging",
		"inputs": [
			{ "item": "minecraft:raw_iron" },
			{ "item": "minecraft:coal" }
		],
		"output": {
			"id": "ad_astra:steel_ingot",
			"count": 1
		},
		"overrides": {
			"2+": {
				"id": "ad_astra:steel_ingot",
				"count": 2
			}
		},
		"min_forge_tier": 1,
		"fuel_per_tick": 5
	});
	event.custom({
		"type": "alloy_forgery:forging",
		"inputs": [
			{ "tag": "c:iron_ores" },
			{ "tag": "minecraft:coal_ores" }
		],
		"output": {
			"id": "ad_astra:steel_ingot",
			"count": 2
		},
		"overrides": {
			"2+": {
				"id": "ad_astra:steel_ingot",
				"count": 3
			}
		},
		"min_forge_tier": 1,
		"fuel_per_tick": 5
	});
	event.custom({
		"type": "betterend:alloying",
		"ingredients": [
			{ "tag": "c:ingots/iron" },
			{ "item": "minecraft:coal" }
		],
		"result": {
			"item": "ad_astra:steel_ingot",
			"count": 3
		},
		"experience": 2.1
	});
	event.custom({
		"type": "spirit:soul_engulfing",
		"input": {
			"ingredient": { "item": "ad_astra:steel_ingot" },
			"multiblock": {
				"pattern": [[
					"   ",
					" @ ",
					"   "
					], [
					" S ",
					"S&S",
					" S "
				]],
				"keys": {
					"S": { "block": "spirit:soul_powder_block" }
				}
			}
		},
		"duration": 60,
		"outputItem": "spirit:soul_steel_ingot"
	});

});