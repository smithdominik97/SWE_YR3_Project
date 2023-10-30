import Database from "@tauri-apps/plugin-sql";
import { info } from "tauri-plugin-log-api";
import { attachConsole } from "tauri-plugin-log-api";

attachConsole(); // <-- this line here

// mysql
const db = await Database.load(
  "mysql://sql2207064:factor locks devon cars@lochnagar.abertay.ac.uk/sql2207064"
);
