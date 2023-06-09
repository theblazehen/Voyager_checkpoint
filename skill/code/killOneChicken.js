async function killOneChicken(bot) {
  // Equip the stone_sword
  const stoneSword = bot.inventory.findInventoryItem(mcData.itemsByName.stone_sword.id);
  await bot.equip(stoneSword, "hand");

  // Find the nearest chicken using exploreUntil
  const chicken = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const chicken = bot.nearestEntity(entity => {
      return entity.name === "chicken" && entity.position.distanceTo(bot.entity.position) < 32;
    });
    return chicken;
  });

  // Kill the chicken using killMob function
  await killMob(bot, chicken.name, 300);
  bot.chat("Killed 1 chicken.");
}