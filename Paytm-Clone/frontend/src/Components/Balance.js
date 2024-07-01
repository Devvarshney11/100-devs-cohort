import axios from "axios";
import { useEffect, useState } from "react";

const Balance = () => {
  const [balance, setBalance] = useState(0);
  async function fetchUserBalance() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/v1/accounts/balance",
        { headers: { authorization: token } }
      );
      setBalance(response.data.balance);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    fetchUserBalance();
  }, []);

  return (
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 m-10">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Balance
      </h5>
      <p className="font-normal text-green-500">{balance}</p>
    </div>
  );
};

export default Balance;
