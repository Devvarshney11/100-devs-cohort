import { getClient } from "./db/index";

async function getUsers() {
  const client = await getClient();

  const query = "SELECT * FROM users;";
  const response = await client.query(query);
  for (let user of response.rows) {
    console.log(`User id is ${user.id} and email is ${user.email} `);
  }
}

async function getUsersWithEmail() {
  const client = await getClient();

  const query = "SELECT *FROM users WHERE email = $1";
  const response = await client.query(query, ["devvarshney11@gmail.com"]);
  response.rows.forEach((user) => {
    console.log(`User id is ${user.id} and email is ${user.email} `);
  });
}

async function getTodosOfUser(id: number) {
  const client = await getClient();

  const query = "SELECT *FROM todos WHERE user_id = $1";
  const response = await client.query(query, [id]);
  response.rows.forEach((todos) => {
    console.log(
      `Title is ${todos.title} and Description is ${todos.description}`
    );
  });
}
// getUsers();
// getUsersWithEmail();

getTodosOfUser(3);
