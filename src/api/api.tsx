import GetDatabase from "./connection";
import { Asset, Employee, Software, AssetUpdate } from "../types/types"



export async function InsertAsset(asset: Asset) {
  const db = await GetDatabase();
  const insert = await db.execute(
    `INSERT INTO Assets (systemname, model, memory, type, ip, date_added, purchase_date, note, employees_id) VALUES ('${asset.systemname}', '${asset.model}', '${asset.memory}', '${asset.type}', '${asset.ip}', '${asset.date_added}', '${asset.purchase_date}', '${asset.note}', '${asset.employees_id}')`
  );
  console.log(insert);
  return insert;
}

export async function GetAsset() {
  const db = await GetDatabase();
  const select = await db.select(
    "SELECT a.*, e.name FROM Assets a INNER JOIN Employees e ON a.employees_id = e.id"
  ) as {id: number, systemname: string, model: string, memory: number, type: string, ip: string, note: string, date_added: string, purchase_date: string, employees_id: number, software_id: number, name: string}[];
  console.log(select);
  return select;
}

export async function GetAssetById(id: number) {
  const db = await GetDatabase();
  const select = await db.select(
    "SELECT a.*, e.name FROM Assets a INNER JOIN Employees e ON a.employees_id = e.id WHERE a.id = ?", [id]
  ) as {id: number, systemname: string, model: string, memory: number, type: string, ip: string, note: string, date_added: string, purchase_date: string, employees_id: number, software_id: number, name: string}[];
  console.log(select);
  return select[0]; // Return the first (and only) asset
}

export async function DeleteAsset(assetId: number) {
  const db = await GetDatabase();

  // Delete the software associated with the asset
  const removeSoftware = await db.execute(
    "DELETE FROM Software WHERE asset_id = ?", [assetId]
  );
  console.log(removeSoftware);

  // Delete the asset
  const removeAsset = await db.execute(
    "DELETE FROM Assets WHERE id = ?", [assetId]
  );
  console.log(removeAsset);

}

export async function EditAsset(asset: AssetUpdate) {
  console.log("asset in api: " , asset);
  const db = await GetDatabase();
  const update = await db.execute(
    `UPDATE Assets SET systemname = ?, model = ?, memory = ?, type = ?, ip = ?, note = ?, employees_id = ? WHERE id = ?`,
    [asset.systemname, asset.model, asset.memory, asset.type, asset.ip, asset.note, asset.employees_id, asset.id]
  );
  console.log(update);
  return update;
}

export async function GetSoftware() {
  const db = await GetDatabase();
  const select = await db.select(
    "SELECT s.*, a.systemname FROM Software s INNER JOIN Assets a ON s.asset_id = a.id"
  ) as {id: number, os_name: string, kernel: string, date_added: string, asset_id: number, systemname: string}[];

  return select;
}

// insert software
export async function InsertSoftware(software: Software) {
  const db = await GetDatabase();
  const insert = await db.execute(
    `INSERT INTO Software (os_name, kernel, date_added, asset_id) VALUES ('${software.os_name}', '${software.kernel}', '${software.date_added}', '${software.asset_id}')`
  );
  console.log(insert);
}

export async function GetEmployee(user: string) {

  try {
    const db = await GetDatabase();
    const select = await db.select(
  "SELECT * FROM Employees "
    ) as {id: number, name: string, email: string, password: string, deparment_id: number }[];
    console.log("api.tsx: "+ select);
    return select;
  } catch (error) {
    console.log(error);
  }
}
    

  export async function GetEmployees() {

    try {
      const db = await GetDatabase();
      const select = await db.select(
    "SELECT * FROM Employees "
      ) as {id: number, name: string, email: string, password: string, deparment_id: number }[];
      console.log("api.tsx: "+ select);
      return select;
    } catch (error) {
      console.log(error);
    }
   
      
  }
