async function mineFiveIronOre(bot) {
  // Equip the iron_pickaxe
  await bot.equip(mcData.itemsByName.iron_pickaxe.id, "hand");
  let ironOreCount = 0;
  while (ironOreCount < 5) {
    // Explore until finding an iron_ore
    await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      const iron_ore = bot.findBlock({
        matching: mcData.blocksByName["iron_ore"].id,
        maxDistance: 32
      });
      return iron_ore;
    });

    // Mine iron ores
    const initialIronOreCount = bot.inventory.count(mcData.itemsByName.raw_iron.id);
    await mineBlock(bot, "iron_ore", 5 - ironOreCount);
    const finalIronOreCount = bot.inventory.count(mcData.itemsByName.raw_iron.id);
    ironOreCount += finalIronOreCount - initialIronOreCount;
  }
  bot.chat("Mined 5 iron ores.");
}