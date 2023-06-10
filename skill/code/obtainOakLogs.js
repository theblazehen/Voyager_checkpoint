async function obtainOakLogs(bot) {
  const requiredLogs = 10;
  const currentLogs = bot.inventory.count(mcData.itemsByName.oak_log.id);
  if (currentLogs >= requiredLogs) {
    bot.chat("Already have enough oak logs.");
  } else {
    const logsToMine = requiredLogs - currentLogs;
    bot.chat(`Need to mine ${logsToMine} more oak logs.`);
    await mineBlock(bot, "oak_log", logsToMine);
    bot.chat("Obtained 10 oak logs.");
  }
}