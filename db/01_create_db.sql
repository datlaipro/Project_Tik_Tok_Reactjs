USE video_platform;

-- USERS
CREATE TABLE IF NOT EXISTS users (
  user_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  account VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  refresh_token TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- VIDEO
CREATE TABLE IF NOT EXISTS video (
  id_video INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  path VARCHAR(255) NOT NULL,
  user_id INT UNSIGNED NULL,
  visibility ENUM('public','private') DEFAULT 'public',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_video_user (user_id),
  CONSTRAINT fk_video_user FOREIGN KEY (user_id)
    REFERENCES users(user_id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- LIKE COUNTER (1 hàng cho 1 video, nhưng vẫn có id tự tăng)
CREATE TABLE IF NOT EXISTS `like` (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_video INT UNSIGNED NOT NULL,
  quantity INT DEFAULT 0,
  UNIQUE KEY uq_like_video (id_video),    -- chống trùng theo video
  INDEX idx_like_video (id_video),
  CONSTRAINT fk_like_video FOREIGN KEY (id_video)
    REFERENCES video(id_video)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- COMMENT COUNTER
CREATE TABLE IF NOT EXISTS comment_count (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_video INT UNSIGNED NOT NULL,
  quantity INT DEFAULT 0,
  UNIQUE KEY uq_comment_video (id_video),
  INDEX idx_comment_video (id_video),
  CONSTRAINT fk_comment_video FOREIGN KEY (id_video)
    REFERENCES video(id_video)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- BOOKMARK COUNTER
CREATE TABLE IF NOT EXISTS bookmark (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_video INT UNSIGNED NOT NULL,
  quantity INT DEFAULT 0,
  UNIQUE KEY uq_bookmark_video (id_video),
  INDEX idx_bookmark_video (id_video),
  CONSTRAINT fk_bookmark_video FOREIGN KEY (id_video)
    REFERENCES video(id_video)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- COMMENTS chi tiết
CREATE TABLE IF NOT EXISTS comment (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NULL,
  id_video INT UNSIGNED NULL,
  content VARCHAR(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_comment_user (user_id),
  KEY idx_comment_video2 (id_video),
  CONSTRAINT comment_user_fk  FOREIGN KEY (user_id)  REFERENCES users(user_id) ON DELETE SET NULL,
  CONSTRAINT comment_video_fk FOREIGN KEY (id_video) REFERENCES video(id_video) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Ai LIKE video nào (giữ id tự tăng + chặn trùng cặp user/video)
CREATE TABLE IF NOT EXISTS user_like (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  id_video INT UNSIGNED NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_user_like (user_id, id_video),
  KEY idx_ul_video (id_video),
  CONSTRAINT user_like_user_fk  FOREIGN KEY (user_id)  REFERENCES users(user_id) ON DELETE CASCADE,
  CONSTRAINT user_like_video_fk FOREIGN KEY (id_video) REFERENCES video(id_video) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Ai BOOKMARK video nào (giữ id tự tăng + chặn trùng cặp user/video)
CREATE TABLE IF NOT EXISTS user_bookmark (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  id_video INT UNSIGNED NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_user_bm (user_id, id_video),
  KEY idx_ub_video (id_video),
  CONSTRAINT user_bm_user_fk  FOREIGN KEY (user_id)  REFERENCES users(user_id) ON DELETE CASCADE,
  CONSTRAINT user_bm_video_fk FOREIGN KEY (id_video) REFERENCES video(id_video) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
