async function moveToChest(bot, chestPosition) {
  await bot.pathfinder.goto(new GoalNear(chestPosition.x, chestPosition.y, chestPosition.z, 1));
}

async function openChestAtPosition(bot) {
  const chestPosition = new Vec3(694, 58, 872);
  await moveToChest(bot, chestPosition);
  const chestBlock = bot.blockAt(chestPosition);

  // Check if the chest is present at the specified position
  if (chestBlock && chestBlock.name === "chest") {
    await checkItemInsideChest(bot, chestPosition);
    bot.chat("Opened the chest at (694, 58, 872).");
  } else {
    bot.chat("No chest found at (694, 58, 872).");
  }
}