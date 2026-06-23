import { prisma } from "../app.js";

async function seedUser() {
  await prisma.user.upsert({
    where: { email: "john.doe@example.com" },
    update: {},
    create: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password123",
    },
  });
}

async function seedWoods() {
  await prisma.wood.createMany({
    data: [
      { name: "Sapin", type: "softwood", hardness: "tender" },
      { name: "Pin", type: "softwood", hardness: "tender" },
      { name: "Chêne", type: "noble_and_hardwoods", hardness: "hard" },
      { name: "Hêtre", type: "noble_and_hardwoods", hardness: "medium_hard" },
      { name: "Teck", type: "exotic_wood", hardness: "hard" },
      { name: "Acajou", type: "exotic_wood", hardness: "medium_hard" },
    ],
    skipDuplicates: true,
  });
}

async function main() {
  await seedUser();
  await seedWoods();
  console.log("Database seeded successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
