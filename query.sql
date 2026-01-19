-- =============================================
-- 1. TẠO VÀ SỬ DỤNG DATABASE
-- =============================================
DROP DATABASE IF EXISTS db_capstone_photo;
CREATE DATABASE db_capstone_expressJs;
USE db_capstone_expressJs;

-- =============================================
-- 2. TẠO CÁC BẢNG (TABLES)
-- =============================================

-- Bảng Người dùng
CREATE TABLE users (
    userID INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    fullname VARCHAR(100),
    age INT,
    avatar VARCHAR(255)
);

-- Bảng Hình ảnh
CREATE TABLE images (
    imageID INT PRIMARY KEY AUTO_INCREMENT,
    imageName VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL,
    description TEXT,
    userID INT,
    isDeleted TINYINT(1) DEFAULT 0, -- 0: chưa xóa, 1: đã xóa (soft delete)
    FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE CASCADE
);

-- Bảng Bình luận
CREATE TABLE comments (
    commentID INT PRIMARY KEY AUTO_INCREMENT,
    userID INT,
    imageID INT,
    comment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    content TEXT,
    FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE CASCADE,
    FOREIGN KEY (imageID) REFERENCES images(imageID) ON DELETE CASCADE
);

-- Bảng Lưu ảnh
CREATE TABLE saved_images (
    userID INT,
    imageID INT,
    saveDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (userID, imageID), -- Một user chỉ lưu một ảnh 1 lần
    FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE CASCADE,
    FOREIGN KEY (imageID) REFERENCES images(imageID) ON DELETE CASCADE
);

-- =============================================
-- 3. INSERT DỮ LIỆU MẪU (SEED DATA)
-- =============================================

-- DỮ LIỆU BẢNG USERS (5 User)
INSERT INTO users (email, password, fullname, age, avatar) VALUES
('chanh.vo@gmail.com', '1234', 'Võ Minh Chánh', 21, 'https://i.pravatar.cc/150?u=chanh'),
('nguyen.a@gmail.com', '1234', 'Nguyễn Văn A', 22, 'https://i.pravatar.cc/150?u=a'),
('tran.b@gmail.com', '1234', 'Trần Thị B', 20, 'https://i.pravatar.cc/150?u=b'),
('le.c@yahoo.com', '1234', 'Lê Văn C', 25, 'https://i.pravatar.cc/150?u=c'),
('admin@system.com', '1234', 'Admin System', 30, 'https://i.pravatar.cc/150?u=admin');

-- DỮ LIỆU BẢNG IMAGES (10 Ảnh)
INSERT INTO images (imageName, path, description, userID, isDeleted) VALUES
('Setup Code', 'https://picsum.photos/id/1/800/600', 'Góc làm việc của Chánh', 1, 0),
('Hoàng hôn', 'https://picsum.photos/id/10/800/600', 'Chiều tím Phú Quốc', 2, 0),
('Mèo Mướp', 'https://picsum.photos/id/40/800/600', 'Boss nhà nuôi', 3, 0),
('Cà phê sáng', 'https://picsum.photos/id/60/800/600', 'Start a new day', 1, 0),
('Phố Cổ', 'https://picsum.photos/id/50/800/600', 'Hà Nội mùa thu', 4, 0),
('Siêu xe', 'https://picsum.photos/id/80/800/600', 'Đam mê tốc độ', 2, 0),
('Rừng thông', 'https://picsum.photos/id/70/800/600', 'Đà Lạt chill', 3, 0),
('Code đêm', 'https://picsum.photos/id/90/800/600', 'Fix bug xuyên đêm', 1, 0),
('Đồ ăn', 'https://picsum.photos/id/100/800/600', 'Bữa trưa healthy', 4, 0),
('Ảnh đã xóa', 'https://picsum.photos/id/200/800/600', 'Demo soft delete', 1, 1); -- Ảnh đã xóa

-- DỮ LIỆU BẢNG COMMENTS
INSERT INTO comments (userID, imageID, content) VALUES
(2, 1, 'Góc máy xịn quá Chánh ơi!'),
(3, 1, 'Bàn phím hãng gì vậy b?'),
(1, 2, 'Cảnh đẹp quá, ước được đi.'),
(4, 8, 'Cố lên Chánh, sắp xong project rồi!');

-- DỮ LIỆU BẢNG SAVED_IMAGES
INSERT INTO saved_images (userID, imageID) VALUES
(1, 2), (1, 6), -- Chánh lưu ảnh Hoàng hôn và Siêu xe
(2, 1),         -- A lưu ảnh Setup của Chánh
(3, 4);         -- B lưu ảnh Cà phê