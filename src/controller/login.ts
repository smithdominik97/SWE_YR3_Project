// import * as bcrypt from "bcrypt";
import { GetUser } from '@/api/api';
import { Employee, Login } from '@/types/types';




export async function HandleLogin (login: Login) {
    // compare login data with database using bcrypt compare
    const  password  = login.password
    const user = login.username
    console.log("input password: ", password);


    const users: any = await GetUser(user);
    console.log(users[0].password);

    console.log("login.ts: ", users)  ;


        // console.log(user.password)   
        // const match = bcrypt.compareSync(password, user.password);

        
        // console.log(match);
        if (users[0].password === password) {
            console.log("login success");
            return true;
            
        } 
            console.log("login failed");
            return false;
    }

