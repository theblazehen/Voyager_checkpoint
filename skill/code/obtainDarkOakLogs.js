async function obtainDarkOakLogs(bot) {
  const requiredLogs = 4;
  const currentLogs = bot.inventory.count(mcData.itemsByName.dark_oak_log.id);
  if (currentLogs >= requiredLogs) {
    bot.chat("Already have enough dark oak logs.");
    return;
  }
  const logsToMine = requiredLogs - currentLogs;
  bot.chat(`Need to mine ${logsToMine} more dark oak logs.`);
  await mineBlock(bot, "dark_oak_log", logsToMine);
  bot.chat("Obtained 4 dark oak logs.");
}