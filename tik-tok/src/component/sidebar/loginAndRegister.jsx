import { useState, useRef } from "react";
import SuccessRegister from "../Notification/loginSuccess"; // Import thông báo đăng ký thành công
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

export default function LoginAndRegister({ onClose, onLoginSuccess }) {
  // component xử lý đăng nhập và đăng ký tài khoản
  const [errorMessage, setErrorMessage] = useState(""); // Thêm state để lưu thông báo lỗi hoặc thành công
  const [colors, setColors] = useState("success"); // Thêm state để quản lý màu sắc của Alert
  const [openSnackbar, setOpenSnackbar] = useState(false); // Thêm state để quản lý việc hiển thị Snackbar

  const [mode, setMode] = useState("login"); // "login" | "register"
  const [formData, setFormData] = useState({
    username: "",
    // email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "login") {
      // Gọi API đăng nhập user ở đây
      const login = async () => {
        try {
          await axios.post(
            "http://localhost:4000/api/login",
            {
              account: formData.username,
              password: formData.password,
            },
            {
              withCredentials: true, // ✅ Đặt ở đây (object thứ 3) để gủi cookie kèm theo request và trình duyệt sẽ tự động lưu cookie này
            }
          );
          setColors("success"); // Đặt màu sắc cho Alert
          setOpenSnackbar(true); // 👈 Hiển thị thông báo sau khi đăng nhập thành công
          setErrorMessage("Đăng nhập tài khoản thành công! "); // hiển thị thông báo đăng nhập thành công

          onLoginSuccess(); //  Đây là chỗ  báo ra ngoài trạng thái đăng nhập
          // ❗ Đóng modal sau 2.5 giây để có thời gian hiển thị Snackbar
          setTimeout(() => {
            setOpenSnackbar(false); // Đóng Snackbar
            onClose(); // Đóng modal sau khi đăng nhập thành công
          }, 2000);
        } catch (error) {
          setErrorMessage(error.response.data.message); // hiển thị thông báo lỗi đăng nhập
          setColors("warning"); // Đặt màu sắc cho Alert
          setOpenSnackbar(true);
        }
      };
      login();
    } else {
      // Gọi API đăng ký account user ở đây
      const register = async () => {
        try {
          await axios.post("http://localhost:4000/api/createUser", {
            account: formData.username, // gửi tên tài khoản lên server
            password: formData.password, // gửi mật khẩu lên server
          });

          setColors("success"); // Đặt màu sắc cho Alert
          setOpenSnackbar(true); // 👈 Hiển thị thông báo sau khi đăng ký thành công
          // console.log("Phản hồi từ server:", response.data.name); // lấy ra tên tài khoản đã đăng ký
          setErrorMessage("Đăng ký tài khoản thành công! "); // Lưu tên tài khoản vào messageErr
          // ❗ Đóng modal sau 2.5 giây để có thời gian hiển thị Snackbar
          setTimeout(() => {
            setOpenSnackbar(false); // Đóng Snackbar
            onClose();
          }, 2000);
        } catch (error) {
          // console.error("Lỗi đăng ký:", error.response?.data || error.message);
          setErrorMessage(error.response.data.message); // Lưu tên tài khoản vào messageErr
          setColors("warning"); // Đặt màu sắc cho Alert
          setOpenSnackbar(true);
        }
      };
      register();
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f0f2f5"
    >
      <Paper
        elevation={3}
        sx={{ padding: 4, width: 350, position: "relative", borderRadius: 2 }}
      >
        {/* ❌ Nút đóng modal */}
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        <Tabs
          value={mode === "login" ? 0 : 1}
          onChange={(_, value) => setMode(value === 0 ? "login" : "register")}
          centered
        >
          <Tab label="Đăng nhập" />
          <Tab label="Đăng ký" />
        </Tabs>

        <Box component="form" mt={2} onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Tên người dùng"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            label="Mật khẩu"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            {mode === "login" ? "Đăng nhập" : "Đăng ký"}
          </Button>
          <Typography variant="body2" align="center" mt={2}>
            {mode === "login"
              ? "Chưa có tài khoản? Chọn tab Đăng ký bên trên."
              : "Đã có tài khoản? Chọn tab Đăng nhập bên trên."}
          </Typography>

          {
            <SuccessRegister
              messenger={errorMessage}
              colors={colors}
              open={openSnackbar}
              onClose={() => setOpenSnackbar(false)}
            />
          }

          {/* 👈 Render nếu state là true */}
        </Box>
      </Paper>
    </Box>
  );
}
