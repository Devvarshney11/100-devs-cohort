import { getClient } from "./db/index";

async function updateTodo(todoId: number) {
  const client = await getClient();
  try {
    const query = "UPDATE todos SET done = $1 WHERE id = $2";
    const response = await client.query(query, [true, todoId]);

    console.log(`Todo with ID ${todoId} updated to done! `);
  } catch (e) {
    console.log(e);
  }
}

updateTodo(1);
