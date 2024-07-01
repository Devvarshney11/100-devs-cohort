import UserCard from "./UserCard";
import { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [searchInput, setSearchInput] = useState("");
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  async function fetchData(filter) {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/users/bulk/?filter=" + filter,
        { headers: { authorization: token } }
      );
      setUsers(response.data.users);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    fetchData("");
  }, []);
  return (
    <div>
      <form
        className="max-w-md mx-auto"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Users"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={(e) => {
              fetchData(searchInput);
            }}
          >
            Search
          </button>
        </div>
      </form>
      <ul className="w-full mt-10">
        {users.map((user) => {
          return (
            <UserCard
              firstName={user.firstName}
              lastName={user.lastName}
              id={user.id}
              key={user.id}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Users;
