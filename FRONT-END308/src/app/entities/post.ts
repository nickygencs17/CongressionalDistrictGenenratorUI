import { Comment } from './comment';

export class Post {
  id: number;
  title: string;
  image: string;
  description: string;
  date: string;
  author: string;
  likes: number;
  comments: Comment[];
}
