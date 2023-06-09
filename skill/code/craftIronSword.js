async function craftIronSword(bot) {
  // Check if we have enough iron ingots and sticks in the inventory
  const requiredIronIngots = 2;
  const requiredSticks = 1;
  const currentIronIngots = bot.inventory.count(mcData.itemsByName.iron_ingot.id);
  const currentSticks = bot.inventory.count(mcData.itemsByName.stick.id);

  // If not, mine iron ore and smelt it into iron ingots, and craft sticks as needed
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
  if (currentSticks < requiredSticks) {
    const planksNeeded = Math.ceil((requiredSticks - currentSticks) / 4);
    await mineBlock(bot, "dark_oak_log", planksNeeded);
    await craftItem(bot, "dark_oak_planks", planksNeeded);
    await craftItem(bot, "stick", planksNeeded);
  }

  // Check if we have a crafting table in the inventory
  const craftingTable = bot.inventory.findInventoryItem(mcData.itemsByName.crafting_table.id);

  // If not, craft one
  if (!craftingTable) {
    await mineBlock(bot, "dark_oak_log", 1);
    await craftItem(bot, "dark_oak_planks", 1);
    await craftItem(bot, "crafting_table", 1);
  }

  // Place the crafting table near the bot
  const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", craftingTablePosition);

  // Craft an iron sword using the crafting table
  await craftItem(bot, "iron_sword", 1);
  bot.chat("Crafted an iron sword.");
}