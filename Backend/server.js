require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes'); // Подключаем маршруты аутентификации

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';

// 📌 Подключаемся к MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ Подключено к MongoDB');
}).catch(err => {
    console.error('❌ Ошибка подключения к MongoDB:', err);
    process.exit(1);
});

// 📌 Проверяем наличие переменных окружения
if (!process.env.JWT_SECRET) {
    console.error("⚠️  ВНИМАНИЕ: Отсутствует JWT_SECRET в .env файле");
    process.exit(1);
}

// 📌 Middleware
app.use(cors());
app.use(express.json()); // Позволяет серверу парсить JSON

// 📌 Простая проверка работы сервера
app.get('/', (req, res) => {
    res.send('🚀 Сервер работает!');
});

// 📌 Асинхронное чтение файла (демонстрация неблокирующей операции)
app.get('/readfile', (req, res) => {
    fs.readFile('sample.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Ошибка чтения файла:', err);
            return res.status(500).json({ error: 'Ошибка при чтении файла' });
        }
        res.json({ content: data });
    });
});

// 📌 Подключаем маршруты
app.use('/auth', authRoutes);

// 📌 Middleware для обработки ошибок
app.use((err, req, res, next) => {
    console.error('❌ Ошибка:', err.stack);
    res.status(500).json({ error: 'Что-то пошло не так!' });
});

// 📌 Запуск сервера
app.listen(PORT, () => {
    console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});
