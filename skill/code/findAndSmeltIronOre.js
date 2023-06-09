async function findAndSmeltIronOre(bot) {
  // Find and mine 10 iron ore
  for (let i = 0; i < 10; i++) {
    const ironOre = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      const iron_ore = bot.findBlock({
        matching: mcData.blocksByName["iron_ore"].id,
        maxDistance: 32
      });
      return iron_ore;
    });
    await mineBlock(bot, "iron_ore", 1);
  }
  bot.chat("Mined 10 iron ore.");

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

  // Smelt the 10 iron ore in the furnace using coal as fuel
  await smeltItem(bot, "iron_ore", "coal", 10);
  bot.chat("Smelted 10 iron ore in the furnace.");
}