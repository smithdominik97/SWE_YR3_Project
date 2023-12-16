// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::net::IpAddr;

use local_ip_address::local_ip;


#[tauri::command]
fn getip() -> IpAddr{
  let my_local_ip = local_ip().unwrap();
  return my_local_ip;

    }
  



fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![getip])
    .plugin(tauri_plugin_system_info::init())
    .plugin(tauri_plugin_sql::Builder::default().build())
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
