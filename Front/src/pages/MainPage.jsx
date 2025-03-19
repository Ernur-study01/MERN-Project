import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Layout, Switch } from "antd";
import logger from "../utils/logger";

const { Header, Content } = Layout;

const MainPage = () => {
  const [loggingEnabled, setLoggingEnabled] = useState(localStorage.getItem("logging") !== "false");
  const navigate = useNavigate();

  const toggleLogging = (checked) => {
    localStorage.setItem("logging", checked.toString());
    setLoggingEnabled(checked);
    window.location.reload();
  };

  const logout = () => {
    logger.log("Пользователь вышел из системы");
    alert("Выход из системы");
    navigate("/logs");
  };

  return (
    <Layout>
      <Header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ color: "white" }}>Главная страница</h1>
        <Button danger onClick={logout}>Выйти</Button>
      </Header>
      <Content style={{ padding: "20px" }}>
        <h2>Управление логированием</h2>
        <Switch checked={loggingEnabled} onChange={toggleLogging} /> Включить логирование
        <br /><br />
        <Link to="/logs">
          <Button type="primary">Перейти к логам</Button>
        </Link>
      </Content>
    </Layout>
  );
};

export default MainPage;
