async function shearSheep(bot) {
  // Equip the shears
  const shears = bot.inventory.findInventoryItem(mcData.itemsByName.shears.id);
  await bot.equip(shears, "hand");

  // Find the nearest sheep using exploreUntil
  const sheep = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const sheep = bot.nearestEntity(entity => {
      return entity.name === "sheep" && entity.position.distanceTo(bot.entity.position) < 32;
    });
    return sheep;
  });

  // Go to the sheep and use the shears on it
  await bot.pathfinder.goto(new GoalNear(sheep.position.x, sheep.position.y, sheep.position.z, 1));
  await bot.useOn(sheep);

  // Collect the dropped wool
  await bot.pathfinder.goto(new GoalBlock(sheep.position.x, sheep.position.y, sheep.position.z));
  bot.chat("Sheared 1 sheep.");
}