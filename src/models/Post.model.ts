import path from "path";
import fs from "fs";
import type { PostsType } from "../interfaces/types.js";

class PostModel {
  private filePath: string;
  constructor() {
    this.filePath = path.join('./data/posts.json');
  }

  public getAllPosts(): PostsType[] {
    const data = fs.readFileSync(this.filePath, 'utf-8')
    return JSON.parse(data);
  }
}

export default PostModel;