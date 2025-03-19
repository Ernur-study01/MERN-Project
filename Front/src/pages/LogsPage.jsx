import React from "react";
import { Button, Typography } from "antd";
import logger from "../utils/logger";

const LogPage = () => {
  return (
    <div style={{ maxWidth: 500, margin: "50px auto", textAlign: "center" }}>
      <Typography.Title>Страница логирования</Typography.Title>
      <Button onClick={() => logger.enable()} type="primary" style={{ margin: 10 }}>
        Включить логирование
      </Button>
      <Button onClick={() => logger.disable()} danger>
        Выключить логирование
      </Button>
      <Typography.Paragraph>
        Текущее состояние: {logger.isEnabled() ? "✅ Включено" : "❌ Отключено"}
      </Typography.Paragraph>
    </div>
  );
};

export default LogPage;
