async function smeltRawCopper(bot) {
  // Check if there is a furnace in the inventory
  const furnace = bot.inventory.findInventoryItem(mcData.itemsByName.furnace.id);

  // If there is no furnace, craft one using the cobblestone in the inventory
  if (!furnace) {
    await craftItem(bot, "furnace", 1);
    bot.chat("Crafted a furnace.");
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

  // Smelt the 11 raw copper in the furnace using coal as fuel
  await smeltItem(bot, "raw_copper", "coal", 11);
  bot.chat("Smelted 11 raw copper in the furnace.");
}