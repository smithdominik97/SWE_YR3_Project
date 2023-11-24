"use client";
import styles from "./page.module.css";

function HandleLogin() {
    // compare login data with database using bcrypt compare
    // 
    // see form for submit example
}

export default function Login() {

  return (
    <div>
    <h1>Login</h1>
    <form method="POST" onSubmit={HandleLogin}>
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" id="username"/>
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password"/>
        <button type="submit">Login</button>
    </form>
</div>
  );
}
