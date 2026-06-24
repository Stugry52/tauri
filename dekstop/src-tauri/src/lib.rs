#[tauri::command] // Помечаем функцию как команду Tauri
fn get_app_status() -> String{
    "TeamFlow работает успешо на Tauri 2".to_string()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)] // Специальная точка входа для мобильных сборок
pub fn run(){
    tauri::Builder::default() // Создаем стандартный сборщик tauri приложения
    .invoke_handler(tauri::generate_handler![get_app_status]) // Регистрируем команду get_app_status чтобы ее можно было вызвать через React
    .invoke_handler(tauri::generate_handler![get_app_status, get_app_version])
    .run(tauri::generate_context!()) // Запуск таури приложения с конфигом из проекта
    .expect("Ошибка во время запуска приложения"); // Если запуск не удался выводим сообщение
}

#[tauri::command]
fn get_app_version() -> String{
    "0.1.0".to_string()
}


