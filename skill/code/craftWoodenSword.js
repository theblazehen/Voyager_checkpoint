async function craftWoodenSword(bot) {
  // Check if the bot has a crafting table in the inventory
  const craftingTable = bot.inventory.findInventoryItem(mcData.itemsByName.crafting_table.id);

  // If not, mine a dark_oak_log, craft dark_oak_planks, and then craft a crafting table
  if (!craftingTable) {
    await mineBlock(bot, "dark_oak_log", 1);
    await craftItem(bot, "dark_oak_planks", 1);
    await craftItem(bot, "crafting_table", 1);
  }

  // Use exploreUntil to find a suitable block to place the crafting table on
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

  // Place the crafting table on the suitable block
  await placeItem(bot, "crafting_table", suitableBlock.position.offset(0, 1, 0));

  // Check if the bot has enough dark_oak_planks and sticks in the inventory
  const requiredPlanks = 2;
  const requiredSticks = 1;
  const currentPlanks = bot.inventory.count(mcData.itemsByName.dark_oak_planks.id);
  const currentSticks = bot.inventory.count(mcData.itemsByName.stick.id);

  // If not, mine dark_oak_log and craft dark_oak_planks, then craft sticks
  if (currentPlanks < requiredPlanks) {
    const logsNeeded = Math.ceil((requiredPlanks - currentPlanks) / 4);
    await mineBlock(bot, "dark_oak_log", logsNeeded);
    await craftItem(bot, "dark_oak_planks", logsNeeded);
  }
  if (currentSticks < requiredSticks) {
    const planksNeeded = Math.ceil((requiredSticks - currentSticks) / 4);
    await craftItem(bot, "stick", planksNeeded);
  }

  // Craft a wooden sword using the crafting table
  await craftItem(bot, "wooden_sword", 1);
  bot.chat("Crafted a wooden sword.");
}