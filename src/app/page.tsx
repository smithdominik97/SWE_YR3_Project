"use client";
import styles from "./page.module.css";
import { HandleLogin } from "@/controller/login"
import { Login } from "@/types/types"
import { useRouter} from "next/navigation"
import getSysInfo  from "@/controller/sysinfo";





export default function Login() {

  getSysInfo();
  const router = useRouter();

  const loginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const login: Login = {
        username: formData.get('username') as string,
        password: formData.get('password') as string,
    };
    
   const success = await HandleLogin(login);
   if (success) {
    router.push('/menu');
  } else {
    alert('Wrong email/password. Try again.');
  }
}

  return (
    <div>
    <h1>Login</h1>
    <form method="POST" onSubmit={loginSubmit}>
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" id="username"/>
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password"/>
        <button type="submit">Login</button>
    </form>
</div>
  );
}
