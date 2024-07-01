import React, { useState } from "react";
import Heading from "./Heading";
import Inputbox from "./Inputbox";
import SubHeading from "./SubHeading";
import Button from "./Button";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [balance, setBalance] = useState("");
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your information to signup"} />
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
          <Button label={"SignUp"} />
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <span className="font-medium text-primary-600 hover:underline dark:text-primary-500">
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
