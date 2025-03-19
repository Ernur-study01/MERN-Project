import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Typography } from 'antd';

const { Title } = Typography;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.token) {
      localStorage.setItem('token', data.token);
      navigate('/home');
    } else {
      setError(data.error);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#111', color: '#fff' }}>
      <Title level={2} style={{ color: '#fff' }}>Войти в аккаунт</Title>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <Input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: '300px', marginBottom: '10px' }}
        />
        <Input.Password
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '300px', marginBottom: '10px' }}
        />
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
      </form>
      <p>Нет аккаунта? <Button type="link" onClick={() => navigate('/register')}>Зарегистрироваться</Button></p>
    </div>
  );
};

export default Login;
