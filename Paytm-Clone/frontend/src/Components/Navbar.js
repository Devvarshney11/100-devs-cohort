import axios from "axios";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
  });

  async function fetchUserData() {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get(
          "http://localhost:5000/api/v1/users/profile",
          { headers: { authorization: token } }
        );
        console.log(response);
        setUser(response.data); // Assuming the user data is in response.data
      } else {
        console.log("No token found");
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          Paytm
        </span>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <span className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                {user.firstName + " " + user.lastName}
              </span>
            </li>
            <li>
              <span
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/signin";
                }}
              >
                {"Log Out"}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
