async function mineCoalOres(bot) {
  // Check if the bot has a stone_pickaxe in the inventory
  const stonePickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.stone_pickaxe.id);

  // If not, call the craftStonePickaxe function to craft a stone pickaxe
  if (!stonePickaxe) {
    await craftStonePickaxe(bot);
  }

  // Equip the stone_pickaxe
  await bot.equip(mcData.itemsByName.stone_pickaxe.id, "hand");

  // Explore until finding a coal_ore
  await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const coal_ore = bot.findBlock({
      matching: mcData.blocksByName["coal_ore"].id,
      maxDistance: 32
    });
    return coal_ore;
  });

  // Mine 5 coal ores
  await mineBlock(bot, "coal_ore", 5);
  bot.chat("Mined 5 coal ores.");
}