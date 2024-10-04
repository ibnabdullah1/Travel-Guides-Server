import mongoose from 'mongoose';
import { z } from 'zod';
import { POST_CATEGORY, POST_STATUS } from './post.content';

export const PostValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    subTitle: z.string({
      required_error: 'SubTitle is required',
    }),
    content: z.string().min(1, { message: 'Content is required' }),

    authorId: z
      .string({
        required_error: 'Author ID is required',
      })
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: 'Invalid Author ID',
      }),

    category: z.enum(Object.values(POST_CATEGORY) as [string, ...string[]], {
      errorMap: () => ({ message: 'Invalid category' }),
    }),

    premium: z.boolean().optional().default(false),
    image: z.string().optional(),
    likes: z
      .array(
        z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
          message: 'Invalid User ID for likes',
        })
      )
      .optional(),

    dislikes: z
      .array(
        z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
          message: 'Invalid User ID for dislikes',
        })
      )
      .optional(),
    date: z.string(),
    comments: z
      .array(
        z.object({
          content: z
            .string()
            .min(1, { message: 'Comment content is required' }),
          author: z
            .string()
            .refine((val) => mongoose.Types.ObjectId.isValid(val), {
              message: 'Invalid Author ID for comment',
            }),
          isDeleted: z.boolean().default(false),
          date: z.string(),
          postId: z
            .string()
            .refine((val) => mongoose.Types.ObjectId.isValid(val), {
              message: 'Invalid Post ID for comment',
            }),
          createdAt: z.date().optional(),
          updatedAt: z.date().optional(),
        })
      )
      .optional(),

    status: z
      .enum(Object.values(POST_STATUS) as [string, ...string[]], {
        errorMap: () => ({ message: 'Invalid post status' }),
      })
      .optional(),

    isDeleted: z.boolean().default(false),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }),
});

export const UpdatePostValidationSchema = z.object({
  body: z
    .object({
      title: z.string().optional(),
      subTitle: z.string().optional(),

      content: z.string().optional(),

      image: z.string().optional(),
      date: z.string().optional(),
      authorId: z
        .string()
        .refine((val) => mongoose.Types.ObjectId.isValid(val), {
          message: 'Invalid Author ID',
        })
        .optional(),

      category: z
        .enum(Object.values(POST_CATEGORY) as [string, ...string[]])
        .optional(),

      premium: z.boolean().optional(),

      likes: z
        .array(
          z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
            message: 'Invalid User ID for likes',
          })
        )
        .optional(),

      dislikes: z
        .array(
          z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
            message: 'Invalid User ID for dislikes',
          })
        )
        .optional(),

      comments: z
        .array(
          z.object({
            content: z
              .string()
              .min(1, { message: 'Comment content is required' }),
            author: z
              .string()
              .refine((val) => mongoose.Types.ObjectId.isValid(val), {
                message: 'Invalid Author ID for comment',
              }),
            date: z.string().optional(),
            postId: z
              .string()
              .refine((val) => mongoose.Types.ObjectId.isValid(val), {
                message: 'Invalid Post ID for comment',
              }),
            createdAt: z.date().optional(),
            updatedAt: z.date().optional(),
          })
        )
        .optional(),

      status: z
        .enum(Object.values(POST_STATUS) as [string, ...string[]])
        .optional(),
      isDeleted: z.boolean().optional(),
      createdAt: z.date().optional(),
      updatedAt: z.date().optional(),
    })
    .partial(),
});
