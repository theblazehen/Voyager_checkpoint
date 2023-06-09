async function killAnimalForFood(bot) {
  // Equip the stone_pickaxe
  await bot.equip(mcData.itemsByName.stone_pickaxe.id, "hand");

  // Explore until finding an animal (cow, pig, chicken, or sheep)
  const animal = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const animal = bot.nearestEntity(entity => {
      return ["cow", "pig", "chicken", "sheep"].includes(entity.name) && entity.position.distanceTo(bot.entity.position) < 32;
    });
    return animal;
  });

  // Kill the animal using the killMob function
  await killMob(bot, animal.name, 300);

  // Collect the dropped item (meat)
  await bot.pathfinder.goto(new GoalBlock(animal.position.x, animal.position.y, animal.position.z));
  bot.chat("Killed an animal for food.");
}