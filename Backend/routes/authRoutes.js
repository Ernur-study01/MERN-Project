const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();

// Пример базы пользователей (обычно это база данных)
const users = {};

// Регистрация пользователя
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: 'Введите имя пользователя и пароль' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    users[username] = hashedPassword;
    res.json({ message: 'Пользователь зарегистрирован!', username });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка регистрации' });
  }
});

// Логин пользователя
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const storedPassword = users[username]; // Получаем сохраненный пароль

    if (!storedPassword) {
      return res.status(400).json({ error: 'Пользователь не найден' });
    }

    const isMatch = await bcrypt.compare(password, storedPassword);
    if (!isMatch) {
      return res.status(400).json({ error: 'Неверный пароль' });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ message: 'Успешный вход!', token });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка входа' });
  }
});

// Middleware для проверки JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ error: 'Требуется токен' });

  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Неверный токен' });
    req.user = decoded;
    next();
  });
};

// Защищенный маршрут
router.get('/profile', verifyToken, (req, res) => {
  res.json({ message: `Привет, ${req.user.username}! Это твой профиль.` });
});

module.exports = router;
