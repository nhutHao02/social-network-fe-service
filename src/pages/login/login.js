import React, { useState, useEffect } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import ENDPOINTS from "../../service/API";
import perform from "../../service/Service";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    const loginData = {
      email: email,
      password: password,
    };

    try {
      let response = await perform(ENDPOINTS.AUTH.LOGIN, {}, loginData);
      if (response.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data.id)
        navigate("/home");
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex items-center h-screen justify-center">
      <div className="flex border-2 border-blue-600 rounded-2xl h-72 space-x-0 w-2/5 h-2/5">
        <div className="flex flex-col bg-white p-7 border-2 rounded-l-2xl">
          <h2>Wellcome to ABC network</h2>
          <span>------------------------------</span>
          <span>Don't have an account?</span>
          <Link to="/signup">
            <button className="btn btn-primary mt-12"> Register</button>
          </Link>
        </div>
        <form
          onSubmit={handleLogin}
          className="flex flex-col bg-blue-700 p-7 rounded-r-2xl w-full"
        >
          <input
            className="mb-4 p-3 rounded-lg border border-blue-500 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="mb-4 p-3 rounded-lg border border-blue-500 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <p>---------------------------------</p>
          <button
            className="bg-white text-blue-700 font-bold py-2 rounded-lg hover:bg-blue-100 transition-colors duration-300 mt-9"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
