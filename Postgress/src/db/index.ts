import { Client } from "pg";

export async function getClient() {
  const client = new Client("DATABASE_URL");
  await client.connect();
  return client;
}
