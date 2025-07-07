import Search from "./search";
import Home from "./home";
import styles from "./styleAlike.module.css";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import UploadIcon from "@mui/icons-material/Upload";
import EmailIcon from "@mui/icons-material/Email";
import TelegramIcon from "@mui/icons-material/Telegram";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Video from "../handleVideo/video";
import Discover from "./discover";
import Friend from "./friend";
import UpLoadVideo from "./uploadVideo";
import Action from "./action";
import Messenger from "./messenger";
import LiveStream from "./liveStream";
import Profile from "./profile";
import AuthForm from "./loginAndRegister";

import { useState, useReducer, useEffect } from "react";
import { Modal, Box } from "@mui/material"; // ✅ Modal & Box từ MUI
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import axios from "axios"; // Thư viện axios để gửi request HTTP
const stateColor = [
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
]; // khởi tạo mảng màu sắc của các nút sidebar
const setActive = "SET_ACTIVE";

const reducer = (state, action) => {
  switch (action.type) {
    case setActive:
      return state.map((_, index) => (index === action.index ? "red" : "none"));
    default:
      return state;
  }
};

function Sidebar() {
  // const [red, setRed] = useState("none"); // sử lí màu sắc của nút đề xuất
  const navigate = useNavigate(); // khởi tạo hook điều hướng
  const [state, dispatch] = useReducer(reducer, stateColor); // sử lí màu sắc của các nút sidebar
  const [login, setLogin] = useState(false); // sử lí trạng thái đăng nhập`]
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(true); // 👈 thêm state loading để tránh lỗi hiển thị trạng thái đăng nhập

  // Khi app khởi động, kiểm tra trạng thái đăng nhập
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/profile", { withCredentials: true })
      .then((res) => {
        console.log("✅ Đã đăng nhập, user:", res.data.user);
        setLogin(true);
        setLoading(false); // ✅ dừng loading sau khi có phản hồi
      })
      .catch((err) => {
        console.log(
          "❌ Chưa đăng nhập hoặc token lỗi:",
          err.response?.data || err.message
        );
        setLogin(false); // vẫn cần đặt lại login false
        setLoading(false); // ✅ dừng loading
      });
  }, []);

  return (
    <div>
      <Search />
      <Home
        icon={<HomeIcon sx={{ fontSize: 30 }} />}
        title="Đề Xuất"
        handleClick={() => {
          dispatch({ type: setActive, index: 0 });
          navigate("/video");
        }}
        isActive={state[0] === "red"}
      />
      <Home
        icon={<ExploreIcon sx={{ fontSize: 30 }} />}
        title="Khám Phá"
        handleClick={() => {
          dispatch({ type: setActive, index: 1 });
          navigate("/discover");
        }}
        isActive={state[1] === "red"}
      />
      <Home
        icon={<PeopleAltIcon sx={{ fontSize: 30 }} />}
        title="Friends"
        handleClick={() => dispatch({ type: setActive, index: 2 })}
        isActive={state[2] === "red"}
      />
      <Home
        icon={<UploadIcon sx={{ fontSize: 30 }} />}
        title="Up Load Video"
        handleClick={() => {
          dispatch({ type: setActive, index: 3 });
          navigate("/upload");
        }}
        isActive={state[3] === "red"}
      />
      <Home
        icon={<EmailIcon sx={{ fontSize: 30 }} />}
        title="Hoạt Động"
        handleClick={() => dispatch({ type: setActive, index: 4 })}
        isActive={state[4] === "red"}
      />
      <Home
        icon={<TelegramIcon sx={{ fontSize: 30 }} />}
        title="Tin Nhắn"
        handleClick={() => dispatch({ type: setActive, index: 5 })}
        isActive={state[5] === "red"}
      />
      <Home
        icon={<LiveTvIcon sx={{ fontSize: 30 }} />}
        title="Live"
        handleClick={() => dispatch({ type: setActive, index: 6 })}
        isActive={state[6] === "red"}
      />

      {loading ? null : login === false ? (// khi load trang xong mới render 
        <>
          <Home
            icon={<AccountCircleIcon sx={{ fontSize: 30 }} />}
            title="đăng nhập"
            handleClick={() => {
              dispatch({ type: setActive, index: 7 });
              handleOpen(); // Kích hoạt hiển thị form Đăng nhập hoăc Đăng ký
            }}
            isActive={state[7] === "red"}
          />
          <Modal // component Modal đăng nhập/ đăng kí từ MUI
            open={open}
            onClose={(event, reason) => {
              if (reason !== "backdropClick") {
                handleClose(); // chỉ đóng nếu không phải do click ra ngoài
              }
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                boxShadow: 24,
                borderRadius: 2,
                p: 4,
                width: 350,
              }}
            >
              <AuthForm
                onClose={handleClose}
                onLoginSuccess={() => setLogin(true)}
              />
            </Box>
          </Modal>
        </>
      ) : (
        <Home
          icon={<AccountCircleIcon sx={{ fontSize: 30 }} />}
          title="Hồ Sơ"
          handleClick={() => {
            dispatch({ type: setActive, index: 7 });
            alert("Bạn đã đăng nhập thành công!"); // Thông báo đăng nhập thành công
          }}
          isActive={state[7] === "red"}
        />
      )}
    </div>
  );
}

export default Sidebar;
