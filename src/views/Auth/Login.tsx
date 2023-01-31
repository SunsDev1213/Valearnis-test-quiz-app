import { useState } from "react";
import { login } from "../../hooks/auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const submitData = {
      username: username,
      password: password,
    };

    login(submitData).then((res: any) => {
      if (res?.access) {
        localStorage.setItem("token", res?.access);
        window.location.replace("/quiz");
      }
    });
  };

  return (
    <div className="container">
      <div className="auth-container">
        <h2>Log In</h2>
        <p>USERNAME / EMAIL</p>
        <input onChange={(e: any) => setUsername(e.target.value)} />
        <p>PASSWORD</p>

        <input
          type="password"
          onChange={(e: any) => setPassword(e.target.value)}
        />
        <h3>
          If you don't have account,{" "}
          <a href="https://app.valearnis.com/register" target="_blank">
            Sign Up
          </a>
        </h3>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
