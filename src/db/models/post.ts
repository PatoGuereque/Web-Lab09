import { model, Schema } from 'mongoose';

export interface Post {
  title: string;
  author: string;
  post_date: Date;
  post_data: string;
}

const postSchema = new Schema<Post>({
  title: String,
  author: String,
  post_date: Date,
  post_data: String,
});

const PostModel = model<Post>('Posts', postSchema);

export default PostModel;
