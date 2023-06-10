async function findAndKillHostileMob(bot) {
  // Equip the iron_sword
  const ironSword = bot.inventory.findInventoryItem(mcData.itemsByName.iron_sword.id);
  await bot.equip(ironSword, "hand");

  // Find the nearest hostile mob using exploreUntil
  const hostileMob = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const hostileMob = bot.nearestEntity(entity => {
      return ["zombie", "skeleton", "creeper", "spider", "enderman"].includes(entity.name) && entity.position.distanceTo(bot.entity.position) < 32;
    });
    return hostileMob;
  });

  // Kill the hostile mob using killMob function
  await killMob(bot, hostileMob.name, 300);
  bot.chat(`Killed 1 ${hostileMob.name}.`);
}