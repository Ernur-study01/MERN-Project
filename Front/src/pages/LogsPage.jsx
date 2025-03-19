import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Layout, Table } from "antd";
import logger from "../utils/logger";

const { Header, Content } = Layout;

const LogsPage = () => {
  const [logData, setLogData] = useState([]);

  const addLog = (message) => {
    const newLog = { key: logData.length, message, timestamp: new Date().toLocaleTimeString() };
    setLogData((prevLogs) => [...prevLogs, newLog]);
    logger.log(message);
  };

  return (
    <Layout>
      <Header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ color: "white" }}>Логи</h1>
        <Link to="/">
          <Button type="primary">На главную</Button>
        </Link>
      </Header>
      <Content style={{ padding: "20px" }}>
        <Button onClick={() => addLog("Пользователь открыл страницу логов")}>Добавить лог</Button>
        <Table
          dataSource={logData}
          columns={[{ title: "Время", dataIndex: "timestamp", key: "timestamp" }, { title: "Сообщение", dataIndex: "message", key: "message" }]}
        />
      </Content>
    </Layout>
  );
};

export default LogsPage;
