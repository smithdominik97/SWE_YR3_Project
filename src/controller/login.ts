import bcrypt from "bcryptjs";
import { GetUser } from '@/api/api';
import { Login } from '@/types/types';



async function comparePassword (password: string, hashedPassword: string) {
    const success = await bcrypt.compare(password, hashedPassword)
    return success;
}

export async function HandleLogin (login: Login) {
    // compare login data with database using bcrypt compare
    const  password  = login.password
    const user = login.username
    
    

    const users: any = await GetUser(user);

    if (users.length == 0) {
        console.log("wrong username");
        return false;
    } else {

        const passwordMatch = await comparePassword(password, users[0].password);

        if (passwordMatch) {
            console.log("login success");
            return true;
            
        } 
        return false;
    }

       
            
    }

