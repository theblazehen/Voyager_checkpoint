async function craftSixteenTorches(bot) {
  const currentTorches = bot.inventory.count(mcData.itemsByName.torch.id);
  const requiredTorches = 16;
  if (currentTorches >= requiredTorches) {
    bot.chat("Already have enough torches.");
    return;
  }
  const remainingTorches = requiredTorches - currentTorches;
  const requiredSticks = Math.ceil(remainingTorches / 4);
  const requiredCoal = Math.ceil(remainingTorches / 4);
  const currentSticks = bot.inventory.count(mcData.itemsByName.stick.id);
  const currentCoal = bot.inventory.count(mcData.itemsByName.coal.id);
  if (currentSticks < requiredSticks) {
    const logsNeeded = Math.ceil((requiredSticks - currentSticks) / 4);
    await mineBlock(bot, "oak_log", logsNeeded);
    await craftItem(bot, "oak_planks", logsNeeded);
    await craftItem(bot, "stick", logsNeeded);
  }
  if (currentCoal < requiredCoal) {
    await mineBlock(bot, "coal_ore", requiredCoal - currentCoal);
  }
  const craftingTable = bot.inventory.findInventoryItem(mcData.itemsByName.crafting_table.id);
  if (!craftingTable) {
    await mineBlock(bot, "oak_log", 1);
    await craftItem(bot, "oak_planks", 1);
    await craftItem(bot, "crafting_table", 1);
  }
  const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", craftingTablePosition);
  const torchCraftCount = Math.ceil(remainingTorches / 4);
  await craftItem(bot, "torch", torchCraftCount);
  bot.chat(`Crafted ${remainingTorches} torches.`);
}