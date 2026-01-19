
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi, { serve } from "swagger-ui-express";
import { PORT } from "../constant/app.constant.js";

// định nghĩa thông tin cơ bản về API
const swaggerDefinition = {
  openapi: "3.0.0", // phiên bản OpenAPI
  info: {
    title: "CAPSTONE SLOT 15 - NODE 53", // tiêu đề API
    version: "1.0.0",
    description: "API VỀ QUẢN LÝ ẢNH VÀ NGƯỜI DÙNG", // mô tả API
  },
  servers: [
    {
      url: "http://localhost:3069/api",
      description: "Development server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Nhập token JWT như sau: Bearer {token}",
      },
    },
    schemas: {
      // ============= USER SCHEMAS =============
      User: {
        type: "object",
        properties: {
          userID: { type: "integer", example: 1 },
          email: { type: "string", format: "email", example: "user@example.com" },
          fullname: { type: "string", example: "Nguyễn Văn A" },
          age: { type: "integer", example: 25 },
          avatar: { type: "string", nullable: true, example: "avatar_url" },
        },
      },
      UserProfile: {
        type: "object",
        properties: {
          userID: { type: "integer", example: 1 },
          email: { type: "string", format: "email", example: "user@example.com" },
          fullname: { type: "string", example: "Nguyễn Văn A" },
          age: { type: "integer", example: 25 },
          avatar: { type: "string", nullable: true, example: "avatar_url" },
        },
      },
      
      // ============= IMAGE SCHEMAS =============
      Image: {
        type: "object",
        properties: {
          imageID: { type: "integer", example: 1 },
          imageName: { type: "string", example: "Sunset Beach" },
          path: { type: "string", example: "cloudinary_public_id" },
          description: { type: "string", nullable: true, example: "Beautiful sunset at the beach" },
          userID: { type: "integer", example: 1 },
          isDeleted: { type: "boolean", example: false },
          users: { $ref: "#/components/schemas/User" },
        },
      },
      ImageWithComments: {
        type: "object",
        properties: {
          imageID: { type: "integer", example: 1 },
          imageName: { type: "string", example: "Sunset Beach" },
          path: { type: "string", example: "cloudinary_public_id" },
          description: { type: "string", nullable: true, example: "Beautiful sunset" },
          userID: { type: "integer", example: 1 },
          isDeleted: { type: "boolean", example: false },
          users: { $ref: "#/components/schemas/User" },
          comments: {
            type: "array",
            items: { $ref: "#/components/schemas/Comment" },
          },
        },
      },
      UploadImageRequest: {
        type: "object",
        required: ["file", "imageName"],
        properties: {
          file: { 
            type: "string", 
            format: "binary",
            description: "File ảnh cần upload"
          },
          imageName: { 
            type: "string", 
            example: "Beautiful Sunset",
            description: "Tên ảnh (bắt buộc)"
          },
          description: { 
            type: "string", 
            example: "A beautiful sunset at the beach",
            description: "Mô tả ảnh (tùy chọn)"
          },
        },
      },
      
      // ============= COMMENT SCHEMAS =============
      Comment: {
        type: "object",
        properties: {
          commentID: { type: "integer", example: 1 },
          userID: { type: "integer", example: 1 },
          imageID: { type: "integer", example: 1 },
          content: { type: "string", example: "Great photo!" },
          comment_date: { type: "string", format: "date-time", example: "2026-01-10T10:00:00.000Z" },
          users: { $ref: "#/components/schemas/User" },
        },
      },
      CreateCommentRequest: {
        type: "object",
        required: ["imageID", "content"],
        properties: {
          imageID: { type: "integer", example: 5, description: "ID của ảnh" },
          content: { type: "string", example: "Ảnh đẹp quá!", description: "Nội dung bình luận" },
        },
      },
      
      // ============= SAVED IMAGE SCHEMAS =============
      SavedImage: {
        type: "object",
        properties: {
          userID: { type: "integer", example: 1 },
          imageID: { type: "integer", example: 5 },
          saveDate: { type: "string", format: "date-time", example: "2026-01-10T10:00:00.000Z" },
          images: { $ref: "#/components/schemas/Image" },
        },
      },
      CheckSavedResponse: {
        type: "object",
        properties: {
          isSaved: { type: "boolean", example: true },
          savedImage: { 
            oneOf: [
              { $ref: "#/components/schemas/SavedImage" },
              { type: "null" }
            ]
          },
        },
      },
      
      // ============= PAGINATION SCHEMAS =============
      PaginationResponse: {
        type: "object",
        properties: {
          page: { type: "integer", example: 1 },
          pageSize: { type: "integer", example: 10 },
          totalItem: { type: "integer", example: 100 },
          totalPage: { type: "integer", example: 10 },
          items: {
            type: "array",
            items: { $ref: "#/components/schemas/Image" },
          },
        },
      },
      
      // ============= AUTH SCHEMAS =============
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email", example: "user@example.com" },
          password: { type: "string", format: "password", example: "123456" },
        },
      },
      RegisterRequest: {
        type: "object",
        required: ["email", "password", "fullname"],
        properties: {
          email: { type: "string", format: "email", example: "user@example.com" },
          password: { type: "string", format: "password", example: "123456" },
          fullname: { type: "string", example: "Nguyễn Văn A" },
          age: { type: "integer", example: 25 },
        },
      },
      AuthResponse: {
        type: "object",
        properties: {
          accessToken: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
          refreshToken: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
          user: { $ref: "#/components/schemas/User" },
        },
      },
      
      // ============= RESPONSE SCHEMAS =============
      SuccessResponse: {
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 200 },
          message: { type: "string", example: "Success" },
          data: { type: "object", description: "Response data" },
        },
      },
      ErrorResponse: {
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 400 },
          message: { type: "string", example: "Bad Request" },
          error: { type: "string", example: "Error details" },
        },
      },
      BadRequestError: {
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 400 },
          message: { type: "string", example: "Bad Request" },
          error: { type: "string", example: "Invalid input data" },
        },
      },
      UnauthorizedError: {
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 401 },
          message: { type: "string", example: "Unauthorized" },
          error: { type: "string", example: "Invalid or missing token" },
        },
      },
      ForbiddenError: {
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 403 },
          message: { type: "string", example: "Forbidden" },
          error: { type: "string", example: "You do not have permission" },
        },
      },
      NotFoundError: {
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 404 },
          message: { type: "string", example: "Not Found" },
          error: { type: "string", example: "Resource not found" },
        },
      },
    },
  },
};

// cấu hình swagger-jsdoc
const options = {
  swaggerDefinition,
  apis: [
    "./src/routers/*.js", // đường dẫn đến các file router
    "./server.js" // đường dẫn đến file server chính
  ],
};

// tạo swagger
const swaggerSpec = swaggerJSDoc(options);

// thêm swagger vào middleware để public swagger UI
export const setupSwagger = (app) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      swaggerOptions: {
        requestInterceptor: (req) => {
          // Tăng timeout cho các request upload file
          req.timeout = 120000; // 120 giây
          return req;
        },
      },
    })
  );
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
}
