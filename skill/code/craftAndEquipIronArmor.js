async function craftAndEquipIronArmor(bot) {
  // Place a crafting table near the bot
  const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", craftingTablePosition);

  // Craft iron boots using the crafting table
  await craftItem(bot, "iron_boots", 1);

  // Craft an iron helmet using the crafting table
  await craftItem(bot, "iron_helmet", 1);

  // Equip the iron boots and iron helmet
  const ironBoots = bot.inventory.findInventoryItem(mcData.itemsByName.iron_boots.id);
  const ironHelmet = bot.inventory.findInventoryItem(mcData.itemsByName.iron_helmet.id);
  await bot.equip(ironBoots, "feet");
  await bot.equip(ironHelmet, "head");
  bot.chat("Crafted and equipped iron boots and an iron helmet.");
}