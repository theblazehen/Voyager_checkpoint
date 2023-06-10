async function craftFishingRodWithTable(bot) {
  // Check if we have enough sticks and strings in the inventory
  const requiredSticks = 3;
  const requiredStrings = 2;
  const currentSticks = bot.inventory.count(mcData.itemsByName.stick.id);
  const currentStrings = bot.inventory.count(mcData.itemsByName.string.id);

  // If not enough sticks, mine oak logs and craft oak planks and sticks
  if (currentSticks < requiredSticks) {
    const planksNeeded = Math.ceil((requiredSticks - currentSticks) / 4);
    await mineBlock(bot, "oak_log", planksNeeded);
    await craftItem(bot, "oak_planks", planksNeeded);
    await craftItem(bot, "stick", planksNeeded);
  }

  // If not enough strings, kill spiders to collect strings
  if (currentStrings < requiredStrings) {
    const spidersToKill = requiredStrings - currentStrings;
    for (let i = 0; i < spidersToKill; i++) {
      await killMob(bot, "spider", 300);
    }
  }

  // Check if the bot has a crafting table in the inventory
  const craftingTable = bot.inventory.findInventoryItem(mcData.itemsByName.crafting_table.id);

  // If not, mine an oak_log, craft oak_planks, and then craft a crafting table
  if (!craftingTable) {
    await mineBlock(bot, "oak_log", 1);
    await craftItem(bot, "oak_planks", 1);
    await craftItem(bot, "crafting_table", 1);
  }

  // Find a suitable block to place the crafting table on (not water or leaves)
  const suitableBlock = bot.findBlock({
    matching: block => {
      return block.name !== "air" && block.name !== "leaves" && block.name !== "water";
    },
    maxDistance: 32
  });

  // Place the crafting table near the bot on the suitable block
  const craftingTablePosition = suitableBlock.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", craftingTablePosition);

  // Craft a fishing rod using the crafting table
  await craftItem(bot, "fishing_rod", 1);
  bot.chat("Crafted a fishing rod.");
}