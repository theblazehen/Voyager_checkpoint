async function mineLapisOres(bot) {
  // Check if the bot has a stone_pickaxe or better in the inventory
  const stonePickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.stone_pickaxe.id);
  const ironPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.iron_pickaxe.id);

  // If not, call the craftStonePickaxe function to craft a stone pickaxe
  if (!stonePickaxe && !ironPickaxe) {
    await craftItem(bot, "stone_pickaxe", 1);
  }

  // Equip the stone_pickaxe or better pickaxe
  if (ironPickaxe) {
    await bot.equip(mcData.itemsByName.iron_pickaxe.id, "hand");
  } else {
    await bot.equip(mcData.itemsByName.stone_pickaxe.id, "hand");
  }

  // Explore until finding a lapis_ore
  await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const lapis_ore = bot.findBlock({
      matching: mcData.blocksByName["lapis_ore"].id,
      maxDistance: 32
    });
    return lapis_ore;
  });

  // Mine 5 lapis ores
  await mineBlock(bot, "lapis_ore", 5);
  bot.chat("Mined 5 lapis ores.");
}