async function placeChest(bot) {
  // Find a suitable position near the bot to place the chest
  const chestPosition = bot.entity.position.offset(1, 0, 0);

  // Place the chest at the selected position
  await placeItem(bot, "chest", chestPosition);
  bot.chat("Placed a chest.");
}