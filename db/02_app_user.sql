-- Tạo user cho ứng dụng và cấp quyền trên DB
CREATE USER IF NOT EXISTS 'app'@'%' IDENTIFIED BY 'apppw';
GRANT ALL PRIVILEGES ON `video_platform`.* TO 'app'@'%';
FLUSH PRIVILEGES;
