import { Hono } from 'hono'
import PostController from '../controller/Post.controller.js';

const postsRoutes = new Hono();
const postController = new PostController();
postsRoutes.get('/', async (c) => {
  const posts = postController.getAllPosts();
  return c.json({
    posts,
    message: 'Posts fetched successfully'
  }, 200);
})

export default postsRoutes;