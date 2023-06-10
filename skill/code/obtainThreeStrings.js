async function obtainThreeStrings(bot) {
  // Check if the bot already has 3 strings in the inventory
  const currentStringCount = bot.inventory.count(mcData.itemsByName.string.id);
  if (currentStringCount >= 3) {
    bot.chat("Already have 3 strings.");
    return;
  }

  // Equip the iron_sword
  const ironSword = bot.inventory.findInventoryItem(mcData.itemsByName.iron_sword.id);
  await bot.equip(ironSword, "hand");

  // Initialize a variable to keep track of the number of strings collected
  let stringCount = currentStringCount;

  // Use a while loop to keep exploring and killing spiders until the bot has collected 3 strings
  while (stringCount < 3) {
    // Find and kill a spider using exploreUntil and killMob functions
    const spider = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      const spider = bot.nearestEntity(entity => {
        return entity.name === "spider" && entity.position.distanceTo(bot.entity.position) < 32;
      });
      return spider;
    });
    if (spider) {
      await killMob(bot, spider.name, 300);
    } else {
      bot.chat("No spider found, continuing exploration.");
    }

    // Update the string count and check if the bot has collected 3 strings
    stringCount = bot.inventory.count(mcData.itemsByName.string.id);
  }

  // Report success
  bot.chat("Collected 3 strings.");
}