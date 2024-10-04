import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { PostSearchableFields } from './post.content';
import { TComment, TPost } from './post.interface';
import { Post } from './post.model';

const createPostIntoDB = async (payload: TPost, image: any) => {
  if (image) {
    const { postImage } = image;
    const imageName = payload.title.toUpperCase();
    const path = postImage[0].path;
    // send image to cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    payload.image = secure_url as string;
  }
  const result = await Post.create(payload);

  return result;
};

const getAllPostFromDB = async (query: Record<string, unknown>) => {
  const postQuery = new QueryBuilder(Post.find().populate('authorId'), query)
    .search(PostSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await postQuery.modelQuery;

  return result;
};

const getSinglePostInDB = async (id: string) => {
  const result = await Post.findById({ _id: id })
    .populate('authorId')
    .populate('comments.author');

  return result;
};
const updateSinglePostInDB = async (itemId: string, payload: TPost) => {
  const result = await Post.findByIdAndUpdate(itemId, payload, { new: true });
  // if (result) {
  //   await addDocumentToIndex(result, 'items');
  // } else {
  //   throw new Error(`Item with ID ${itemId} not found.`);
  // }
  return result;
};

const addCommentToPost = async (id: string, commentData: TComment) => {
  const updateDoc = {
    $push: { comments: commentData },
  };

  const result = await Post.findByIdAndUpdate(id, updateDoc, { new: true });
  return result;
};

const deleteCommentToPost = async (postId: string, commentId: string) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found');
  }

  // Filter comments by comparing ObjectId strings
  const currentComments = post.comments.filter(
    (comment) => comment._id.toString() !== commentId
  );

  const updatedPost = await Post.findOneAndUpdate(
    { _id: postId },
    { $set: { comments: currentComments } },
    { new: true }
  );

  return updatedPost;
};

const updateCommentToPost = async (
  postId: string,
  commentId: string,
  content: string
) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found');
  }
  const updatedComments = post.comments.map((comment) => {
    if (comment._id.toString() === commentId) {
      return { ...comment, content: content };
    }
    return comment;
  });
  post.comments = updatedComments;
  await post.save();

  return post;
};

const addReactionToPost = async (postId: string, payload: any) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found');
  }

  if (payload.action === 'like') {
    const isLike = post?.likes?.find(
      (like: any) => like.toString() === payload.userId
    );

    if (isLike) {
      post.likes = post?.likes?.filter(
        (like: any) => like.toString() !== payload.userId
      );
    } else {
      post.likes.push(payload.userId);

      post.dislikes = post.dislikes.filter(
        (dislike: any) => dislike.toString() !== payload.userId
      );
    }
  }

  if (payload.action === 'disLike') {
    const isDislike = post?.dislikes?.find(
      (dislike: any) => dislike.toString() === payload.userId
    );

    if (isDislike) {
      post.dislikes = post?.dislikes?.filter(
        (dislike: any) => dislike.toString() !== payload.userId
      );
    } else {
      post?.dislikes?.push(payload.userId);
      post.likes = post?.likes?.filter(
        (like: any) => like.toString() !== payload.userId
      );
    }
  }

  // Save the updated post document
  await post.save();
  return post;
};

export const PostServices = {
  addCommentToPost,
  createPostIntoDB,
  getAllPostFromDB,
  getSinglePostInDB,
  updateSinglePostInDB,
  deleteCommentToPost,
  updateCommentToPost,
  addReactionToPost,
};
