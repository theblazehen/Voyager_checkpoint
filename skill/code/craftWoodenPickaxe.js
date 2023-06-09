async function craftWoodenPickaxe(bot) {
  const requiredPlanks = 3;
  const requiredSticks = 2;
  const currentPlanks = bot.inventory.count(mcData.itemsByName.dark_oak_planks.id);
  const currentSticks = bot.inventory.count(mcData.itemsByName.stick.id);
  if (currentPlanks < requiredPlanks) {
    const logsNeeded = Math.ceil((requiredPlanks - currentPlanks) / 4);
    await mineBlock(bot, "dark_oak_log", logsNeeded);
    await craftItem(bot, "dark_oak_planks", logsNeeded);
  }
  if (currentSticks < requiredSticks) {
    const planksNeeded = Math.ceil((requiredSticks - currentSticks) / 4);
    await craftItem(bot, "stick", planksNeeded);
  }
  const craftingTable = bot.inventory.findInventoryItem(mcData.itemsByName.crafting_table.id);
  if (!craftingTable) {
    await mineBlock(bot, "dark_oak_log", 1);
    await craftItem(bot, "crafting_table", 1);
  }
  const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", craftingTablePosition);
  await craftItem(bot, "wooden_pickaxe", 1);
  bot.chat("Crafted a wooden pickaxe.");
}