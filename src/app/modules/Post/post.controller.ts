import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PostServices } from './post.service';

const createPost = catchAsync(async (req, res) => {
  if (!req.files) {
    throw new AppError(400, 'Please upload an image');
  }
  const post = await PostServices.createPostIntoDB(req.body, req.files as any);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post created successfully',
    data: post,
  });
});
const getAllPost = catchAsync(async (req, res) => {
  const result = await PostServices.getAllPostFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post Retrieved successfully',
    data: result,
  });
});

const getSinglePost = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await PostServices.getSinglePostInDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post Retrieved successfully',
    data: result,
  });
});
const updateSinglePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PostServices.updateSinglePostInDB(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post Update successfully',
    data: result,
  });
});
const deleteSinglePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PostServices.deleteSinglePostInDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post delete successfully',
    data: result,
  });
});
const addCommentInPost: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await PostServices.addCommentToPost(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Comment added successfully',
    data: result,
  });
});
const deleteCommentInPost: RequestHandler = catchAsync(async (req, res) => {
  const postId = req.params.postId;
  const { commentId } = req.body;
  const result = await PostServices.deleteCommentToPost(postId, commentId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Comment deleted successfully',
    data: result,
  });
});
const updateCommentInPost: RequestHandler = catchAsync(async (req, res) => {
  const postId = req.params.postId;
  const { commentId, content } = req.body;
  const result = await PostServices.updateCommentToPost(
    postId,
    commentId,
    content
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Comment update successfully',
    data: result,
  });
});
const addReactionInPost: RequestHandler = catchAsync(async (req, res) => {
  const { postId } = req.params;

  const result = await PostServices.addReactionToPost(postId, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Comment added successfully',
    data: result,
  });
});
export const PostControllers = {
  addCommentInPost,
  deleteCommentInPost,
  createPost,
  getAllPost,
  getSinglePost,
  updateSinglePost,
  updateCommentInPost,
  addReactionInPost,
  deleteSinglePost,
};
