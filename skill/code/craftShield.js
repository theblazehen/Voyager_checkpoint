async function craftShield(bot) {
  // Mine 2 dark_oak_logs to get enough planks
  await mineBlock(bot, "dark_oak_log", 2);

  // Craft 5 dark_oak_planks from the dark_oak_logs
  await craftItem(bot, "dark_oak_planks", 2);

  // Check if there's a crafting table in the inventory, if not, craft one
  const craftingTable = bot.inventory.findInventoryItem(mcData.itemsByName.crafting_table.id);
  if (!craftingTable) {
    await mineBlock(bot, "dark_oak_log", 1);
    await craftItem(bot, "dark_oak_planks", 1);
    await craftItem(bot, "crafting_table", 1);
  }

  // Place the crafting table near the bot
  const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", craftingTablePosition);

  // Craft a shield using the crafting table
  await craftItem(bot, "shield", 1);
  bot.chat("Crafted a shield.");
}