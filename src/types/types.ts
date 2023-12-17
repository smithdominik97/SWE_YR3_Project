export type Asset = {
  systemname: string;
  model: string;
  memory: number
  type: string;
  ip: string;
  date_added: string;
  purchase_date: string;
  note: string;
  employees_id: number;
}

export type FormAsset = {
  id: number
  systemname: string;
  model: string;
  memory: number
  type: string;
  ip: string;
  date_added: string;
  purchase_date: string;
  note: string;
  employees_id: number;
  name: string;
}

export type AssetUpdate = {
  id: number;
  systemname: string;
  model: string;
  memory: number
  type: string;
  ip: string;
  note: string;
  employees_id: number;
}


export type Software = {
  os_name: string;
  kernel: string;
  date_added: string;
  asset_id: number;
}

export type FormSoftware = {
  os_name: string;
  kernel: string;
  date_added: string;
  asset_id: number;
  systemname: string;
}

  export type Employee = {
      id: number;
      name: string;
      password: string;
      email: string;
      department_id: number;
  }
  

  export type Login = {
    username: string;
    password: string;
  }