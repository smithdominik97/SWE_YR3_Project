import bcrypt from "bcrypt";
import { GetUser } from '@/api/api';
import { Employee, Login } from '@/types/types';




export function HandleLogin (login: Login) {
    // compare login data with database using bcrypt compare
    const  password  = login.password
    const user = login.username
    console.log(user, password);

    const users: any = GetUser(user);

    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        console.log(user)   
        const match = bcrypt.compareSync(password, user.password);
        console.log(match);
        if (match) {
            return true;
            console.log("login success");
        }
    }
}
