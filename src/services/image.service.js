import { buildQueryPrisma } from "../common/helper/build-query-prisma.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js";
import { BadRequestException, NotFoundException, ForbiddenException } from "../common/helper/exception.helpler.js";

export const imageService = {
  async findAll(req) {
    const { page, pageSize, where, index } = buildQueryPrisma(req.query);
    // khởi tạo promise lấy dữ liệu từ prisma (ko await)
    const resultPrismaPromise = prisma.images.findMany({
      where: where,
      skip: index, //skip bỏ qua tới vị trí index
      take: +pageSize, //lấy về đúng số lượng phần tử
    });
    // khởi tạo promise đếm tổng số lượng bản ghi (ko await)
    const totalItemPromise = prisma.images.count({
      where: where,
    });
    // chạy song song 2 promise và chờ hoàn thành cả 2
    const [resultPrisma, totalItem] = await Promise.all([
      resultPrismaPromise,
      totalItemPromise,
    ]);

    return {
      page: page,
      pageSize: pageSize,
      totalItem: totalItem,
      totalPage: Math.ceil(totalItem / pageSize),
      items: resultPrisma,
    };
  },
  async findOne(req) {
    const { id } = req.params;
    // Kiểm tra id có hợp lệ không
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
    const result = prisma.images.findUnique({
      where: {
        imageID: +id,
      },
      include: {
        users: {
          select: {
            userID: true,
            email: true,
            fullname: true,
            age: true,
            avatar: true,
            // loại bỏ password
          }
        }
      },
    });
    return result;
  },
  async checkImageSaved(req) {
    const { id } = req.params; // lấy imageID từ params 
    const userID = req.user.userID; // lấy từ protect middleware
    // kiểm tra ảnh có tồn tại không
    const image = await prisma.images.findUnique({
      where: {
        imageID: +id,
      },
    });
    if (!image) {
      throw new NotFoundException('Image not found');
    }
    const savedImage = await prisma.saved_images.findUnique({
      where: {
        userID_imageID: {
          userID: userID,
          imageID: +id,
        },
      },
    });
    return {
      isSaved: !!savedImage,
      savedImage: savedImage,
    };
  },
  async deleteImage(req) {
    const { id } = req.params;
    const userID = req.user.userID; // lấy từ protect middleware
    
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
    
    // Kiểm tra quyền sở hữu
    if (image.userID !== userID) {
      throw new ForbiddenException('You do not have permission to delete this image');
    }
    
    // Soft delete - set isDeleted = true
    const deletedImage = await prisma.images.update({
      where: {
        imageID: +id,
      },
      data: {
        isDeleted: true,
      },
    });
    
    return deletedImage;
  },
};
