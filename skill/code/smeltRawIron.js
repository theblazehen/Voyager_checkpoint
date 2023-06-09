async function smeltRawIron(bot) {
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

  // Smelt the 7 raw iron in the furnace using coal as fuel
  await smeltItem(bot, "raw_iron", "coal", 7);
  bot.chat("Smelted 7 raw iron in the furnace.");
}