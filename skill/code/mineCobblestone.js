async function mineCobblestone(bot) {
  // Check if the bot has a wooden_pickaxe in the inventory
  const woodenPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.wooden_pickaxe.id);

  // If not, call the craftWoodenPickaxe function to craft a wooden pickaxe
  if (!woodenPickaxe) {
    await craftWoodenPickaxe(bot);
  }

  // Equip the wooden_pickaxe
  await bot.equip(mcData.itemsByName.wooden_pickaxe.id, "hand");

  // Mine 10 cobblestone
  await mineBlock(bot, "stone", 10);
  bot.chat("Mined 10 cobblestone.");
}