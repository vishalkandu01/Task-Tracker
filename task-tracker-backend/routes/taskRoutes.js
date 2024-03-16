const router = require('express').Router();
const taskController = require('../controllers/taskControllers')

router.get("/task-tracker", taskController.getTask);
router.post("/task-tracker", taskController.postTask);
router.put("/task-tracker/:id", taskController.updateTask);
router.delete("/task-tracker/:id", taskController.deleteTask);

module.exports = router