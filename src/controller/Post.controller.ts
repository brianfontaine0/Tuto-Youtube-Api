import PostModel from "../models/Post.model.js";

class PostController {
  private postModel: PostModel;

  constructor() {
    this.postModel = new PostModel();
  }

  public getAllPosts() {
    const data = this.postModel.getAllPosts();
    return data;
  }
}

export default PostController;