const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todoapp';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB 연결
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB 연결 성공'))
  .catch((error) => console.error('MongoDB 연결 실패:', error));

// Routes
const todoRoutes = require('./routes/todos');
app.use('/api/todos', todoRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ message: 'TODO API 서버가 정상적으로 작동중입니다!' });
});

// 404 처리
app.use('*', (req, res) => {
  res.status(404).json({ message: '요청하신 리소스를 찾을 수 없습니다.' });
});

// 에러 핸들링
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({
    message: '서버 오류가 발생했습니다.',
    error: process.env.NODE_ENV === 'development' ? error.message : {}
  });
});

app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행중입니다.`);
});

module.exports = app;