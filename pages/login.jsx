import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { AppContext } from "../Components/AppContext";

function Signin() {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [isLoading,setIsLoading] = useState(false)
  const { auth, handleLogin } = useContext(AppContext);
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)
    axios
      .post("https://sush-todo-api.onrender.com/login", formState)
      .then((res) => {
        console.log(res.data);
        alert(res.data.msg);
        handleLogin(res.data);
        setIsLoading(false)
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false)
      });
  };
  return (
    <div id="signup">
      <div>
        <img src="/dummy-image.jpg" alt="" />
      </div>
      <form onSubmit={handleSubmit}>
        <div >
          <p className="text-lg">Welcome!</p>
          <br />
          <p className="text-3xl font-bold">Sign in to</p>
          <br />
          <p className="text-lg">Expertia AI</p>
        </div>
        <div>
          <label htmlFor="">Email</label>
          <br />
          <input
            type="email"
            placeholder="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <br />
          <input
            type="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
            placeholder="password"
          />
        </div>
        <div>
          <input
            type="submit"
            value={isLoading? "Loading...": "Login"}
            className="bg-black text-white w-80 p-2"
          />
        </div>
        <div className="w-fit m-auto">
          Don't have an account ?{" "}
          <b>
            <Link href="/signup">Register</Link>
          </b>
        </div>
      </form>
    </div>
  );
}

export default Signin;
