require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET || 'mysecretkey';

// Пути к файлам базы данных
const dbFilePath = path.join(__dirname, 'db.json');

// Функция для чтения данных из файла
const readDB = () => {
    if (!fs.existsSync(dbFilePath)) {
        fs.writeFileSync(dbFilePath, '[]', 'utf8');
    }
    const data = fs.readFileSync(dbFilePath, 'utf8');
    return JSON.parse(data);
};

// Функция для записи данных в файл
const writeDB = (data) => {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), 'utf8');
};

// Middleware
app.use(cors());
app.use(express.json());

// Проверка работы сервера
app.get('/', (req, res) => {
    res.send('🚀 Сервер работает!');
});

// Асинхронное чтение файла (демонстрация неблокирующей операции)
app.get('/readfile', (req, res) => {
    fs.readFile('sample.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Ошибка чтения файла:', err);
            return res.status(500).json({ error: 'Ошибка при чтении файла' });
        }
        res.json({ content: data });
    });
});

// ✅ Регистрация пользователя (с хешированием пароля)
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Введите имя пользователя и пароль' });
    }

    let users = readDB();
    const userExists = users.find(user => user.username === username);

    if (userExists) {
        return res.status(400).json({ error: 'Пользователь уже существует' });
    }

    // Хешируем пароль перед сохранением
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now(), username, password: hashedPassword };

    users.push(newUser);
    writeDB(users);

    res.json({ message: 'Пользователь зарегистрирован!', user: { id: newUser.id, username: newUser.username } });
});

// ✅ Логин пользователя (проверка пароля + выдача JWT-токена)
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    let users = readDB();
    const user = users.find(user => user.username === username);

    if (!user) {
        return res.status(400).json({ error: 'Неверное имя пользователя или пароль' });
    }

    // Проверяем пароль
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ error: 'Неверное имя пользователя или пароль' });
    }

    // Генерируем JWT-токен
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    // Сохраняем токен в пользователя
    user.token = token;
    writeDB(users);

    res.json({ message: 'Успешный вход!', token });
});

// ✅ Middleware для проверки токена
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: 'Токен отсутствует!' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Недействительный токен!' });
    }
};

// ✅ Получение списка пользователей (только для авторизованных, скрываем пароли)
app.get('/users', verifyToken, (req, res) => {
    const users = readDB().map(user => ({
        id: user.id,
        username: user.username
    }));
    res.json(users);
});

// ✅ Удаление пользователя (по ID, только авторизованный)
app.delete('/users/:id', verifyToken, (req, res) => {
    let users = readDB();
    const userId = parseInt(req.params.id);

    const filteredUsers = users.filter(user => user.id !== userId);

    if (filteredUsers.length === users.length) {
        return res.status(404).json({ error: 'Пользователь не найден' });
    }

    writeDB(filteredUsers);
    res.json({ message: 'Пользователь удалён' });
});

// ✅ Обновление данных пользователя (по ID, только авторизованный)
app.put('/users/:id', verifyToken, async (req, res) => {
    let users = readDB();
    const userId = parseInt(req.params.id);
    const { username, password } = req.body;

    let user = users.find(user => user.id === userId);
    if (!user) {
        return res.status(404).json({ error: 'Пользователь не найден' });
    }

    if (username) user.username = username;
    if (password) user.password = await bcrypt.hash(password, 10);

    writeDB(users);
    res.json({ message: 'Данные пользователя обновлены!', user: { id: user.id, username: user.username } });
});

// Middleware для обработки ошибок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Что-то пошло не так!' });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});