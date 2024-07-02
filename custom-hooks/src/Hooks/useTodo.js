import { useState, useEffect } from "react";
import axios from "axios";

const useTodo = (n) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  function fetchData() {
    axios.get("https://sum-server.100xdevs.com/todos").then((res) => {
      console.log(res.data.todos);
      setList(res.data.todos);
      setLoading(false);
    });
  }
  useEffect(() => {
    setLoading(true);
    setInterval(fetchData(), n * 1000);
    fetchData();
    return () => {
      clearInterval();
    };
  }, [n]);

  return { list, loading };
};

export default useTodo;
