import GetDatabase from "./connection";



interface Asset {
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
    password: string;
    email: string;
    department_id: number;
}

export async function InsertAsset(asset: Asset) {
  const db = await GetDatabase();
  const insert = await db.execute(
    `INSERT INTO assets (systemname, model, manufacturer, type, ip, purchasedate, note, employees_id) VALUES ('${asset.systemname}', '${asset.model}', '${asset.manufacturer}', '${asset.type}', '${asset.ip}', '${asset.purchasedate}', '${asset.note}', '${asset.employees_id}')`
  );
  console.log(insert);
}

export async function GetAsset() {
    const db = await GetDatabase();
      const select = await db.select(
    "SELECT * FROM assets"
  ) as {uid: number, systemname: string, model: string, manufacturer: string, type: string, ip: string, purchasedate: string, note: string, employees_id: string }[];


  return select

}

export async function DeleteAsset() {
  const db = await GetDatabase();
    const remove = await db.execute(
  "DELETE FROM assets WHERE  "
) ;


console.log(remove);

}

export async function GetUser(user: string) {
  const db = await GetDatabase();
    const select = await db.select(
  "SELECT * FROM employees WHERE email = '" + user + "'"
    );

    console.log(select);
    return select;
    
}