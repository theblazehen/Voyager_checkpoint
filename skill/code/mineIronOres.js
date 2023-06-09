async function mineIronOres(bot) {
  // Equip the stone_pickaxe
  await bot.equip(mcData.itemsByName.stone_pickaxe.id, "hand");

  // Explore until finding an iron_ore
  await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const iron_ore = bot.findBlock({
      matching: mcData.blocksByName["iron_ore"].id,
      maxDistance: 32
    });
    return iron_ore;
  });

  // Mine 5 iron ores
  await mineBlock(bot, "iron_ore", 5);
  bot.chat("Mined 5 iron ores.");
}