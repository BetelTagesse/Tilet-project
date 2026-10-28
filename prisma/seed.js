/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "Habesha Kemis, Gold Border",
        description: "Handwoven traditional dress with a gold tibeb border.",
        price: 420000,
        category: "women",
        sizes: ["S", "M", "L"],
        colors: ["maroon", "gold"],
      },
      {
        name: "Men's Tibeb Suit",
        description: "Formal suit with woven tibeb trim.",
        price: 650000,
        category: "men",
        sizes: ["M", "L", "XL"],
        colors: ["charcoal"],
      },
      {
        name: "Kids Holiday Kemis",
        description: "Festive traditional dress for children.",
        price: 210000,
        category: "kids",
        sizes: ["4-6", "7-9"],
        colors: ["gold"],
      },
    ],
  });
  console.log("Seeded products");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
