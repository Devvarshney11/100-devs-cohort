import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Heading from "./Heading";
import Inputbox from "./Inputbox";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [balance, setBalance] = useState(0);

  const signUpFunction = async () => {
    try {
      const data = {
        username: username,
        firstName: firstName,
        lastName: lastName,
        password: password,
        balance: balance,
      };
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/signup",
        data
      );
      console.log(response);
      localStorage.setItem("token", response.data.token);
      window.location.reload("/dashboard");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <Heading label={"Sign Up"} />
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Inputbox
                label={"Username"}
                placeholder={"Enter Your Username"}
                val={username}
                func={(val) => {
                  setUsername(val);
                }}
              />
              <Inputbox
                label={"FirstName"}
                placeholder={"Enter Your Firstname"}
                val={firstName}
                func={(val) => {
                  setFirstName(val);
                }}
              />
              <Inputbox
                label={"LastName"}
                placeholder={"Enter Your Lastname"}
                val={lastName}
                func={(val) => {
                  setLastName(val);
                }}
              />
              <Inputbox
                label={"Password"}
                placeholder={"Enter password of min length 8"}
                val={password}
                func={(val) => {
                  setPassword(val);
                }}
              />
              <Inputbox
                label={"Account Opening Balance"}
                placeholder={"Enter account opening balance"}
                val={balance}
                func={(val) => {
                  setBalance(val);
                }}
              />
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={(e) => {
                  e.preventDefault();
                  signUpFunction();
                }}
              >
                Sign Up
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link to="/signin">
                  <span className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Login here
                  </span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
