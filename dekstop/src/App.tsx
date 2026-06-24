// src/ - это React код
// src-tauri/ - Rust код Tauri приложение
// src-rauri/Cargo.toml - rust-зависимости
// src-tauri/tauri.conf.json - конфигурация tauri приложения
// src-tauri/src/lib.rc - основная логика rust приложения 
// src-tauri/src/main.rs - точка входа.

import { useState } from "react";  // Импортируем useState чтобы хранить ответ от Rust команды
import {invoke} from "@tauri-apps/api/core";  // Чтобы вызывать rust команды внутри react
import "./App.css"; // Подключаемся к стилям главного компонента приложения 

function App(){  // Главный React-компонент приложения
  const [appStatus, setAppStatus] = useState("Статус ещё не запрошен");

  async function handlCheckStatusClick() { // Создаем асинхронный обработчик клика по кнопке статуса
    const status = await invoke<string>("get_app_status"); // Вызываем React команду get_app_status и ожидаем строковый ответ
    setAppStatus(status); // Сохраняем полученный от rust текст в состояние react 
  }

  const [appVersion, setAppVersion] = useState("Версия ещё не запрошенна");
  
  async function handleCheckversionClick() {
    const version = await invoke<string>("get_app_version");
    setAppVersion(version);
  }
  return(
      <main className="app"> {/* Главный контейнер приложения */}
        <section className="wellcome-card">
          <p className="eyebrow"> Tauri 2 + React + Rust</p>
          <h1>TeamFlow Desktop</h1>
          <p className="description">Описание</p>

          <div className="status-box">
            <p>{appStatus}</p>
            <button onClick={handlCheckStatusClick}>
              Проверить связь с Rust
            </button>
            <p>{appVersion}</p>
            <button onClick={handleCheckversionClick}>
              Проверить версию Rust
            </button>
          </div>

          <div className="module-grid"> {/* Сетка модулей приложения */}
            <article className="module-card">
              <h2>KanBan</h2>
              <p>Задачи, колонки, drag-and-drop</p>
            </article>

            <article className="module-card">
              <h2>Document</h2>
              <p>Редактор документов в стиле блоков</p>
            </article>

            <article className="module-card">
              <h2>Messenger</h2>
              <p>Командный чат с real-time обновление через Web-Socket</p>
            </article>
          </div>
        </section>
      </main>
  );
}


export default App;