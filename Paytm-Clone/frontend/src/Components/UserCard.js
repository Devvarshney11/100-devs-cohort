import React from "react";
import { useNavigate } from "react-router-dom";

const UserCard = ({ firstName, lastName, id }) => {
  const navigate = useNavigate();
  return (
    <li class="flex items-center justify-between py-4 px-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 m-2">
      <span class="text-lg font-semibold text-gray-900 dark:text-white">
        {firstName + " " + lastName}
      </span>
      <button
        class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
        onClick={() => {
          const url = "/send/" + id + "/" + firstName + " " + lastName;
          navigate(url);
        }}
      >
        Send Money
      </button>
    </li>
  );
};

export default UserCard;
