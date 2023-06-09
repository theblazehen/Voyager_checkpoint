async function killOnePig(bot) {
  // Equip the stone_sword
  const stoneSword = bot.inventory.findInventoryItem(mcData.itemsByName.stone_sword.id);
  await bot.equip(stoneSword, "hand");

  // Find the nearest pig using exploreUntil
  const pig = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const pig = bot.nearestEntity(entity => {
      return entity.name === "pig" && entity.position.distanceTo(bot.entity.position) < 32;
    });
    return pig;
  });

  // Kill the pig using killMob function
  await killMob(bot, pig.name, 300);
  bot.chat("Killed 1 pig.");
}