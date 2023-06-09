async function killSheepAndCollectWool(bot) {
  // Equip the iron_sword
  const ironSword = bot.inventory.findInventoryItem(mcData.itemsByName.iron_sword.id);
  await bot.equip(ironSword, "hand");

  // Find the nearest sheep using exploreUntil
  const sheep = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const sheep = bot.nearestEntity(entity => {
      return entity.name === "sheep" && entity.position.distanceTo(bot.entity.position) < 32;
    });
    return sheep;
  });

  // Kill the sheep using killMob function
  await killMob(bot, sheep.name, 300);

  // Collect the dropped wool
  await bot.pathfinder.goto(new GoalBlock(sheep.position.x, sheep.position.y, sheep.position.z));
  bot.chat("Killed 1 sheep and collected wool.");
}