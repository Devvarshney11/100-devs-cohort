import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: "Devvarshney@gmail.com",
      name: "Dev",
    },
  });
}

main()
  .then(async () => {
    console.log("Query Execute Successfully");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
