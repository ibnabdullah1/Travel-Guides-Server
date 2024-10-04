import { Types } from 'mongoose';
import { POST_CATEGORY, POST_STATUS } from './post.content';

export interface TPost {
  title: string;
  subTitle: string;
  content: string;
  image: string;
  authorId: Types.ObjectId;
  category: keyof typeof POST_CATEGORY;
  premium: boolean;
  date: string;
  likes: Types.ObjectId[];
  dislikes: Types.ObjectId[];
  status: keyof typeof POST_STATUS;
  comments: TComment[];
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
}

export interface TComment {
  _id: Types.ObjectId;
  date: string;
  content: string;
  author: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
