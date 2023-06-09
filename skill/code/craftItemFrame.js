async function craftItemFrame(bot) {
  // Calculate the number of sticks needed to craft the item frame
  const requiredSticks = 8;

  // Check if we have enough dark_oak_logs in the inventory to craft the required sticks
  const requiredLogs = Math.ceil((requiredSticks - bot.inventory.count(mcData.itemsByName.stick.id)) / 4);
  const currentLogs = bot.inventory.count(mcData.itemsByName.dark_oak_log.id);

  // If not, mine dark_oak_logs to get enough logs to craft the required sticks
  if (currentLogs < requiredLogs) {
    await mineBlock(bot, "dark_oak_log", requiredLogs - currentLogs);
  }

  // Craft dark_oak_planks from the dark_oak_logs
  await craftItem(bot, "dark_oak_planks", requiredLogs);

  // Craft the required sticks from the dark_oak_planks
  await craftItem(bot, "stick", requiredLogs);

  // Check if we have a crafting table in the inventory
  const craftingTable = bot.inventory.findInventoryItem(mcData.itemsByName.crafting_table.id);

  // If not, craft a crafting table
  if (!craftingTable) {
    await mineBlock(bot, "dark_oak_log", 1);
    await craftItem(bot, "dark_oak_planks", 1);
    await craftItem(bot, "crafting_table", 1);
  }

  // Place the crafting table near the bot
  const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", craftingTablePosition);

  // Craft the item frame using the crafting table
  await craftItem(bot, "item_frame", 1);
  bot.chat("Crafted an item frame.");
}