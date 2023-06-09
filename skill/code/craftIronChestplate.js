async function craftIronChestplate(bot) {
  // Check if the bot has a crafting table in the inventory
  const craftingTable = bot.inventory.findInventoryItem(mcData.itemsByName.crafting_table.id);

  // If not, craft a crafting table using the existing dark_oak_planks
  if (!craftingTable) {
    await craftItem(bot, "crafting_table", 1);
  }

  // Place the crafting table near the bot
  const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", craftingTablePosition);

  // Check if the bot has enough iron ingots in the inventory
  const requiredIronIngots = 8;
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

  // Craft an iron chestplate using the crafting table
  await craftItem(bot, "iron_chestplate", 1);
  bot.chat("Crafted an iron chestplate.");
}