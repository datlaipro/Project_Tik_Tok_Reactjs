import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // icon hồ sơ
import AddBoxIcon from "@mui/icons-material/AddBox"; // icon upload trên mobile của tiktok
import Home from "./homeMobile"; // khuân mẫu của siderbar
import HomeIcon from "@mui/icons-material/Home";
import TelegramIcon from "@mui/icons-material/Telegram";
import ExploreIcon from "@mui/icons-material/Explore";
import "./mobileCSS/mobileSidebar.css";
import { useContext } from "react";
import { MyContext } from ".././context/myContext";
import { Modal, Box } from "@mui/material"; // ✅ Modal & Box từ MUI
import LoginAndRegister from "../component/sidebar/loginAndRegister";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { useState, useReducer, useEffect } from "react";
const login = localStorage.getItem("id");
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

function MobileSiderbar() {
  const [open, setOpen] = useState(false); // sử lí trạng thái mở modal đăng nhập/ đăng kí
  const handleOpen = () => setOpen(true);
  const navigate = useNavigate(); // khởi tạo hook điều hướng
  const [state, dispatch] = useReducer(reducer, stateColor); // sử lí màu sắc của các nút sidebar
  const { sharedData } = useContext(MyContext); // lưu giữ trạng thái upload video (đã upload/ chưa upload )
  const handleClose = () => setOpen(false);

  return (
    <div className="mobile-sidebar-wrapper">
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
          navigate("/video");
        }}
        isActive={state[1] === "red"}
      />
      <Home
        icon={<AddBoxIcon sx={{ fontSize: 30 }} />}
        handleClick={() => {
          dispatch({ type: setActive, index: 3 });

          // verifyLogin(); // kiểm tra đăng nhập
          if (login) {
            // nếu chưa đăng nhập thì mở yêu cầu đăng nhập mới cho upload video
            navigate("/upload");
          } else {
            handleOpen();
            setTimeout(() => navigate("/video"), 100); // delay 100ms để tránh xung đột để đảm bảo chạy handleOpen song song với navigate
          }
          // nếu đã đăng nhập thì chuyển đến trang upload, nếu chưa thì mở modal đăng nhập
          if (sharedData) {
            alert("chưa upload xong video ");
            navigate("/video");
          } else {
            navigate("/upload");
          }
        }}
        isActive={state[2] === "red"}
      />
      <Modal
        open={open}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleClose();
          }
        }}
        disableEnforceFocus // ✅ Cho phép focus và bấm bên trong (fix đặc biệt cho mobile)
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1400,
        }}
      >
        <Box
          sx={{
            width: "90vw",
            maxWidth: 400,
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
            position: "relative", // ✅ để nút ✕ nằm được trong
          }}
        >
          <LoginAndRegister onClose={handleClose} />
          {/* Modal đăng nhập/đăng ký */}
        </Box>
      </Modal>

      <Home
        icon={<TelegramIcon sx={{ fontSize: 30 }} />}
        title={"tin nhắn"}
        handleClick={() => {
          dispatch({ type: setActive, index: 3 });
          navigate("/video");
        }}
        isActive={state[3] === "red"}
      />
      <Home
        icon={<AccountCircleIcon sx={{ fontSize: 30 }} />}
        title={"hồ sơ"}
        handleClick={() => {
          dispatch({ type: setActive, index: 4 });
          if (login) {// nếu đã đăng nhập thì chuyển đến trang profile
            navigate("/profile");
          } else {
            handleOpen(); // Kích hoạt hiển thị form Đăng nhập hoăc Đăng ký
            setTimeout(() => navigate("/video"), 100); // delay 100ms để tránh xung đột để đảm bảo chạy handleOpen song song với navigate
          }
        }}
        isActive={state[4] === "red"}
      />
    </div>
  );
}
export default MobileSiderbar;
