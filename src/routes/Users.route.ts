import { Hono } from 'hono'
import UserController from '../controller/User.controller.js';
const usersRoutes = new Hono();
const usersController = new UserController(); 

usersRoutes.get('/', async (c) => {
  const users = usersController.getAllUsers();
  return c.json({
    users,
    message: 'Users fetched successfully'
  }, 200);
})
.get('/:id', async (c) => {
  const id = c.req.param('id');
  const data = usersController.getUserById(id);

  if (data.status === 404) {
    return c.json({
      message: data.message
    }, 404);
  }

  return c.json({
    user: data.user,
    message: data.message
  }, 200);

})

export default usersRoutes;