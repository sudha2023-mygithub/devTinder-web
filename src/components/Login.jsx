import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [emailId, setEmailId] = useState("msreddy885@gmail.com");
  const [password, setPassword] = useState("Sudharshan@123");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          type="email"
          className="input"
        />

        <label className="label">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="input"
        />

        <button onClick={handleLogin} className="btn btn-neutral mt-4">
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
