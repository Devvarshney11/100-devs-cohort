// import useTodos from "./Hooks/useTodo";
import useIsOnline from "./Hooks/useIsOnline";
function App() {
  // const { list, loading } = useTodos(10);
  // return loading ? (
  //   <div>Loading.........</div>
  // ) : (
  //   <div>
  //     {list?.map((t) => {
  //       return (
  //         <div key={t.id}>
  //           <p>{t.title}</p>
  //           <p>{t.description}</p>
  //         </div>
  //       );
  //     })}
  //   </div>
  // );
  const isOnline = useIsOnline();
  return isOnline ? <div>Online</div> : <div>Offline</div>;
}

export default App;
