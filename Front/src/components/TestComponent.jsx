import React, { useEffect } from 'react';
import logger from '../utils/logger';

const TestComponent = () => {
  useEffect(() => {
    logger.log("🟢 Компонент смонтирован");

    return () => {
      logger.log("🔴 Компонент размонтирован");
    };
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#222', color: '#fff' }}>
      <strong>Я тестовый компонент!</strong>
    </div>
  );
};

export default TestComponent;
