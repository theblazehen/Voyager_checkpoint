async function mineCopperOresIfNeeded(bot) {
  // Check the inventory for raw_copper
  const rawCopperCount = bot.inventory.count(mcData.itemsByName.raw_copper.id);

  // If there are less than 5 raw_copper, mine the required number of copper ores
  if (rawCopperCount < 5) {
    await mineBlock(bot, "copper_ore", 5 - rawCopperCount);
  }

  // Inform the user that the task is complete
  bot.chat("Task complete: Mined enough copper ores.");
}