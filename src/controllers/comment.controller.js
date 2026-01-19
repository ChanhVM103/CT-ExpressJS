import { responseSuccess } from "../common/helper/function.helper.js";
import { commentService } from "../services/comment.service.js";

export const commentController = {
  async findOne(req, res, next) {
    const result = await commentService.findOne(req);
    const response = responseSuccess(
      result,
      `Get comment successfully`
    );
    res.status(response.statusCode).json(response);
  },
  async create(req, res, next) {
    const result = await commentService.create(req);
    const response = responseSuccess(
      result,
      `Create comment successfully`
    );
    res.status(response.statusCode).json(response);
  },
};
