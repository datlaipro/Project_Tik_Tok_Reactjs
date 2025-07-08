import React from "react";
import styles from "./styleAlike.module.css";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SettingsIcon from "@mui/icons-material/Settings";

// import "./yourGlobalStyle.css"; // File bạn vừa gửi (đặt lại tên đúng theo bạn đang dùng)


const Profile = () => {
  return (
    <div className={styles.profileWrapper}>
      <div className={styles.header}>
        <Avatar
          src="https://example.com/avatar.png"
          sx={{ width: 120, height: 120 }}
        />
        <div className={styles.info}>
          <h2>ngoquocdat4</h2>
          <p>Ngô Đạt6227</p>
          <div className={styles.buttons}>
            <Button variant="contained" color="error">Sửa hồ sơ</Button>
            <Button variant="outlined">Quảng bá bài đăng</Button>
            <SettingsIcon className={styles.iconBtn} />
          </div>
        </div>
      </div>

      <div className={styles.stats}>
        <span><b>13</b> Đã follow</span>
        <span><b>4</b> Follower</span>
        <span><b>0</b> Lượt thích</span>
      </div>

      <p className={styles.bio}>Chưa có tiểu sử.</p>

      <div className={styles.tabs}>
        <span className={styles.activeTab}>Video</span>
        <span>Yêu thích</span>
        <span>Đã thích</span>
      </div>

      <div className={styles.videos}>
        <div className={styles.video}>
          <video src="/video1.mp4" muted />
          <span className={styles.views}>0</span>
        </div>
        <div className={styles.video}>
          <video src="/video2.mp4" muted />
          <span className={styles.views}>0</span>
        </div>
      </div>
    </div>
  );
};




export default Profile;
