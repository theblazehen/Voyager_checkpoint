async function cookThreeFishImproved(bot) {
  // Find a water block
  const waterBlock = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const water = bot.findBlock({
      matching: mcData.blocksByName.water.id,
      maxDistance: 32
    });
    return water;
  });

  // Go to the water block and equip the fishing rod
  await bot.pathfinder.goto(new GoalGetToBlock(waterBlock.position.x, waterBlock.position.y, waterBlock.position.z));
  await bot.equip(mcData.itemsByName.fishing_rod.id, "hand");

  // Fish until 3 raw fish are caught
  let rawFishCount = 0;
  while (rawFishCount < 3) {
    try {
      await bot.fish();
      rawFishCount++;
    } catch (error) {
      if (error.message !== "Fishing cancelled") {
        throw error;
      }
    }
  }
  bot.chat("Caught 3 fish.");

  // Check if there is a furnace in the inventory
  const furnaceItem = bot.inventory.findInventoryItem(mcData.itemsByName.furnace.id);
  if (!furnaceItem) {
    // Mine cobblestone and craft a furnace
    await mineBlock(bot, "cobblestone", 8);
    await craftItem(bot, "furnace", 1);
  }

  // Find a suitable solid block to place the furnace on
  const suitableBlock = await findSuitableSolidBlock(bot);

  // Place the furnace on the suitable solid block
  await placeItem(bot, "furnace", suitableBlock.position.offset(0, 1, 0));

  // Cook the 3 fish in the furnace using coal as fuel
  for (const fishName of ["cod", "salmon"]) {
    const fishItem = bot.inventory.findInventoryItem(mcData.itemsByName[fishName].id);
    if (fishItem) {
      await smeltItem(bot, fishName, "coal", fishItem.count);
    }
  }
  bot.chat("Cooked 3 fish in the furnace.");
}