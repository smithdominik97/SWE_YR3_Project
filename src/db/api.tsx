import GetDatabase from "./connection";



interface Asset {
  systemname: string;
  model: string;
  manufacturer: string;
  type: string;
  ip: string;
  purchasedate: string;
  note: string;
}

export async function InsertAsset(asset: Asset) {
  const db = await GetDatabase();
  const insert = await db.execute(
    `INSERT INTO assets (systemname, model, manufacturer, type, ip, purchasedate, note) VALUES ('${asset.systemname}', '${asset.model}', '${asset.manufacturer}', '${asset.type}', '${asset.ip}', '${asset.purchasedate}', '${asset.note}')`
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

