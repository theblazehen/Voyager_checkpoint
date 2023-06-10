async function placeChestAvoidingWater(bot) {
  // Check if there is a chest in the bot's inventory
  const chest = bot.inventory.findInventoryItem(mcData.itemsByName.chest.id);
  if (!chest) {
    bot.chat("No chest in inventory.");
    return;
  }

  // Find a suitable position near the bot to place the chest, avoiding water blocks
  const offsets = [new Vec3(1, 0, 0), new Vec3(-1, 0, 0), new Vec3(0, 0, 1), new Vec3(0, 0, -1)];
  let chestPosition = null;
  for (const offset of offsets) {
    const position = bot.entity.position.offset(offset.x, offset.y, offset.z);
    const block = bot.blockAt(position);
    if (block.name === "air" && bot.blockAt(position.offset(0, -1, 0)).name !== "water") {
      chestPosition = position;
      break;
    }
  }

  // Place the chest at the selected position
  if (chestPosition) {
    await placeItem(bot, "chest", chestPosition);
    bot.chat("Placed a chest.");
  } else {
    bot.chat("Cannot place a chest. No suitable position found.");
  }
}