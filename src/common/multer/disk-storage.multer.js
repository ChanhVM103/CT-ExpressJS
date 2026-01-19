import multer from "multer";
import path from "path";
import fs from "fs";  
import { FOLDER_IMAGE } from "../constant/app.constant.js";

// recursive: nếu folder đã tồn tại rồi thì bỏ qua
fs.mkdirSync(FOLDER_IMAGE, { recursive: true });

const storage = multer.diskStorage({
  // chỉnh định nơi lưu file
  destination: function (req, file, cb) {
    cb(null, FOLDER_IMAGE);
  },
  // chỉnh định tên file khi lưu
  filename: function (req, file, cb) {
    // lấy extension của file
    const extname = path.extname(file.originalname);
    // console.log({ file, extname });
    // tạo ký tự ngẫu nhiên để đặt tên file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // đặt tên file theo định dạng: fieldname + ký tự ngẫu nhiên + extension
    const fileName = "local" + "-" + uniqueSuffix + extname;
    // trả về tên file
    cb(null, fileName);
  },
});

export const uploadDiskStorage = multer({ storage: storage });
