async function craftLightningRod(bot) {
  // Check if we have a crafting table in the inventory
  const craftingTable = bot.inventory.findInventoryItem(mcData.itemsByName.crafting_table.id);

  // If not, craft one using the existing oak_planks
  if (!craftingTable) {
    await craftItem(bot, "crafting_table", 1);
  }

  // Place the crafting table near the bot
  const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", craftingTablePosition);

  // Craft a lightning rod using the crafting table with 3 copper ingots and 2 sticks
  await craftItem(bot, "lightning_rod", 1);
  bot.chat("Crafted a lightning rod.");
}