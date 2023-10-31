import getDatabase from "./connection";

export async function insertAsset() {
    const db = await getDatabase();
    const insert = await db.execute(
        "INSERT INTO assets (systemname, model, manufacturer, type, ip, purchasedate, note) VALUES ('test', 'test', 'test', 'test', 'test', 'test', 'test')"
    );
    console.log(insert);
}

export async function getAsset() {
    const db = await getDatabase();
      const select = await db.select(
    "SELECT * FROM assets"
  ) as {uid: number, systemname: string, model: string, manufacturer: string, type: string, ip: string, purchasedate: string, note: string }[];

  for (const row of select) {
    console.log(row);
  }

}