import { responseSuccess } from "../common/helper/function.helper.js";
import { userService } from "../services/user.service.js";

export const userController = {
  async getProfile(req, res, next) {
    const result = await userService.getProfile(req);
    const response = responseSuccess(result, `Get profile successfully`);
    res.status(response.statusCode).json(response);
  },

  async getSavedImages(req, res, next) {
    const result = await userService.getSavedImages(req);
    const response = responseSuccess(result, `Get saved images successfully`);
    res.status(response.statusCode).json(response);
  },

  async getCreatedImages(req, res, next) {
    const result = await userService.getCreatedImages(req);
    const response = responseSuccess(
      result,
      `Get uploaded images successfully`
    );
    res.status(response.statusCode).json(response);
  },
  async uploadImage(req, res, next) {
    const result = await userService.uploadImage(req);
    const response = responseSuccess(result, `Upload image successfully`);
    res.status(response.statusCode).json(response);
  },
  async saveImage(req, res, next) {
    const result = await userService.saveImage(req);
    const response = responseSuccess(result, `Save image successfully`);
    res.status(response.statusCode).json(response);
  },
};
