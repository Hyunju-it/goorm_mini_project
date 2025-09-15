const Todo = require('../models/Todo');

// 모든 TODO 가져오기
const getAllTodos = async (req, res) => {
  try {
    const {
      completed,
      priority,
      category,
      search,
      sortBy = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 10
    } = req.query;

    const filter = {};

    // 필터 조건 설정
    if (completed !== undefined) {
      filter.completed = completed === 'true';
    }

    if (priority) {
      filter.priority = priority;
    }

    if (category) {
      filter.category = new RegExp(category, 'i');
    }

    if (search) {
      filter.$text = { $search: search };
    }

    const sortOrder = order === 'desc' ? -1 : 1;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const todos = await Todo.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Todo.countDocuments(filter);

    res.json({
      todos,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'TODO 목록을 가져오는데 실패했습니다.', error: error.message });
  }
};

// 특정 TODO 가져오기
const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'TODO를 찾을 수 없습니다.' });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'TODO를 가져오는데 실패했습니다.', error: error.message });
  }
};

// 새 TODO 생성
const createTodo = async (req, res) => {
  try {
    const todoData = req.body;

    // 유효성 검사
    if (!todoData.title) {
      return res.status(400).json({ message: '제목은 필수입니다.' });
    }

    const todo = new Todo(todoData);
    const savedTodo = await todo.save();

    res.status(201).json(savedTodo);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: '유효하지 않은 데이터입니다.',
        errors: Object.values(error.errors).map(e => e.message)
      });
    }
    res.status(500).json({ message: 'TODO 생성에 실패했습니다.', error: error.message });
  }
};

// TODO 수정
const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(404).json({ message: 'TODO를 찾을 수 없습니다.' });
    }

    res.json(todo);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: '유효하지 않은 데이터입니다.',
        errors: Object.values(error.errors).map(e => e.message)
      });
    }
    res.status(500).json({ message: 'TODO 수정에 실패했습니다.', error: error.message });
  }
};

// TODO 삭제
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'TODO를 찾을 수 없습니다.' });
    }

    res.json({ message: 'TODO가 성공적으로 삭제되었습니다.', deletedTodo: todo });
  } catch (error) {
    res.status(500).json({ message: 'TODO 삭제에 실패했습니다.', error: error.message });
  }
};

// TODO 완료 상태 토글
const toggleTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'TODO를 찾을 수 없습니다.' });
    }

    todo.completed = !todo.completed;
    todo.updatedAt = new Date();

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'TODO 상태 변경에 실패했습니다.', error: error.message });
  }
};

// 통계 정보 가져오기
const getTodoStats = async (req, res) => {
  try {
    const stats = await Todo.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          completed: { $sum: { $cond: ['$completed', 1, 0] } },
          pending: { $sum: { $cond: ['$completed', 0, 1] } },
          highPriority: { $sum: { $cond: [{ $eq: ['$priority', 'high'] }, 1, 0] } },
          mediumPriority: { $sum: { $cond: [{ $eq: ['$priority', 'medium'] }, 1, 0] } },
          lowPriority: { $sum: { $cond: [{ $eq: ['$priority', 'low'] }, 1, 0] } }
        }
      }
    ]);

    const result = stats[0] || {
      total: 0,
      completed: 0,
      pending: 0,
      highPriority: 0,
      mediumPriority: 0,
      lowPriority: 0
    };

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: '통계를 가져오는데 실패했습니다.', error: error.message });
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
  getTodoStats
};