import Database from "tauri-plugin-sql-api";

async function getDatabase() {
  const db = await Database.load(
    "mysql://sql2207064:factor locks devon cars@lochnagar.abertay.ac.uk/sql2207064"
  );

  if (!db.execute) {
    throw new Error("Falled to connect to database");
  }
  return "Connected";
}

export default async function returnDatabase() {
  const result = await getDatabase();
  return result;
}
