import multer from "multer";
// khi dùng multer với memoryStorage up lên file sẽ nằm trong buffer
const storage = multer.memoryStorage()
export const uploadMemory = multer({ storage: storage });