import Database from "tauri-plugin-sql-api";




export default async function GetDatabase() {
  

  const db = await Database.load(
    "mysql://sql2207064:factor%20locks%20devon%20cars@lochnagar.abertay.ac.uk/sql2207064"
  );

  if (!db.execute) {
    console.log("Failed to connect to database");
    throw new Error("Failed to connect to database");
  }
  console.log("Connected to database");

  // const select = await db.select(
  //   "SELECT * FROM employee"
  // ) as { eno: number, ename: string, edepartment: string, ejob: string, ephone: string, eroom: string, eemail: string }[];

  // for (const row of select) {
  //   console.log(row);
  // }

  return db;
}

// export default async function returnDatabase(){
//   const result = await getDatabase();
//   console.log(result);
// }
