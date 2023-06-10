async function openChestAtPosition(bot) {
  const chestPosition = new Vec3(691, 57, 877);
  const chestBlock = bot.blockAt(chestPosition);

  // Check if the chest is present at the specified position
  if (chestBlock && chestBlock.name === "chest") {
    await moveToChest(bot, chestPosition);
    await checkItemInsideChest(bot, chestPosition);
    bot.chat("Opened the chest at (691, 57, 877).");
  } else {
    bot.chat("No chest found at (691, 57, 877).");
  }
}