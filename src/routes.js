import { Router } from 'express';

import UserController from '@controllers/UserController';

const route = Router();

route.post('/users', UserController.create);
route.get('/users', UserController.getAll);
route.get('/users/:id', UserController.getById);
route.delete('/users/:id', UserController.remove);
route.put('/users/:id', UserController.update);

export default route;
