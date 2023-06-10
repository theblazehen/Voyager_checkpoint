async function cookTwoMuttonWithCoalCheck(bot) {
  // Check if there is coal in the inventory, if not, mine a coal_ore block to obtain coal
  const coalItem = bot.inventory.findInventoryItem(mcData.itemsByName.coal.id);
  if (!coalItem) {
    await mineBlock(bot, "coal_ore", 1);
  }

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

  // Cook the 2 mutton in the furnace using coal as fuel
  await smeltItem(bot, "mutton", "coal", 2);
  bot.chat("Cooked 2 mutton in the furnace.");
}