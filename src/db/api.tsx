import GetDatabase from "./connection";

export async function InsertAsset() {
    const db = await GetDatabase();
    const insert = await db.execute(
        "INSERT INTO assets (systemname, model, manufacturer, type, ip, purchasedate, note) VALUES ('test', 'test', 'test', 'test', 'test', 'test', 'test')"
    );
    console.log(insert);
}

export async function GetAsset() {
    const db = await GetDatabase();
      const select = await db.select(
    "SELECT * FROM assets"
  ) as {uid: number, systemname: string, model: string, manufacturer: string, type: string, ip: string, purchasedate: string, note: string }[];


  return select

}

