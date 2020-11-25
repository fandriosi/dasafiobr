import {  Router } from 'express';
import UsersControllers from './controllers/UsersController';
import UserController from './controllers/UsersController'
import TasksController from './controllers/TasksController';
const routers = Router();

routers.post('/users', UsersControllers.create)
routers.get('/users/:id', UsersControllers.show)
routers.put('/users/:id', UsersControllers.udpate)
routers.delete('/users/:id', UsersControllers.delete)
routers.get('/users', UsersControllers.index);

routers.get('/findByAsc', TasksController.findByAsc);
routers.get('/findByDesc', TasksController.findByDesc);
routers.post('/tasks', TasksController.create)
routers.get('/tasks/:id', TasksController.show)
routers.put('/tasks/:id', TasksController.udpate)
routers.delete('/tasks/:id', TasksController.delete)
routers.get('/tasks', TasksController.index);

export default routers;













