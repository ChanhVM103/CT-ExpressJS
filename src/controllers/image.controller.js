import { responseSuccess } from "../common/helper/function.helper.js";
import { imageService } from "../services/image.service.js";

export const imageController = {
  async findAll(req, res, next) {
    const result = await imageService.findAll(req);
    const response = responseSuccess(result, `Get all images successfully`);
    res.status(response.statusCode).json(response);
  },
  async findOne(req, res, next) {
    const result = await imageService.findOne(req);
    const response = responseSuccess(result, `Get image successfully`);
    res.status(response.statusCode).json(response);
  },
  async checkImageSaved(req, res, next) {
    const result = await imageService.checkImageSaved(req);
    const response = responseSuccess(result, `Check image saved successfully`);
    res.status(response.statusCode).json(response);
  },
  async uploadImage(req, res, next) {
    const result = await imageService.uploadImage(req);
    const response = responseSuccess(result, `Upload image successfully`);
    res.status(response.statusCode).json(response);
  },
  async deleteImage(req, res, next) {
    const result = await imageService.deleteImage(req);
    const response = responseSuccess(result, `Delete image successfully`);
    res.status(response.statusCode).json(response);
  },
};
