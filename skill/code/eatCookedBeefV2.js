async function eatCookedBeef(bot) {
  // Equip the cooked beef in the bot's hand
  const cookedBeef = bot.inventory.findInventoryItem(mcData.itemsByName.cooked_beef.id);
  await bot.equip(cookedBeef, "hand");

  // Consume the cooked beef
  await bot.consume();
  bot.chat("Ate 1 cooked beef.");
}