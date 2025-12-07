const express=require('express');
const TaskRouter=express.Router();

const {createTask, getTask,runTaskController, deleteTask, updateTask}=require('../controllers/task.controller');
const isAuth = require('../middlewars/AuthMiddleware');


TaskRouter.post('/createtask',isAuth,createTask);
TaskRouter.get('/gettask',isAuth,getTask);
TaskRouter.post('/:id/run',isAuth,runTaskController);
TaskRouter.get('/:id',isAuth,deleteTask)
TaskRouter.put('/update/:id',isAuth,updateTask)
module.exports=TaskRouter;