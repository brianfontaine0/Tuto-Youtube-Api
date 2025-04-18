import { Hono } from 'hono';
import type { Context } from 'hono';
import PostController from '../controller/Post.controller.js';

const postsRoutes = new Hono();
let postController: PostController;
// Middleware pour initialiser le PostController
postsRoutes.use('*', async (c, next) => {
  const env = c.env as { DATABASE_URL: string };
  postController = new PostController(env);
  await next();
});

postsRoutes.get('/', async (c) => {
  const posts = await postController.getAllPosts();
  return c.json({
    posts,
    message: 'Posts fetched successfully',
  }, 200);
});

postsRoutes.get('/:id', async (c) => {
  const id = c.req.param('id');
  const post = await postController.getPostById(id);

  if (!post) {
    return c.json({
      message: 'Post not found',
    }, 404);
  }

  return c.json({
    post,
    message: 'Post fetched successfully',
  }, 200);
});

export default postsRoutes;