async function craftFurnace(bot) {
  // Check if the bot has a crafting table in the inventory
  const craftingTable = bot.inventory.findInventoryItem(mcData.itemsByName.crafting_table.id);

  // If not, mine a dark_oak_log, craft dark_oak_planks, and then craft a crafting table
  if (!craftingTable) {
    await mineBlock(bot, "dark_oak_log", 1);
    await craftItem(bot, "dark_oak_planks", 1);
    await craftItem(bot, "crafting_table", 1);
  }

  // Place the crafting table near the bot
  const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", craftingTablePosition);

  // Check if the bot has enough cobblestone in the inventory
  const cobblestoneCount = bot.inventory.count(mcData.itemsByName.cobblestone.id);

  // If not, mine more cobblestone until there are at least 8 cobblestones in the inventory
  if (cobblestoneCount < 8) {
    await mineBlock(bot, "stone", 8 - cobblestoneCount);
    bot.chat("Mined enough cobblestone to craft a furnace.");
  }

  // Craft a furnace using the crafting table
  await craftItem(bot, "furnace", 1);
  bot.chat("Crafted a furnace.");
}