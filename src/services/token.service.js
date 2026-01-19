import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from "../common/constant/app.constant.js";

export const tokenService = {
  createTokens(userID) {
    const accessToken = jwt.sign({ userID: userID }, ACCESS_TOKEN_SECRET, {
      expiresIn: "5m",
    });
    const refreshToken = jwt.sign({ userID: userID }, REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  },

  verifyAccessToken(accessToken, option) {
    const decode = jwt.verify(accessToken, ACCESS_TOKEN_SECRET, option);
    return decode;
  },

  verifyRefreshToken(refreshToken) {
    const decode = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    return decode;
  },
};
