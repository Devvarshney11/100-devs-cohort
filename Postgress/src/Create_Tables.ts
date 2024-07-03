import { getClient } from "./db/index";

async function Create_Tables() {
  const client = await getClient();

  try {
    const user_table_query = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );`;

    await client.query(user_table_query);

    const todo_table_query = `
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        done BOOLEAN DEFAULT FALSE
      );`;

    await client.query(todo_table_query);

    console.log("Tables created successfully");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
}

Create_Tables();
