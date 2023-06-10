async function fishInRiver(bot) {
  // Equip the fishing rod
  const fishingRod = bot.inventory.findInventoryItem(mcData.itemsByName.fishing_rod.id);
  await bot.equip(fishingRod, "hand");

  // Find a water block near the bot
  const waterBlock = bot.findBlock({
    matching: mcData.blocksByName.water.id,
    maxDistance: 32
  });

  // Go to the water block
  await bot.pathfinder.goto(new GoalNear(waterBlock.position.x, waterBlock.position.y, waterBlock.position.z, 3));

  // Look at the water block
  await bot.lookAt(waterBlock.position);

  // Fish until a fish is caught
  await bot.fish();
  bot.chat("Caught a fish.");
}