import { Snackbar, Alert, Button } from "@mui/material";
import React, { useState } from "react";

export default function SuccessRegister() {// hiển thị thông báo đăng ký thành công
  const [open, setOpen] = useState(true);

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setOpen(false)} sx={{ width: "100%" }}>
          Đăng ký tài khoản thành công!
        </Alert>
      </Snackbar>

    </>
  );
}