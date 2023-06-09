async function smeltFiveCopper(bot) {
  // Check if the bot has 5 raw_copper in the inventory
  const rawCopperCount = bot.inventory.count(mcData.itemsByName.raw_copper.id);

  // If not, mine copper ores until there are 5 raw_copper in the inventory
  if (rawCopperCount < 5) {
    await mineBlock(bot, "copper_ore", 5 - rawCopperCount);
    bot.chat("Mined enough copper ores to smelt 5 copper ingots.");
  }

  // Find a suitable block to place the furnace on
  const suitableBlock = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const offsets = [new Vec3(1, 0, 0), new Vec3(-1, 0, 0), new Vec3(0, 0, 1), new Vec3(0, 0, -1)];
    for (const offset of offsets) {
      const block = bot.blockAt(bot.entity.position.plus(offset));
      if (block && block.name !== "air" && block.name !== "grass") {
        return block;
      }
    }
    return null;
  });

  // Place the furnace on the suitable block
  await placeItem(bot, "furnace", suitableBlock.position.offset(0, 1, 0));

  // Smelt the 5 raw_copper in the furnace using coal as fuel
  await smeltItem(bot, "raw_copper", "coal", 5);
  bot.chat("Smelted 5 copper ingots in the furnace.");
}