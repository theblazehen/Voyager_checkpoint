async function cookOneCod(bot) {
  // Find a suitable solid block to place the furnace on
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

  // Place the furnace on the suitable solid block
  await placeItem(bot, "furnace", suitableBlock.position.offset(0, 1, 0));

  // Cook the cod in the furnace using coal as fuel
  await smeltItem(bot, "cod", "coal", 1);
  bot.chat("Cooked 1 cod in the furnace.");
}