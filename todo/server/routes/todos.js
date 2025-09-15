const express = require('express');
const router = express.Router();
const {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
  getTodoStats
} = require('../controllers/todoController');

// GET /api/todos - 모든 TODO 가져오기 (페이지네이션, 필터링, 검색 지원)
router.get('/', getAllTodos);

// GET /api/todos/stats - TODO 통계 정보
router.get('/stats', getTodoStats);

// GET /api/todos/:id - 특정 TODO 가져오기
router.get('/:id', getTodoById);

// POST /api/todos - 새 TODO 생성
router.post('/', createTodo);

// PUT /api/todos/:id - TODO 전체 수정
router.put('/:id', updateTodo);

// PATCH /api/todos/:id/toggle - TODO 완료 상태 토글
router.patch('/:id/toggle', toggleTodo);

// DELETE /api/todos/:id - TODO 삭제
router.delete('/:id', deleteTodo);

module.exports = router;