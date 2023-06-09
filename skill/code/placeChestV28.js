async function placeChest(bot) {
  // Find a suitable position near the bot to place the chest
  const offsets = [new Vec3(1, 0, 0), new Vec3(-1, 0, 0), new Vec3(0, 0, 1), new Vec3(0, 0, -1)];
  let chestPosition = null;
  for (const offset of offsets) {
    const position = bot.entity.position.offset(offset.x, offset.y, offset.z);
    const block = bot.blockAt(position);
    if (block.name === "air") {
      chestPosition = position;
      break;
    }
  }
  if (chestPosition) {
    // Place the chest at the selected position
    await placeItem(bot, "chest", chestPosition);
    bot.chat("Placed a chest.");
  } else {
    bot.chat("Cannot place a chest. No suitable position found.");
  }
}