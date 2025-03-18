import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Импортируем роутинг

// Импортируем страницы
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home'; // Страница главная

function App() {
  return (
    // Оборачиваем все маршруты в компонент Router, чтобы роутинг работал
    <Router>
      <div className="App">
        {/* Определяем все маршруты внутри компонента Routes */}
        <Routes>
          {/* Главная страница */}
          <Route path="/" element={<Home />} />

          {/* Страница регистрации */}
          <Route path="/register" element={<Register />} />

          {/* Страница логина */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
