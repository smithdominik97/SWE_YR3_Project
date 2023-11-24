import bcrypt from "bcryptjs";
import { GetUser } from '@/api/api';
import { Login } from '@/types/types';



async function comparePassword (password: string, hashedPassword: string) {
    const success = await bcrypt.compare(password, hashedPassword)
    if (success) {
        console.log("password match");
        return true;
    }
    console.log("wrong password")
    return false;
}

export async function HandleLogin (login: Login) {
    // compare login data with database using bcrypt compare
    const  password  = login.password
    const user = login.username


    const users: any = await GetUser(user);


    const passwordMatch = await comparePassword(password, users[0].password);
        if (passwordMatch) {
            console.log("login success");
            return true;
            
        } 
            console.log("login failed");
            return false;
    }

