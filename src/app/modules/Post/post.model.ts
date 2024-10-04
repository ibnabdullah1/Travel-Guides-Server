import mongoose, { Schema } from 'mongoose';
import { POST_CATEGORY, POST_STATUS } from './post.content';
import { TComment, TPost } from './post.interface';

const CommentSchema = new Schema<TComment>({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const postSchema = new Schema<TPost>({
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  date: { type: String, required: true },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    enum: Object.values(POST_CATEGORY),
    required: true,
  },
  premium: {
    type: Boolean,
    default: false,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  dislikes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  isDeleted: { type: Boolean, default: false },
  comments: { type: [CommentSchema], default: [] },
  status: {
    type: String,
    enum: [POST_STATUS.FREE, POST_STATUS.PREMIUM],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Post = mongoose.model('Post', postSchema);
