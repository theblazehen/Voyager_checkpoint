async function mineDiamondOre(bot) {
  // Equip the iron_pickaxe
  await bot.equip(mcData.itemsByName.iron_pickaxe.id, "hand");

  // Explore underground around level 12 to find a diamond ore
  await exploreUntil(bot, new Vec3(0, -1, 0), 60, () => {
    const diamond_ore = bot.findBlock({
      matching: mcData.blocksByName["diamond_ore"].id,
      maxDistance: 32,
      minY: 10,
      maxY: 14
    });
    return diamond_ore;
  });

  // Mine the diamond ore
  await mineBlock(bot, "diamond_ore", 1);
  bot.chat("Mined 1 diamond ore.");
}