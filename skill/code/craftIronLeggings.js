async function findSuitablePosition(bot) {
  const offsets = [new Vec3(1, 0, 0), new Vec3(-1, 0, 0), new Vec3(0, 0, 1), new Vec3(0, 0, -1)];
  for (const offset of offsets) {
    const position = bot.entity.position.offset(offset.x, offset.y, offset.z);
    const block = bot.blockAt(position);
    if (block.name === "air") {
      return position;
    }
  }
  return bot.entity.position;
}

async function craftIronLeggings(bot) {
  // Check if the bot has enough iron ingots in the inventory
  const requiredIronIngots = 7;
  const currentIronIngots = bot.inventory.count(mcData.itemsByName.iron_ingot.id);

  // If not, mine iron ore and smelt it into iron ingots
  if (currentIronIngots < requiredIronIngots) {
    const ironOre = await exploreUntil(bot, new Vec3(0, -1, 0), 60, () => {
      const iron_ore = bot.findBlock({
        matching: mcData.blocksByName["iron_ore"].id,
        maxDistance: 32
      });
      return iron_ore;
    });
    await mineBlock(bot, "iron_ore", requiredIronIngots - currentIronIngots);
    await smeltItem(bot, "iron_ore", "coal", requiredIronIngots - currentIronIngots);
  }

  // Check if the bot has a crafting table in the inventory
  const craftingTable = bot.inventory.findInventoryItem(mcData.itemsByName.crafting_table.id);

  // If not, mine a dark_oak_log, craft dark_oak_planks, and then craft a crafting table
  if (!craftingTable) {
    await mineBlock(bot, "dark_oak_log", 1);
    await craftItem(bot, "dark_oak_planks", 1);
    await craftItem(bot, "crafting_table", 1);
  }

  // Find a suitable position to place the crafting table
  const craftingTablePosition = await findSuitablePosition(bot);

  // Place the crafting table at the suitable position
  await placeItem(bot, "crafting_table", craftingTablePosition);

  // Craft iron leggings using the crafting table
  await craftItem(bot, "iron_leggings", 1);
  bot.chat("Crafted iron leggings.");
}