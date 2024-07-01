import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import Dashboard from "./Components/Dashboard";
import SendMoney from "./Components/SendMoney";

const token = localStorage.getItem("token");

const router = createBrowserRouter([
  {
    path: "/signup",
    element: token ? <Dashboard /> : <Signup />,
  },
  {
    path: "/signin",
    element: token ? <Dashboard /> : <Signin />,
  },
  {
    path: "/dashboard",
    element: token ? <Dashboard /> : <Signin />,
  },
  {
    path: "/send/:id/:name",
    element: token ? <SendMoney /> : <Signin />,
  },
]);
function App() {
  return (
    <div>
      <RouterProvider router={router} />{" "}
    </div>
  );
}

export default App;
