async function killCaveSpiderWithAvailableSword(bot) {
  // Equip the best available sword (iron > stone > wooden)
  const ironSword = bot.inventory.findInventoryItem(mcData.itemsByName.iron_sword.id);
  const stoneSword = bot.inventory.findInventoryItem(mcData.itemsByName.stone_sword.id);
  const woodenSword = bot.inventory.findInventoryItem(mcData.itemsByName.wooden_sword.id);
  if (ironSword) {
    await bot.equip(ironSword, "hand");
  } else if (stoneSword) {
    await bot.equip(stoneSword, "hand");
  } else if (woodenSword) {
    await bot.equip(woodenSword, "hand");
  } else {
    bot.chat("No sword available to kill the cave spider.");
    return;
  }

  // Find the nearest cave spider using exploreUntil
  const caveSpider = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const caveSpider = bot.nearestEntity(entity => {
      return entity.name === "cave_spider" && entity.position.distanceTo(bot.entity.position) < 32;
    });
    return caveSpider;
  });

  // Kill the cave spider using killMob function
  await killMob(bot, caveSpider.name, 300);
  bot.chat("Killed 1 cave spider.");
}