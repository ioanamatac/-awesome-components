import { Post } from "src/app/social-media/models/post.model";

export class Comment {
    id!: number;
    userId!: number;
    comment!: string;
    createdDate!: string;
  }