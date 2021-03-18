import { Router } from 'express';

import UserController from '@controllers/UserController';

const route = Router();

route.post('/users', UserController.create);
route.get('/users', UserController.getAll);

export default route;
