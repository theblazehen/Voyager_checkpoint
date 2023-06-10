async function fishFourTimesAndReport(bot) {
  // Equip the fishing rod
  const fishingRod = bot.inventory.findInventoryItem(mcData.itemsByName.fishing_rod.id);
  await bot.equip(fishingRod, "hand");

  // Find a water block using exploreUntil
  const waterBlock = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const water = bot.findBlock({
      matching: mcData.blocksByName.water.id,
      maxDistance: 32
    });
    return water;
  });

  // Go to the water block
  await bot.pathfinder.goto(new GoalNear(waterBlock.position.x, waterBlock.position.y, waterBlock.position.z, 1));

  // Look at the water block
  await bot.lookAt(waterBlock.position);

  // Fish 4 times and store the initial fish count
  const initialFishCount = {
    salmon: bot.inventory.count(mcData.itemsByName.salmon.id),
    pufferfish: bot.inventory.count(mcData.itemsByName.pufferfish.id),
    cod: bot.inventory.count(mcData.itemsByName.cod.id)
  };
  for (let i = 0; i < 4; i++) {
    await bot.fish();
    bot.chat(`Caught a fish (${i + 1}/4).`);
  }

  // Calculate the number of fish caught after fishing 4 times
  const finalFishCount = {
    salmon: bot.inventory.count(mcData.itemsByName.salmon.id),
    pufferfish: bot.inventory.count(mcData.itemsByName.pufferfish.id),
    cod: bot.inventory.count(mcData.itemsByName.cod.id)
  };

  // Report the number of fish caught and their types in the inventory
  bot.chat(`Caught ${finalFishCount.salmon - initialFishCount.salmon} salmon(s), ${finalFishCount.pufferfish - initialFishCount.pufferfish} pufferfish(es), and ${finalFishCount.cod - initialFishCount.cod} cod(s).`);
}