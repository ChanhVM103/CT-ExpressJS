🎨 Capstone ExpressJS - Summary
Dự án Capstone xây dựng RESTful API cho nền tảng chia sẻ hình ảnh tương tự Pinterest, sử dụng Node.js, ExpressJS và Prisma ORM.

🚀 Chức năng chính
Xác thực (Auth): Đăng ký, đăng nhập và bảo mật bằng JWT (Access & Refresh Token).

Quản lý ảnh: Upload ảnh (Multer), lấy danh sách (phân trang & filter), xem chi tiết và xóa ảnh (Soft Delete).

Tương tác: Người dùng có thể Lưu ảnh vào bộ sưu tập cá nhân và Bình luận dưới mỗi bức ảnh.

Cá nhân hóa: Quản lý Profile, xem danh sách ảnh đã đăng và ảnh đã lưu.

🛠️ Công nghệ sử dụng
Runtime & Framework: Node.js, Express.js.

Database: MySQL, quản lý thông qua Prisma ORM.

Tài liệu: Tự động hóa tài liệu API bằng Swagger UI.

Lưu trữ: Hỗ trợ lưu trữ local và cấu hình sẵn cho Cloudinary.

📁 Cấu trúc thư mục tiêu chuẩn
Dự án được tổ chức theo mô hình Controller - Service - Router, giúp tách biệt logic nghiệp vụ, dễ dàng bảo trì và mở rộng.

📋 Hướng dẫn cài đặt nhanh
Cài đặt: npm install

Cấu hình: Tạo file .env (Database URL, JWT Secret, Port).

Database: Chạy script SQL để tạo bảng (users, images, comments, saved_images).

Khởi chạy: npm run dev

Docs: Truy cập /api-docs để xem chi tiết các Endpoint.

Author: ChanhVM103
