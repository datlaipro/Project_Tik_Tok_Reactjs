import { useState } from "react";
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

export default function AuthForm({ onClose,onLoginSuccess  }) {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [showSuccess, setShowSuccess] = useState(false); // 👈 Thêm state để hiển thị thông báo
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
      console.log("Đăng nhập với:", {
        password: formData.password,
      });
      onClose();
    } else {
      // console.log("Đăng ký với:", formData);
      // Gọi API đăng ký account user ở đây
      const register = async () => {
        try {
          const response = await axios.post(
            "http://localhost:4000/api/createUser",
            {
              account: formData.username,
              password: formData.password,
            }
          );

          console.log("Phản hồi từ server:", response.data.name);// lấy ra tên tài khoản đã đăng ký
          setShowSuccess(true);; // 👈 Hiển thị thông báo sau khi đăng ký thành công
          // ❗ Đóng modal sau 2.5 giây để có thời gian hiển thị Snackbar
          setTimeout(() => {
            setShowSuccess(false);
            onClose();
          }, 2000);
        } catch (error) {
          console.error("Lỗi đăng ký:", error.response?.data || error.message);
        }
      };
      register();
      // Sau khi đăng ký thành công, có thể reset form hoặc đóng modal
    }
    // {showSuccess && <SuccessRegister />}
    // onClose(); // Đóng modal sau khi đăng ký
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
          {/* <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          /> */}
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
          {showSuccess && <SuccessRegister />}
          {/* 👈 Render nếu state là true */}
        </Box>
      </Paper>
    </Box>
  );
}
