import { useState } from "react";
import TestComponent from "../components/TestComponent";
import logger from "../utils/logger";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [showComponent, setShowComponent] = useState(true);
  const [isLoggingActive, setIsLoggingActive] = useState(logger.isEnabled());
  const navigate = useNavigate();

  const toggleLogging = () => {
    if (isLoggingActive) {
      logger.disable();
    } else {
      logger.enable();
    }
    setIsLoggingActive(!isLoggingActive);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Логирование компонентов в React</h1>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setShowComponent(!showComponent)}
          className="px-4 py-2 bg-black text-white rounded"
        >
          {showComponent ? "Скрыть компонент" : "Показать компонент"}
        </button>

        <button
          onClick={toggleLogging}
          className="px-4 py-2 bg-black text-white rounded"
        >
          {isLoggingActive ? "Отключить логирование" : "Включить логирование"}
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("token"); // Удаляем токен
            navigate("/login"); // Перенаправляем на страницу входа
          }}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Выйти
        </button>
      </div>

      {showComponent && <TestComponent />}
    </div>
  );
};

export default Home;
