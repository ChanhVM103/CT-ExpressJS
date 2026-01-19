import express from 'express';
import { userController } from '../controllers/user.controller.js';
import { protect } from '../common/middleware/protect.middleware.js';
import { uploadDiskStorage } from '../common/multer/disk-storage.multer.js';

const userRouter = express.Router();

/**
 * @swagger
 * /users/uploadImage:
 *   post:
 *     summary: Upload ảnh mới lên Local
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/UploadImageRequest'
 *     responses:
 *       200:
 *         description: Upload ảnh thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Upload image successfully
 *                 data:
 *                   $ref: '#/components/schemas/Image'
 *       400:
 *         description: Thiếu file hoặc imageName
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequestError'
 *       401:
 *         description: Chưa đăng nhập
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 */
userRouter.post('/uploadImage', protect, uploadDiskStorage.single('file'), userController.uploadImage);

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Lấy thông tin user hiện tại
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy thông tin profile thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Get profile successfully
 *                 data:
 *                   $ref: '#/components/schemas/UserProfile'
 *       401:
 *         description: Chưa đăng nhập
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 */
userRouter.get('/profile', protect, userController.getProfile);

/**
 * @swagger
 * /users/saveImage/{imageId}:
 *   post:
 *     summary: Lưu ảnh vào danh sách ảnh đã lưu của user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: imageId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của ảnh cần lưu
 *     responses:
 *       200:
 *         description: Lưu ảnh thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Save image successfully
 *                 data:
 *                   $ref: '#/components/schemas/SavedImage'
 *       400:
 *         description: ID không hợp lệ hoặc ảnh đã được lưu
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequestError'
 *       401:
 *         description: Chưa đăng nhập
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       404:
 *         description: Không tìm thấy ảnh
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundError'
 */
userRouter.post('/saveImage/:imageId', protect, userController.saveImage);

/**
 * @swagger
 * /users/listSavedImages:
 *   get:
 *     summary: Lấy danh sách ảnh đã lưu của user hiện tại
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy danh sách ảnh đã lưu thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Get saved images successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/SavedImage'
 *       401:
 *         description: Chưa đăng nhập
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 */
userRouter.get('/listSavedImages', protect, userController.getSavedImages);

/**
 * @swagger
 * /users/listUploadedImages:
 *   get:
 *     summary: Lấy danh sách ảnh đã tạo của user hiện tại
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy danh sách ảnh đã tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Get created images successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Image'
 *       401:
 *         description: Chưa đăng nhập
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 */
userRouter.get('/listUploadedImages', protect, userController.getCreatedImages);

export default userRouter;