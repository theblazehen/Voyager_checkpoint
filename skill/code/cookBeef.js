async function cookBeef(bot) {
  // Find a suitable solid block to place the furnace on
  const suitableBlock = await findSuitableSolidBlock(bot);

  // Place the furnace on the suitable solid block
  await placeItem(bot, "furnace", suitableBlock.position.offset(0, 1, 0));

  // Cook the 1 beef in the furnace using coal as fuel
  await smeltItem(bot, "beef", "coal", 1);
  bot.chat("Cooked 1 beef in the furnace.");
}