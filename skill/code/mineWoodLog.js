async function mineWoodLog(bot) {
  // Find a nearby wood log
  const log = bot.findBlock({
    matching: block => {
      return block.name === "oak_log" || block.name === "birch_log" || block.name === "spruce_log" || block.name === "jungle_log" || block.name === "acacia_log" || block.name === "dark_oak_log" || block.name === "mangrove_log";
    },
    maxDistance: 32
  });
  if (!log) {
    // If no log is found, explore until a log is found
    await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      const log = bot.findBlock({
        matching: block => {
          return block.name === "oak_log" || block.name === "birch_log" || block.name === "spruce_log" || block.name === "jungle_log" || block.name === "acacia_log" || block.name === "dark_oak_log" || block.name === "mangrove_log";
        },
        maxDistance: 32
      });
      return log;
    });
  }

  // Mine the wood log
  await mineBlock(bot, log.name, 1);
}