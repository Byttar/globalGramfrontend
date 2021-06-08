import axios from "axios";
import { IPost } from "../interfaces/post";
import { IResponse } from "../interfaces/response";

class PostService {
  public async getPosts(page = 0) {
    const result = await axios.get<IResponse<IPost[], { lastpage: boolean }>>(
      "/post",
      { params: { page } }
    );
    return result;
  }

  public async savePost(data: FormData) {
    const result = await axios.post("/post", data);
    return result;
  }

  public async updatePost(data: FormData, id: string) {
    const result = await axios.put("/post/" + id, data);
    return result;
  }

  public async deletePost(id: string) {
    const result = await axios.delete("/post/" + id);
    return result;
  }
}

export default new PostService();
