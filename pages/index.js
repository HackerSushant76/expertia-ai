import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Components/AppContext";
import TodoCard from "../Components/todoCard";

function Home(props) {
  const [todos, setTodos] = useState(props.tasks);
  const [task, setTask] = useState("");
  const { auth, handleLogout } = useContext(AppContext);
  console.log(auth);
  const router = useRouter();
  const addTodo = () => {
    if (todos.length === 5) {
      alert("Daily limit exceeded");
      return;
    }

    let date = new Date().toDateString().split(" ").join("_");
    const todo = {
      title: task,
      status: false,
      date: date,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    };
    axios
      .post("http://localhost:8080/todos/create", todo, config)
      .then((res) => {
        console.log(res.data);
        setTodos([...todos, todo]);
        setTask("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    !auth.isAuth ? router.push("/signup") : null;
  }, [auth.isAuth]);
  return (
    <div>
      <br />
      <div className="w-max m-auto p-10 shadow-xl border border-slate-200 rounded-md">
        <div>
          <p className="text-2xl">Hello</p>
          <br />
          <b className="text-4xl bold">{auth.name || "User"} </b>
          <br />

          <br />
          <p className="text-xl">Good to see you here!</p>
          <br />
          <h3 className="text-xl font-bold">
            Tasks for {new Date().toDateString()}
          </h3>
          <br />
          <ul className="list-disc pl-9">
            {todos?.map((elem) => (
              <TodoCard
                key={elem._id}
                id={elem._id}
                title={elem.title}
                status={elem.status}
              />
            ))}
          </ul>
        </div>
        <br />
        <br />
        <br />
        <div className="flex flex-col gap-y-3">
          <input
            type="text"
            value={task}
            placeholder="add todos"
            onChange={(e) => setTask(e.target.value)}
            className="border-black border-solid border-2 w-80 p-2"
          />
          <button onClick={addTodo} className="bg-black text-white w-80 p-2">
            Add
          </button>
          <button
            onClick={() => handleLogout()}
            className="bg-slate-100 text-black w-80 p-2 font-bold"
          >
            Logout
          </button>
        </div>
      </div>
      <br />
    </div>
  );
}

export default Home;

export const getServerSideProps = async ({ req, res }) => {
  let date = new Date().toDateString().split(" ").join("_");
  let token = getCookie("token", { req, res });
  // console.log(token)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get(
    `http://localhost:8080/todos?date=${date}`,
    config
  );
  // console.log("data" ,data)
  return {
    props: { tasks: data },
  };
};
