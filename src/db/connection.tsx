import Database from "tauri-plugin-sql-api";




export default async function GetDatabase() {
  

  const db = await Database.load(
    //enter mysql database credentials here ("mysql://username:password@servername/database")
    ""
  );

  if (!db.execute) {
    console.log("Failed to connect to database");
    throw new Error("Falled to connect to database");
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
