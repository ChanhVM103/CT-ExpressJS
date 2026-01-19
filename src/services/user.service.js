import { prisma } from "../common/prisma/connect.prisma.js";
import {
  BadRequestException,
  NotFoundException,
} from "../common/helper/exception.helpler.js";
import { FOLDER_IMAGE } from "../common/constant/app.constant.js";
import cloudinary from "../common/cloudinary/init.cloudinary.js";

export const userService = {
  async getProfile(req) {
    const userID = req.user.userID; // lấy từ protect middleware
    const user = await prisma.users.findUnique({
      where: {
        userID: userID,
      },
      select: {
        userID: true,
        email: true,
        fullname: true,
        age: true,
        avatar: true,
        // loại bỏ password
      },
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  },
  async getSavedImages(req) {
    const userID = req.user.userID; // lấy từ protect middleware

    const savedImages = await prisma.saved_images.findMany({
      where: {
        userID: +userID,
      },
      include: {
        images: {
          include: {
            users: {
              select: {
                userID: true,
                email: true,
                fullname: true,
                avatar: true,
              },
            },
          },
        },
      },
      orderBy: {
        saveDate: "desc", // sắp xếp mới lưu nhất trước
      },
    });

    return savedImages;
  },
  async getCreatedImages(req) {
    const userID = req.user.userID; // lấy từ protect middleware

    const images = await prisma.images.findMany({
      where: {
        userID: +userID,
        isDeleted: false, // chỉ lấy ảnh chưa bị xóa
      },
      include: {
        users: {
          select: {
            userID: true,
            email: true,
            fullname: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        imageID: "desc", // sắp xếp mới tạo nhất trước
      },
    });

    return images;
  },
	async uploadImage(req) {
    // req.file sẽ là file được upload lên local
    // req.body sẽ là các trường dữ liệu dạng text, nếu có
    const { imageName, description } = req.body;
    const userID = req.user.userID; // lấy từ protect middleware
    
    if (!req.file) {
      throw new BadRequestException("Không có file");
    }
    if (!imageName) {
      throw new BadRequestException("Tên ảnh là bắt buộc");
    }
    
    // File đã được lưu vào local bởi multer diskStorage
    // req.file.filename chứa tên file đã được lưu
    // req.file.path chứa đường dẫn đầy đủ
    
    console.log("File uploaded:", req.file);
    
    // lưu thông tin ảnh vào database
    const newImage = await prisma.images.create({
      data: {
        imageName: imageName,
        path: req.file.filename, // lưu tên file thay vì public_id
        description: description || null,
        userID: userID,
      },
      include: {
        users: {
          select: {
            userID: true,
            email: true,
            fullname: true,
            avatar: true,
          }
        }
      }
    });

    return newImage;
  },
  async saveImage(req) {
    const { imageId } = req.params;
    const userID = req.user.userID; // lấy từ protect middleware
    
    if (!imageId || isNaN(+imageId)) {
      throw new BadRequestException('Invalid image ID');
    }
    // kiểm tra ảnh có tồn tại không
    const imageExit = await prisma.images.findUnique({
      where: {
        imageID: +imageId,
      },
    });
    
    if (!imageExit) {
      throw new NotFoundException('Image not found');
    }
    // Kiểm tra ảnh có tồn tại không
    const image = await prisma.images.findUnique({
      where: {
        imageID: +imageId,
        isDeleted: false, // chỉ lưu ảnh chưa bị xóa
      },
    });
    
    if (!image) {
      throw new NotFoundException('Image not found');
    }
    
    // Kiểm tra đã lưu chưa
    const existingSave = await prisma.saved_images.findUnique({
      where: {
        userID_imageID: {
          userID: userID,
          imageID: +imageId,
        },
      },
    });
    
    if (existingSave) {
      throw new BadRequestException('Image already saved');
    }
    
    // Lưu ảnh
    const savedImage = await prisma.saved_images.create({
      data: {
        userID: userID,
        imageID: +imageId,
      },
      include: {
        images: {
          include: {
            users: {
              select: {
                userID: true,
                email: true,
                fullname: true,
                avatar: true,
              },
            },
          },
        },
      },
    });
    
    return savedImage;
  },
};
