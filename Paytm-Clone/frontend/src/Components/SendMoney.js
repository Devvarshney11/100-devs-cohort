import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const SendMoney = () => {
  const { id, name } = useParams();
  const [balance, setBalance] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  async function sendMoney() {
    try {
      await axios.post(
        "http://localhost:5000/api/v1/accounts/transfer",
        {
          to: id,
          balance: Number(balance),
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Error sending money:", error);
    }
  }

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center items-center">
        {showNotification && (
          <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg flex items-center">
            <span className="ml-2">Money sent successfully!</span>
          </div>
        )}
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Send Money</h2>
          </div>
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-2xl text-white">
                {name[0].toUpperCase()}
              </span>
            </div>
            <h3 className="text-2xl font-semibold">{name}</h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="amount"
                className="text-sm font-medium leading-none"
              >
                Amount (in Rs)
              </label>
              <input
                onChange={(e) => setBalance(e.target.value)}
                type="text"
                value={balance}
                className="w-full h-10 px-3 py-2 border rounded-md text-sm"
                placeholder="Enter amount"
                id="amount"
              />
            </div>
            <button
              onClick={sendMoney}
              className="w-full h-10 px-4 py-2 bg-green-500 text-white rounded-md text-sm font-medium"
            >
              Initiate Transfer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
