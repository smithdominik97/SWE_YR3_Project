import Database from "tauri-plugin-sql-api";




export async function getDatabase() {
  const db = await Database.load(
    "mysql://sql2207064:factor%20locks%20devon%20cars@lochnagar.abertay.ac.uk/sql2207064"
  );

  if (!db.execute) {
    console.log("Failed to connect to database");
    throw new Error("Falled to connect to database");
  }
  console.log("Connected to database");



  return "Connected";
}

export default async function returnDatabase(){
  const result = await getDatabase();
  console.log(result);
}
