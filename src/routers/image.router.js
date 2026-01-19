import express from 'express';
import { imageController } from '../controllers/image.controller.js';
import { protect } from '../common/middleware/protect.middleware.js';

const imageRouter = express.Router();

/**
 * @swagger
 * /images:
 *   get:
 *     summary: Lấy danh sách tất cả ảnh với phân trang và filter
 *     tags: [Images]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Số trang
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 3
 *         description: Số lượng item trên mỗi trang
 *       - in: query
 *         name: filters
 *         schema:
 *           type: string
 *           example: '{"imageName":"hoàng"}'
 *         description: 'JSON string để filter (ví dụ: {"imageName":"hoàng"}) để trống nếu không cần filter' 
 *     responses:
 *       200:
 *         description: Lấy danh sách ảnh thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginationResponse'
 */
imageRouter.get('/', imageController.findAll);

/**
 * @swagger
 * /images/checkSaved/{id}:
 *   get:
 *     summary: Kiểm tra ảnh đã được user lưu chưa
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của ảnh
 *     responses:
 *       200:
 *         description: Kiểm tra thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CheckSavedResponse'
 *       401:
 *         description: Chưa đăng nhập
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 */
imageRouter.get('/checkSaved/:id', protect, imageController.checkImageSaved);

/**
 * @swagger
 * /images/{id}:
 *   get:
 *     summary: Lấy thông tin chi tiết ảnh theo ID
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của ảnh
 *     responses:
 *       200:
 *         description: Lấy thông tin ảnh thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Image'
 *       400:
 *         description: ID không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequestError'
 *       404:
 *         description: Không tìm thấy ảnh
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundError'
 *   delete:
 *     summary: Xóa ảnh (soft delete - set isDeleted = true)
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của ảnh
 *     responses:
 *       200:
 *         description: Xóa ảnh thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Chưa đăng nhập
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       403:
 *         description: Không có quyền xóa ảnh này
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForbiddenError'
 *       404:
 *         description: Không tìm thấy ảnh
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundError'
 */
imageRouter.delete('/:id', protect, imageController.deleteImage);
imageRouter.get('/:id', imageController.findOne);

export default imageRouter;