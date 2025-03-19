let isLoggingEnabled = true; // Включено логирование по умолчанию

const logger = {
  log: (...args) => {
    if (isLoggingEnabled) {
      console.log(...args);
    }
  },
  enable: () => {
    isLoggingEnabled = true;
    console.log("✅ Логирование включено");
  },
  disable: () => {
    isLoggingEnabled = false;
    console.log("❌ Логирование отключено");
  },
  isEnabled: () => isLoggingEnabled
};

export default logger;
