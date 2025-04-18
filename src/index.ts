import { Hono, type ExecutionContext } from 'hono';
import { logger } from 'hono/logger';
import usersRoutes from './routes/Users.route.js';
import postsRoutes from './routes/Post.Route.js';

export interface Env {
	DATABASE_URL: string;
}

const app = new Hono();

app.use('*', logger());

app.get('/', (c) => {
  return c.json({
    message: 'Welcome to the API',
    env: c.env,
  });
});

app.route('/users', usersRoutes);
app.route('/posts', postsRoutes);

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		return app.fetch(request, env, ctx);
	},
};

