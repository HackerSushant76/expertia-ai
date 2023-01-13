import React, { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../Components/AppContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader } from "../Components/loader";

function Signup() {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    name: "",
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
      .post("https://sush-todo-api.onrender.com/signup", formState)
      .then((res) => {
        console.log(res.data);
        handleLogin(res.data);
        setIsLoading(false)
        if (res.data === "User already exists") {
          alert(res.data);
          router.push("/login");
        } else {
          alert(res.data.msg);
          router.push("/");
        }
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
        <div>
          <p className="text-lg">Welcome!</p>
          <br />
          <p className="text-3xl font-bold">Sign up to</p>
          <br />
          <p className="text-lg">Expertia AI</p>
        </div>
        <div>
          <label htmlFor="">Full Name</label>
          <br />
          <input
            type="text"
            placeholder="Full name"
            name="name"
            value={formState.name}
            onChange={handleChange}
          />
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
            value={isLoading? "loading...": "Register"}
            className="bg-black text-white w-80 p-2"
          />
        </div>
        <div className="w-fit m-auto">
          Already have an account ?{" "}
          <b>
            <Link href="/login">Login</Link>
          </b>
        </div>
      </form>
    </div>
  );
}

export default Signup;
