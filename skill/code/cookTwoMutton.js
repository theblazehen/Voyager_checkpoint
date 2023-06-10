async function cookTwoMutton(bot) {
  // Find a suitable solid block to place the furnace on
  const suitableBlock = await findSuitableSolidBlock(bot);

  // Place the furnace on the suitable solid block
  await placeItem(bot, "furnace", suitableBlock.position.offset(0, 1, 0));

  // Cook the 2 mutton in the furnace using coal as fuel
  await smeltItem(bot, "mutton", "coal", 2);
  bot.chat("Cooked 2 mutton in the furnace.");
}