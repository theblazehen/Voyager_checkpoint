async function equipIronChestplate(bot) {
  // Find the iron chestplate in the bot's inventory
  const ironChestplate = bot.inventory.findInventoryItem(mcData.itemsByName.iron_chestplate.id);

  // Equip the iron chestplate in the chestplate slot
  await bot.equip(ironChestplate, "torso");
  bot.chat("Equipped the iron chestplate.");
}