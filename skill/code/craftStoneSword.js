async function craftStoneSword(bot) {
  // Check if we have enough cobblestone and sticks in the inventory
  const requiredCobblestone = 2;
  const requiredSticks = 1;
  const currentCobblestone = bot.inventory.count(mcData.itemsByName.cobblestone.id);
  const currentSticks = bot.inventory.count(mcData.itemsByName.stick.id);

  // If not, mine cobblestone and craft sticks as needed
  if (currentCobblestone < requiredCobblestone) {
    await mineBlock(bot, "stone", requiredCobblestone - currentCobblestone);
  }
  if (currentSticks < requiredSticks) {
    const planksNeeded = Math.ceil((requiredSticks - currentSticks) / 4);
    await mineBlock(bot, "dark_oak_log", planksNeeded);
    await craftItem(bot, "dark_oak_planks", planksNeeded);
    await craftItem(bot, "stick", planksNeeded);
  }

  // Check if we have a crafting table in the inventory
  const craftingTable = bot.inventory.findInventoryItem(mcData.itemsByName.crafting_table.id);

  // If not, craft one
  if (!craftingTable) {
    await mineBlock(bot, "dark_oak_log", 1);
    await craftItem(bot, "dark_oak_planks", 1);
    await craftItem(bot, "crafting_table", 1);
  }

  // Place the crafting table near the bot
  const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", craftingTablePosition);

  // Craft a stone sword using the crafting table
  await craftItem(bot, "stone_sword", 1);
  bot.chat("Crafted a stone sword.");
}