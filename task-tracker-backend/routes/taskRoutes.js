const router = require('express').Router();
const taskController = require('../controllers/taskControllers')

router.get("/getTodoList", taskController.getTask);
router.post("/addTodoList", taskController.postTask);
router.post("/updateTodoList/:id", taskController.updateTask);
router.delete("/deleteTodoList/:id", taskController.deleteTask);

module.exports = router