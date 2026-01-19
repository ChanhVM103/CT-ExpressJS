import { register } from "module";
import { responseSuccess } from "../common/helper/function.helper.js";
import { authService } from "../services/auth.service.js";

export const authController = {
  async login(req, res, next) {
    const result = await authService.login(req);
    const response = responseSuccess(result, `Login user successfully`);
    res.status(response.statusCode).json(response);
  },

  async register(req, res, next) {
    const result = await authService.register(req);
    const response = responseSuccess(result, `Register user successfully`);
    res.status(response.statusCode).json(response);
  },
};
