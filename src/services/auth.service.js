import { BadRequestException } from "../common/helper/exception.helpler.js";
import { prisma } from "../common/prisma/connect.prisma.js";
import bcrypt from "bcrypt";
import { tokenService } from "./token.service.js";

export const authService = {
  async login(req) {
    const { email, password } = req.body;
    // Kiểm tra email người dùng có tồn tại trong db hay không
    // nếu mà tồn tại => đi tiếp
    // nếu mà chưa tồn => trả lỗi (Xin vui lòng đăng ký trước khi đăng nhập)
    const userExits = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    if (!userExits) {
      throw new BadRequestException("Xin vui lòng đăng ký trước khi đăng nhập");
    }
    // kiểm tra password
    const isPassword = bcrypt.compareSync(password, userExits.password);
    if (!isPassword) {
      throw new BadRequestException("Mật khẩu chưa chính xác");
    }
    const tokens = tokenService.createTokens(userExits.userID);

    console.log({ email, password, userExits });

    return tokens;
  },

  async register(req) {
    const { email, password, fullname,age } = req.body;

    // kiểm tra người dùng có hay chưa, nếu đã tồn tại thì không cho đăng ký
    const userExist = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    // nếu người dùng đã tồn tại thì trả lỗi 400 => không cho đăng ký
    if (userExist) {
      throw new BadRequestException(
        "Người dùng đã tồn tại, vui lòng đăng nhập"
      );
    }
    // bcrypt băm passs chỉ sử dụng CPU, không dùng GPU
    const hashPassword = bcrypt.hashSync(password, 10);
    // email này chưa tồn tại => tạo người dùng mới
    const userNew = await prisma.users.create({
      data: {
        email: email,
        password: hashPassword,
        fullname: fullname,
        age :age
      },
    });

    //  console.log({ email, password });

    return true;
  },
};
