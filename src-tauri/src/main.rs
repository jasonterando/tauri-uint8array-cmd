// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tracing::Level;

fn main() {
    tracing_subscriber::fmt()
        .with_max_level(Level::TRACE)
        .with_file(true)
        .with_line_number(true)
        .init();

    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![convert])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[derive(serde::Deserialize)]
pub struct Test {
    name: String,
    data: Vec<u8>
}

#[tauri::command]
fn convert(value: Test) -> String {
    format!("{} is {} byte(s) long", &value.name, value.data.len())
}