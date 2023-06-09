async function craftWoodenPlanks(bot) {
  const requiredLogs = 1;
  const currentLogs = bot.inventory.count(mcData.itemsByName.dark_oak_log.id);
  if (currentLogs >= requiredLogs) {
    bot.chat("Already have enough dark oak logs.");
    await craftItem(bot, "dark_oak_planks", 1);
    bot.chat("Crafted 4 wooden planks.");
  } else {
    bot.chat("Not enough dark oak logs to craft wooden planks.");
  }
}