import { responseError } from "./function.helper.js";
import jwt from "jsonwebtoken";
import { statusCodes } from "./status-code.helper.js";

// để ở cuối để gom tất cả các lỗi trong dự án
export const appError = (err, req, res, next) => {
  console.error("Middleware đặc biệt xử lý lỗi: ", err);
  
  if (err instanceof jwt.JsonWebTokenError) {
    err.message = "Token không hợp lệ";
    err.code = statusCodes.UNAUTHORIZED; // 401 => FE logout người dùng
  }
  if (err instanceof jwt.TokenExpiredError) {
    console.error("TokenExpiredError at:", req.originalUrl || req.path);
    err.message = "Token đã hết hạn";
    err.code = statusCodes.FORBIDDEN; // 403 => FE sẽ gọi api POST: api/auth/refresh-token
  }

  const errorResponse = responseError(err?.message, err?.code);

  res.status(errorResponse.statusCode).json(errorResponse);
};
