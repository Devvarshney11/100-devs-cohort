import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.post.create({
    data: {
      title: "Diwali",
      content: "Happy Diwali",
      user: {
        connect: {
          id: 2,
        },
      },
      published: true,
    },
  });
}

main()
  .then(async () => {
    console.log("Post Created For User");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
  });
