export type Asset = {
    systemname: string;
    model: string;
    manufacturer: string;
    type: string;
    ip: string;
    purchasedate: string;
    note: string;
    employees_id: string;
  }
  
  export type Employee = {
      id: number;
      firstname: string;
      lastname: string;
      password: string;
      email: string;
      department_id: number;
  }
  

  export type Login = {
    username: string;
    password: string;
  }