import log from 'loglevel';

let isLoggingEnabled = true; // Логирование включено по умолчанию

// Устанавливаем уровень логирования (info)
log.setLevel('info');

const logger = {
  log: (...args) => {
    if (isLoggingEnabled) {
      log.info(...args);
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
