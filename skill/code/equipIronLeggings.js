async function equipIronLeggings(bot) {
  // Find the iron_leggings in the bot's inventory
  const ironLeggings = bot.inventory.findInventoryItem(mcData.itemsByName.iron_leggings.id);

  // Equip the iron_leggings in the legs armor slot
  await bot.equip(ironLeggings, "legs");
  bot.chat("Equipped the iron leggings.");
}