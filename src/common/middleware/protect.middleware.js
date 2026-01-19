import { tokenService } from "../../services/token.service.js";
import { UnauthorizedException } from "../helper/exception.helpler.js";
import { prisma } from "../prisma/connect.prisma.js";

export const protect = async (req, res, next) => {
  // lấy token từ header
  const authorization = req.headers.authorization;
  if (!authorization) {
    throw new UnauthorizedException("Không có authorization");
  }
  // kiểm tra token hợp lệ
  const [type, token] = authorization.split(" ");
  if (type !== "Bearer") {
    throw new UnauthorizedException("Token không phải là Bearer");
  }
  if (!token) {
    throw new UnauthorizedException("Không có token");
  }
  // lấy userID từ decoded token ở phía service
  const { userID } = tokenService.verifyAccessToken(token);
  // kiểm tra userID có tồn tại trong db ko
  const userExits = await prisma.users.findUnique({
    where: {
      userID: userID,
    },
  });
  if (!userExits) {
    throw new UnauthorizedException("Không tìm thấy user");
  }
  // console.log({ authorization, type, token, userID, userExits });
  req.user = userExits;

  next();
};
