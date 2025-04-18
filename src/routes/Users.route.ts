import { Hono } from 'hono';
import UserController from '../controller/User.controller.js';


const usersRoutes = new Hono();

let userController: UserController;

usersRoutes.use('*', async (c, next) => {
  const env = c.env as { DATABASE_URL: string };
  userController = new UserController(env);
  await next();
});

usersRoutes.get('/', async (c) => {
  const users = await userController.getAllUsers();
  return c.json(users);
});

usersRoutes.get('/:id', async (c) => {
  const id = c.req.param('id');
  const user = await userController.getUserById(id);
  return c.json(user);
});

export default usersRoutes;