import { Client } from "pg";

export async function getClient() {
  const client = new Client(
    "postgresql://Test_owner:0qwCbmSv1lxT@ep-lively-moon-a5usd6x8.us-east-2.aws.neon.tech/Test?sslmode=require"
  );
  await client.connect();
  return client;
}
