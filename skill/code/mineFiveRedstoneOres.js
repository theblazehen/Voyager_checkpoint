async function mineFiveRedstoneOres(bot) {
  // Check if the bot has an iron_pickaxe or better in the inventory
  const ironPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.iron_pickaxe.id);
  const diamondPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.diamond_pickaxe.id);
  const netheritePickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.netherite_pickaxe.id);

  // If not, mine iron ores and craft an iron pickaxe
  if (!ironPickaxe && !diamondPickaxe && !netheritePickaxe) {
    await mineIronOres(bot);
    await craftItem(bot, "iron_pickaxe", 1);
  }

  // Equip the iron_pickaxe or better pickaxe
  if (netheritePickaxe) {
    await bot.equip(mcData.itemsByName.netherite_pickaxe.id, "hand");
  } else if (diamondPickaxe) {
    await bot.equip(mcData.itemsByName.diamond_pickaxe.id, "hand");
  } else {
    await bot.equip(mcData.itemsByName.iron_pickaxe.id, "hand");
  }

  // Explore underground until finding a redstone_ore
  await exploreUntil(bot, new Vec3(0, -1, 0), 60, () => {
    const redstone_ore = bot.findBlock({
      matching: mcData.blocksByName["redstone_ore"].id,
      maxDistance: 32
    });
    return redstone_ore;
  });

  // Mine 5 redstone ores
  await mineBlock(bot, "redstone_ore", 5);
  bot.chat("Mined 5 redstone ores.");
}