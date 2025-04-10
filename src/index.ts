import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger';
import usersRoutes from './routes/Users.route.js';
import postsRoutes from './routes/Post.Route.js';

const app = new Hono()

app.use('*', logger())

app.route('/users', usersRoutes);
app.route('/posts', postsRoutes);

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
