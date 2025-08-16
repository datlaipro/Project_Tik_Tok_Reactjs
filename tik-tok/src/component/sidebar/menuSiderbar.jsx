import Search from "./search";
import Home from "./home";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import UploadIcon from "@mui/icons-material/Upload";
import EmailIcon from "@mui/icons-material/Email";
import TelegramIcon from "@mui/icons-material/Telegram";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ProfileMenu from "./menuLogOut";

import LoginAndRegister from "./loginAndRegister";
import { useContext, useState, useReducer, useEffect, useRef } from "react";
import { MyContext } from "../../context/myContext";
import { Modal, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const stateColor = ["none","none","none","none","none","none","none","none"];
const setActive = "SET_ACTIVE";
const API = process.env.REACT_APP_URL_API_PUBLIC;
const LOGGED_IN_KEY = "loggedIn"; // ✅ FIX: key đánh dấu đã login

const reducer = (state, action) => {
  switch (action.type) {
    case setActive:
      return state.map((_, index) => (index === action.index ? "red" : "none"));
    default:
      return state;
  }
};

function Sidebar() {
  const [data, setData] = useState(""); // tên đăng nhập
  const { sharedData } = useContext(MyContext);
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, stateColor);
  const [login, setLogin] = useState(false);           // trạng thái đăng nhập
  const [open, setOpen] = useState(false);             // modal login/register
  const [loading, setLoading] = useState(true);        // chờ xác định trạng thái
  const [anchorEl, setAnchorEl] = useState(null);
  const opens = Boolean(anchorEl);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // ✅ FIX: chỉ hydrate profile nếu đã từng login
  useEffect(() => {
    let ignore = false;
    async function boot() {
      // Chưa có cờ -> không gọi /refresh/*
      if (!localStorage.getItem(LOGGED_IN_KEY)) {
        if (!ignore) {
          setLogin(false);
          setLoading(false);
        }
        return;
      }
      try {
        const res = await axios.get(`${API}/refresh/profile`, {
          withCredentials: true,
        });
        if (ignore) return;
        setData(res?.data?.user?.account || "");
        setLogin(true);
      } catch (err) {
        // refresh fail -> coi như chưa đăng nhập
        localStorage.removeItem(LOGGED_IN_KEY);
        if (!ignore) setLogin(false);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    boot();
    return () => { ignore = true; };
  }, [API]);

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

          if (login) {
            // Đã đăng nhập
            if (sharedData) {
              alert("chưa upload xong video ");
              navigate("/video");
            } else {
              navigate("/upload");
            }
          } else {
            // Chưa đăng nhập -> mở modal + đưa về /video
            handleOpen();
            setTimeout(() => navigate("/video"), 100);
          }
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

      {loading ? null : !login ? (
        <>
          <Home
            icon={<AccountCircleIcon sx={{ fontSize: 30 }} />}
            title="đăng nhập"
            handleClick={() => {
              dispatch({ type: setActive, index: 7 });
              handleOpen();
            }}
            isActive={state[7] === "red"}
          />

          <Modal
            open={open}
            onClose={(event, reason) => {
              if (reason !== "backdropClick") {
                handleClose();
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
              <LoginAndRegister
                onClose={handleClose}
                onLoginSuccess={async () => {
                  // ✅ FIX: đặt cờ đã đăng nhập ngay khi login thành công
                  localStorage.setItem(LOGGED_IN_KEY, "1");
                  setLogin(true);

                  // (không bắt buộc) hydrate lại tên người dùng sau login
                  try {
                    const r = await axios.get(`${API}/refresh/profile`, {
                      withCredentials: true,
                    });
                    setData(r?.data?.user?.account || "");
                  } catch {}

                  handleClose();
                }}
              />
            </Box>
          </Modal>
        </>
      ) : (
        <Home
          icon={<AccountCircleIcon sx={{ fontSize: 30 }} />}
          title={data}
          handleClick={(event) => {
            dispatch({ type: setActive, index: 7 });
            setAnchorEl(event.currentTarget);
          }}
          isActive={state[7] === "red"}
        />
      )}

      <ProfileMenu
        anchorEl={anchorEl}
        open={opens}
        handleClose={(event, reason) => {
          if (reason !== "backdropClick") {
            navigate("/profile");
          }
          setAnchorEl(null);
        }}
        logOut={async () => {
          try {
            await axios.post(
              `${API}/refresh/logout`,
              {},
              { withCredentials: true }
            );
          } catch {}
          // ✅ FIX: chỉ xóa cờ đăng nhập, không clear toàn bộ localStorage
          localStorage.removeItem(LOGGED_IN_KEY);

          setLogin(false);
          setAnchorEl(null);
          navigate("/video");
        }}
      />
    </div>
  );
}

export default Sidebar;
