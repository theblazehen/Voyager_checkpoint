async function openChestAndCheckContents(bot) {
  const chestPosition = new Vec3(789, 67, 642);
  await moveToChest(bot, chestPosition);
  await checkItemInsideChest(bot, chestPosition);
  bot.chat("Checked the chest at (789, 67, 642).");
}