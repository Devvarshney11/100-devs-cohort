import { getClient } from "./db/index";

async function createEntries() {
  const client = await getClient();
  try {
    const insertUserText =
      "INSERT INTO users (email,password) VALUES ($1,$2) RETURNING id";
    const userValues = ["devvarshney@gmail.com", "123456"];

    const response = await client.query(insertUserText, userValues);

    const insertTodoText =
      "INSERT INTO todos (title,description,user_id) VALUES ($1,$2,$3) RETURNING id";
    const todosValues = [
      "Buy grocries",
      "Milk,bread,and eggs",
      response.rows[0].id,
    ];
    await client.query(insertTodoText, todosValues);

    console.log("Entries Created");
  } catch (e) {
    console.log(e);
  }
}

createEntries();
