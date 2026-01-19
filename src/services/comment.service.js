import { prisma } from "../common/prisma/connect.prisma.js";
import { BadRequestException, NotFoundException } from "../common/helper/exception.helpler.js";

export const commentService = {
  async findOne(req) {
    const { id } = req.params;
    if (!id || isNaN(+id)) {
      throw new BadRequestException('Invalid image ID');
    }
    // kiểm tra ảnh có tồn tại không
    const image = await prisma.images.findUnique({
      where: {
        imageID: +id,
      },
    });
    if (!image) {
      throw new NotFoundException('Image not found');
    }
    const comments = await prisma.comments.findMany({
      where: {
        imageID: +id,
      },
      orderBy: {
        comment_date: 'desc', // sắp xếp mới nhất trước
      }
    });
    return comments;
  },
  async create(req) {
    const { imageID, content } = req.body;
    const userID = req.user.userID; // lấy từ protect middleware
    
    // Validate dữ liệu
    if (!imageID || !content) {
      throw new BadRequestException('imageID and content are required');
    }
    if (isNaN(+imageID)) {
      throw new BadRequestException('Invalid imageID');
    }
    // kiểm tra ảnh có tồn tại không
    const image = await prisma.images.findUnique({
      where: {
        imageID: +imageID,
      },
    });
    if (!image) {
      throw new NotFoundException('Image not found');
    }
    // Tạo comment mới
    const newComment = await prisma.comments.create({
      data: {
        userID: userID,
        imageID: +imageID,
        content: content,
      },
      include: {
        users: {
          select: {
            userID: true,
            email: true,
            fullname: true,
            avatar: true,
          }
        },
        images: {
          select: {
            imageID: true,
            imageName: true,
          }
        }
      }
    });
    return newComment;
  },
};
