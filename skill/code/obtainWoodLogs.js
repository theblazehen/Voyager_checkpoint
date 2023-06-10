async function obtainWoodLogs(bot) {
  const requiredLogs = 2;
  const currentLogs = bot.inventory.count(mcData.itemsByName.oak_log.id);
  if (currentLogs >= requiredLogs) {
    bot.chat("Already have enough oak logs.");
  } else {
    const oakLog = bot.findBlock({
      matching: mcData.blocksByName.oak_log.id,
      maxDistance: 32
    });
    if (oakLog) {
      await mineBlock(bot, "oak_log", requiredLogs);
      bot.chat("Mined 2 oak logs.");
    } else {
      const foundOakLog = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
        const oakLog = bot.findBlock({
          matching: mcData.blocksByName.oak_log.id,
          maxDistance: 32
        });
        return oakLog;
      });
      if (foundOakLog) {
        await mineBlock(bot, "oak_log", requiredLogs);
        bot.chat("Mined 2 oak logs.");
      } else {
        bot.chat("Could not find any oak logs.");
      }
    }
  }
}