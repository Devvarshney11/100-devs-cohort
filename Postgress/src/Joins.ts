import { getClient } from "./db/index";

async function GetData(id: number) {
  const client = await getClient();
  try {
    const query = `
        Select users.*,todos.title,todos.description,todos.done FROM users LEFT JOIN todos ON users.id = todos.user_id where users.id = $1`;
    const response = await client.query(query, [id]);
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}

GetData(3);
