async function eatOneCookedMutton(bot) {
  // Equip the cooked mutton in the bot's hand
  const cookedMutton = bot.inventory.findInventoryItem(mcData.itemsByName.cooked_mutton.id);
  await bot.equip(cookedMutton, "hand");

  // Consume the cooked mutton
  await bot.consume();
  bot.chat("Ate 1 cooked mutton.");
}