import express from 'express';
import { commentController } from '../controllers/comment.controller.js';
import { protect } from '../common/middleware/protect.middleware.js';

const commentRouter = express.Router();

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Tạo comment mới cho ảnh
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCommentRequest'
 *     responses:
 *       200:
 *         description: Tạo comment thành công
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
 *                   example: Create comment successfully
 *                 data:
 *                   $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Thiếu thông tin hoặc dữ liệu không hợp lệ
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
commentRouter.post('/', protect, commentController.create);

/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Lấy danh sách comment theo imageID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của ảnh
 *     responses:
 *       200:
 *         description: Lấy danh sách comment thành công
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
 *                   example: Get comment successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comment'
 *       400:
 *         description: ID không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequestError'
 */
commentRouter.get('/:id', commentController.findOne);

export default commentRouter;