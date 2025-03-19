import { useEffect } from "react";
import logger from "../utils/logger";

const TestComponent = () => {
  useEffect(() => {
    logger.log("🔵 Компонент смонтирован");

    return () => {
      logger.log("🔴 Компонент размонтирован");
    };
  }, []);

  return (
    <div className="p-4 bg-gray-800 text-white rounded-md">
      <strong>Я тестовый компонент!</strong>
    </div>
  );
};

export default TestComponent;
