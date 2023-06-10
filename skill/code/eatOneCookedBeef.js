async function eatOneCookedBeef(bot) {
  const cookedBeef = bot.inventory.findInventoryItem(mcData.itemsByName.cooked_beef.id);
  const rawBeef = bot.inventory.findInventoryItem(mcData.itemsByName.beef.id);
  const coal = bot.inventory.findInventoryItem(mcData.itemsByName.coal.id);
  if (cookedBeef) {
    await eatCookedBeef(bot);
  } else if (rawBeef && coal) {
    await cookBeef(bot);
    await eatCookedBeef(bot);
  } else {
    bot.chat("I don't have cooked beef or the necessary items to cook beef.");
  }
}