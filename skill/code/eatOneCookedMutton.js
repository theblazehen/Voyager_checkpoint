async function eatOneCookedMutton(bot) {
  if (bot.food < 20) {
    const rawMuttonItem = bot.inventory.findInventoryItem(mcData.itemsByName.mutton.id);
    const coalItem = bot.inventory.findInventoryItem(mcData.itemsByName.coal.id);
    if (!rawMuttonItem) {
      // Find and kill a sheep to obtain raw mutton
      await killMob(bot, "sheep");
    }

    // Find a suitable solid block to place the furnace on
    const suitableBlock = await findSuitableSolidBlock(bot);

    // Place the furnace on the suitable solid block
    await placeItem(bot, "furnace", suitableBlock.position.offset(0, 1, 0));

    // Cook the 1 raw mutton in the furnace using the coal as fuel
    await smeltItem(bot, "mutton", "coal", 1);
    bot.chat("Cooked 1 mutton in the furnace.");

    // Equip the cooked mutton in the bot's hand
    const cookedMutton = bot.inventory.findInventoryItem(mcData.itemsByName.cooked_mutton.id);
    await bot.equip(cookedMutton, "hand");

    // Consume the cooked mutton
    await bot.consume();
    bot.chat("Ate 1 cooked mutton.");
  } else {
    bot.chat("Hunger is full, no need to eat cooked mutton.");
  }
}