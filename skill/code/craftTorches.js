async function craftTorches(bot) {
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

  // Check if the bot has enough sticks and coal in the inventory
  const requiredSticks = 1;
  const requiredCoal = 1;
  const currentSticks = bot.inventory.count(mcData.itemsByName.stick.id);
  const currentCoal = bot.inventory.count(mcData.itemsByName.coal.id);

  // If not, mine dark_oak_log and craft dark_oak_planks, then craft sticks
  if (currentSticks < requiredSticks) {
    const logsNeeded = Math.ceil((requiredSticks - currentSticks) / 4);
    await mineBlock(bot, "dark_oak_log", logsNeeded);
    await craftItem(bot, "dark_oak_planks", logsNeeded);
    await craftItem(bot, "stick", logsNeeded);
  }

  // If not, mine coal_ore to collect coal
  if (currentCoal < requiredCoal) {
    await mineBlock(bot, "coal_ore", requiredCoal - currentCoal);
  }

  // Craft 4 torches using the crafting table
  await craftItem(bot, "torch", 1);
  bot.chat("Crafted 4 torches.");
}