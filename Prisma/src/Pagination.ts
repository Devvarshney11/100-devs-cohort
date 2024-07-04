import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  let res = await prisma.post.findMany({
    take: 5,
    skip: 1,
  });
  console.log(res);
}

main()
  .then(() => {
    prisma.$disconnect();
  })
  .catch((e) => {
    console.log(e);
    prisma.$disconnect();
  });
