async function craftIronAxe(bot) {
  // Check if we have enough iron ingots and sticks in the inventory
  const requiredIronIngots = 3;
  const requiredSticks = 2;
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
    await mineBlock(bot, "oak_log", planksNeeded);
    await craftItem(bot, "oak_planks", planksNeeded);
    await craftItem(bot, "stick", planksNeeded);
  }

  // Check if we have a crafting table in the inventory
  const craftingTable = bot.inventory.findInventoryItem(mcData.itemsByName.crafting_table.id);

  // If not, craft one
  if (!craftingTable) {
    await mineBlock(bot, "oak_log", 1);
    await craftItem(bot, "oak_planks", 1);
    await craftItem(bot, "crafting_table", 1);
  }

  // Find a suitable block to place the crafting table on (not leaves)
  const suitableBlock = bot.findBlock({
    matching: block => {
      return block.name !== "air" && block.name !== "leaves";
    },
    maxDistance: 32
  });

  // Place the crafting table near the bot
  const craftingTablePosition = suitableBlock.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", craftingTablePosition);

  // Craft an iron axe using the crafting table with 3 iron ingots and 2 sticks
  await craftItem(bot, "iron_axe", 1);
  bot.chat("Crafted an iron axe.");
}