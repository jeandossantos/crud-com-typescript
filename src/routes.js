import { Router } from 'express';

import UserController from '@controllers/UserController';

const route = Router();

route.post('/users', UserController.create);

export default route;
