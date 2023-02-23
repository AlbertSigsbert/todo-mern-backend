const express = require("express");
const router = express.Router();
const {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo
} = require("../controllers/todoController");

const requireAuth = require('../middleware/requireAuth');

//Require Authentication for all todo routes
router.use(requireAuth);

//GET all todos
router.get("/", getTodos);

//GET single todo
router.get("/:id", getTodo);

//POST a new todo
router.post("/", createTodo);

//DELETE a single todo
router.delete("/:id", deleteTodo);

//UPDATE a single todo
router.patch("/:id", updateTodo);

module.exports = router;
