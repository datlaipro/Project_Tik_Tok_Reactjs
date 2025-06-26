import { useState } from "react";
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

export default function AuthForm({ onClose }) {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [formData, setFormData] = useState({
    username: "",
    email: "",
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
        email: formData.email,
        password: formData.password,
      });
      onClose();
    } else {
      console.log("Đăng ký với:", formData);
      onClose();
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
          {mode === "register" && (
            <TextField
              fullWidth
              margin="normal"
              label="Tên người dùng"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          )}

          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
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
        </Box>
      </Paper>
    </Box>
  );
}
