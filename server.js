import express from 'express';
import rootRouter from './src/routers/root.router.js';
import cors from 'cors';
import { createServer } from "http";
import { appError } from './src/common/helper/handle-error.helper.js';
import { NotFoundException } from './src/common/helper/exception.helpler.js';
import { PORT } from './src/common/constant/app.constant.js';
import { setupSwagger } from './src/common/swagger/swagger.config.js';

const app = express();
app.use(express.static('./public'));
app.use(express.json());
app.use(cors());
// thiết lập swagger, để sau khởi tạo app
setupSwagger(app);
// cấu hình router chính của ứng dụng
app.use('/api', rootRouter);

// in ra thông tin request nếu không tìm thấy route
app.use((req, res, next) => {
  const method = req.method;
  const url = req.originalUrl;
  const ip = req.ip;
  console.log(`${method} ${url} ${ip}`);
  
  throw new NotFoundException()
})
// xử lý lỗi cho toàn bộ ứng dụng
app.use(appError);

const httpServer = createServer(app);

httpServer.listen(PORT, () => {
  console.log(`🤷 Server online at: ${PORT}`);
});