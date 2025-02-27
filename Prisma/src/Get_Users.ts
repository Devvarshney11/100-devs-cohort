import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["info", "query"],
});

async function main() {
  //   const users = await prisma.user.findMany({});
  //   console.log(users);
  const users = await prisma.user.findUnique({
    where: {
      id: 1,
    },
    include: {
      posts: true,
    },
  });
  console.log(users);
}

main();
