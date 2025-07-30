import React from "react";
import styles from "./styleAlike.module.css";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { useEffect, useState, useRef, useCallback, useContext } from "react";
import api from "../../api/api";
import { MyContext } from "../../context/myContext";
const userName = localStorage.getItem("username");

const Profile = () => {
  const { isMobile } = useContext(MyContext);
  const lastMyIDVideo = useRef(); // lưu id video cuối cùng để render thêm video
  const [path, setPath] = useState([]); // lưu đường dẫn video
  const [id, setId] = useState(localStorage.getItem("id")); //lưu id người dùng, khi đăng nhập tài khoản khác sẽ render lại video của tài khoản mới đó
  const fetchVideos = useRef(null); // tránh bị re-create mỗi lần render
  const [hasMore, setHasMore] = useState(true); // kiểm soát còn dữ liệu không
  var count = 0;
  fetchVideos.current = async () => {
    if (!id || !hasMore) return;

    try {
      const res = await api.get("/myvideo", {
        params: {
          user_id: id,
          last_id: lastMyIDVideo.current || 0,
        },
      });
      const result = res.data.myvideo;

      if (result.length === 0) {
        setHasMore(false); // ❌ không còn video
        return;
      }

      const videos = result.map((row) => ({
        id_video: row.id_video,
        path: row.path,
      }));
      lastMyIDVideo.current = result[result.length - 1].id_video;

      setPath((prev) => [...prev, ...videos]);
      // console.log(path)
    } catch (error) {
      console.error("Lỗi khi fetch videos:", error);
    }
  };

  useEffect(() => {
    if (!id) return;
    setPath([]); // nếu người dùng đăng xuất thì mất video
    lastMyIDVideo.current = null;
    setHasMore(true); // reset trạng thái
    fetchVideos.current(); // gọi video lần đầu tiên
    console.log("isLast", count++);
  }, [id]);

  const observer = useRef();

  const lastMy_Video = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        // gọi load thêm video khi hết
        if (entries[0].isIntersecting && hasMore) {
          // khi load đến cuối thì gọi load thêm video
          fetchVideos.current();
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  return (
    <div className={styles.profileWrapper}>
      <div className={styles.header}>
        <Avatar
          src="https://example.com/avatar.png"
          sx={{ width: 120, height: 120 }}
        />
        <div className={styles.info}>
          <h2>{userName}</h2>
          <p>{userName}</p>
          <div className={styles.buttons}>
            <Button variant="contained" color="error">
              Sửa hồ sơ
            </Button>
            <Button variant="outlined">Quảng bá bài đăng</Button>
            <SettingsIcon className={styles.iconBtn} />
            {isMobile && <LogoutIcon fontSize="small" />}
          </div>
        </div>
      </div>

      <div className={styles.stats}>
        <span>
          <b>13</b> Đã follow
        </span>
        <span>
          <b>4</b> Follower
        </span>
        <span>
          <b>0</b> Lượt thích
        </span>
      </div>

      <p className={styles.bio}>Chưa có tiểu sử.</p>

      <div className={styles.tabs}>
        <span className={styles.activeTab}>Video</span>
        <span>Yêu thích</span>
        <span>Đã thích</span>
      </div>
      <div className={styles.videos}>
        {path.map((video, index) => {
          const isLast = index === path.length - 1;
          return (
            <div
              className={styles.video}
              key={video.id_video}
              ref={isLast ? lastMy_Video : null}
            >
              <video src={video.path} muted />
              <span className={styles.views}>0</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
