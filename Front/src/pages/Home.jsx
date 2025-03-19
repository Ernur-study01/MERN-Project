import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TestComponent from '../components/TestComponent';
import logger from '../utils/logger';
import { Button, Layout, Typography } from 'antd';

const { Header, Content } = Layout;
const { Title } = Typography;

const Home = () => {
  const [showComponent, setShowComponent] = useState(true);
  const [loggingEnabled, setLoggingEnabled] = useState(true);
  const navigate = useNavigate();

  const toggleLogging = () => {
    if (loggingEnabled) {
      logger.disable();
    } else {
      logger.enable();
    }
    setLoggingEnabled(!loggingEnabled);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#111' }}>
      <Header style={{ backgroundColor: '#000', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title style={{ color: '#fff', margin: 0 }}>Логирование компонентов в React</Title>
        <Button type="primary" danger onClick={handleLogout}>
          Выйти
        </Button>
      </Header>
      <Content style={{ padding: '20px', textAlign: 'center' }}>
        <Button onClick={() => setShowComponent(!showComponent)} style={{ marginRight: '10px' }}>
          {showComponent ? "Скрыть компонент" : "Показать компонент"}
        </Button>
        <Button onClick={toggleLogging}>
          {loggingEnabled ? "Отключить логирование" : "Включить логирование"}
        </Button>
        {showComponent && <TestComponent />}
      </Content>
    </Layout>
  );
};

export default Home;
