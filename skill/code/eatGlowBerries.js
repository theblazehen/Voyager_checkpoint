async function eatGlowBerries(bot) {
  // Equip the glow_berries in the bot's hand
  const glowBerries = bot.inventory.findInventoryItem(mcData.itemsByName.glow_berries.id);
  await bot.equip(glowBerries, "hand");

  // Consume the glow_berries
  await bot.consume();
  bot.chat("Ate 1 glow_berries.");
}