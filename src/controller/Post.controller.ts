import PostModel from "../models/Post.model.js";

class PostController {
  private postModel: PostModel;

  constructor(env: { DATABASE_URL: string }) {
    this.postModel = new PostModel(env);
  }

  public async getAllPosts() {
    const data = await this.postModel.getAllPosts();
    return data;
  }

  public async getPostById(id: string){
    const data = await this.postModel.getPostById(id);
    return data;
  }
}

export default PostController;