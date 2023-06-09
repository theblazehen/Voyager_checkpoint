async function eatCookedPorkchop(bot) {
  if (bot.food < 20) {
    // Equip the cooked_porkchop in the bot's hand
    const cookedPorkchop = bot.inventory.findInventoryItem(mcData.itemsByName.cooked_porkchop.id);
    await bot.equip(cookedPorkchop, "hand");

    // Consume the cooked_porkchop
    await bot.consume();
    bot.chat("Ate 1 cooked porkchop.");
  } else {
    bot.chat("Hunger is full, no need to eat a cooked porkchop.");
  }
}