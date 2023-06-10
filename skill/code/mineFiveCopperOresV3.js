async function mineFiveCopperOres(bot) {
  // Check if the bot has already mined 5 or more copper ores
  const rawCopperCount = bot.inventory.count(mcData.itemsByName.raw_copper.id);
  if (rawCopperCount >= 5) {
    bot.chat("Already mined 5 or more copper ores.");
    return;
  }

  // Equip the iron_pickaxe
  await bot.equip(mcData.itemsByName.iron_pickaxe.id, "hand");

  // Explore until finding a copper_ore
  await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const copper_ore = bot.findBlock({
      matching: mcData.blocksByName["copper_ore"].id,
      maxDistance: 32
    });
    return copper_ore;
  });

  // Mine 5 copper ores
  await mineBlock(bot, "copper_ore", 5 - rawCopperCount);
  bot.chat("Mined 5 copper ores.");
}