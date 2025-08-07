import React from "react";
import styles from "./styleAlike.module.css";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom"; // ✅ Đúng
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteIcon from "@mui/icons-material/Favorite";

import {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
  useReducer,
} from "react";
import api from "../../api/api";
import { MyContext } from "../../context/myContext";
const userName = localStorage.getItem("username");
const colorButton = [
  // khởi tạo mảng màu sắc của các nút trong profile
  "red",
  "black",
  "black",
];

const setActive = "SET_ACTIVE"; // khởi tạo action để set màu sắc của các nút trong profile
const reducer = (state, action) => {
  switch (action.type) {
    case setActive:
      return state.map((_, index) =>
        index === action.index ? "red" : "black"
      );
    default:
      return state;
  }
};
const Profile = () => {
  const [state, dispatch] = useReducer(reducer, colorButton); // sử lí màu sắc của các nút trong profile
  const navigate = useNavigate(); // khởi tạo hook điều hướng

  const { isMobile } = useContext(MyContext);
  const lastMyIDVideo = useRef(); // lưu id video cuối cùng để render thêm video
  const [path, setPath] = useState([]); // lưu đường dẫn video
  const [myVideoAPI, setMyVideoAPI] = useState("myvideo"); // lưu đường dẫn api video của user
  // const [likeVideoAPI, setLikeVideoAPI] = useState("likevideo"); // lưu đường dẫn api video đã like
  // const [bookmarkVideoAPI, setBookmarkVideoAPI] = useState("bookmarkvideo"); // lưu đường dẫn api video đã bookmark
  const [id, setId] = useState(localStorage.getItem("id")); //lưu id người dùng, khi đăng nhập tài khoản khác sẽ render lại video của tài khoản mới đó
  // const fetchVideos = useRef(null); // tránh bị re-create mỗi lần render
  const [hasMore, setHasMore] = useState(true); // kiểm soát còn dữ liệu không
  const fetchVideos = useCallback(async () => {
    if (!id ) return;// nếu không có id thì không gọi api

    try {
      const res = await api.get(`/${myVideoAPI}`, {
        params: {
          user_id: id,
          last_id: lastMyIDVideo.current || 0,
        },
      });

      const result = res.data[myVideoAPI];

      if (result.length === 0) {// khi không còn video nào để load nữa thì set hasMore là false để không gọi api nữa
        setHasMore(false);
        return;
      }

      const videos = result.map((row) => ({
        id_video: row.id_video,
        path: row.path,
      }));

      lastMyIDVideo.current = result[result.length - 1].id_video;
      setPath((prev) => [...prev, ...videos]);
    } catch (error) {
      console.error("Lỗi khi fetch videos:", error);
    }
  }, [id, myVideoAPI]); // ✅ myVideoAPI là dependency ở đây

  useEffect(() => {
    if (!id) return;

    // Ngắt observer cũ ngay khi đổi tab
    if (observer.current) {
      observer.current.disconnect();
      observer.current = null;
    }

    // Reset toàn bộ
    setPath([]);
    lastMyIDVideo.current = 0;
    setHasMore(true);

    // Gọi API load lần đầu
    fetchVideos();
  }, [id, myVideoAPI,fetchVideos]);

  //c myVideoAPI thay đổi thì gọi lại hàm fetchVideos

  const observer = useRef();

  const lastMy_Video = useCallback(
    (node) => {
      if (!node) return;
      if (observer.current) observer.current.disconnect(); // cleanup

      // Tạo observer mới cho phần tử mới cuối
      const newObserver = new IntersectionObserver((entries) => {

        if (entries[0].isIntersecting && hasMore) {
          // khi phần tử cuối cùng xuất hiện trong viewport và còn dữ liệu để load

          fetchVideos();
        }
      });

      newObserver.observe(node);
      observer.current = newObserver;
    },
    [hasMore, fetchVideos]
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
            <button
              onClick={() => {
                alert("Đăng xuất thành công");
                localStorage.clear(); // khi đăng xuất thì xóa id người dùng
                navigate("/video"); // Chuyển hướng về trang video sau khi đăng xuất
              }}
            >
              {" "}
              {isMobile && <LogoutIcon fontSize="small" />}
            </button>
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
        <span
          onClick={() => {
            dispatch({ type: setActive, index: 0 });
            setMyVideoAPI("myvideo");
          }}
          style={{
            color: state[0],
          }}
        >
          Video
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            color: state[1],
          }}
          onClick={() => {
            dispatch({ type: setActive, index: 1 });
            setMyVideoAPI("videoBookmark"); // khi click vào nút đã thích thì sẽ chuyển sang api likevideo để lấy video đã thích
          }}
        >
          Yêu thích
          <BookmarkIcon sx={{ fontSize: 18 }} />
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            color: state[2],
          }}
          onClick={() => {
            dispatch({ type: setActive, index: 2 });
            setMyVideoAPI("likeVideo"); // khi click vào nút đã bookmark thì sẽ chuyển sang api bookmarkvideo để lấy video đã bookmark
          }}
        >
          Đã thích
          <FavoriteIcon sx={{ fontSize: 18 }} />
        </span>
      </div>

      <div className={styles.videos}>
        {path.map((video, index) => {
          const isLast = index === path.length - 1;
          return (
            <div
              className={styles.video}
              key={video.id_video}
              ref={isLast ? lastMy_Video : null} // nếu là video cuối cùng thì gán ref để IntersectionObserver  theo dõi
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
