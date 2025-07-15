import { Snackbar, Alert, Button } from "@mui/material";
import React, { useState } from "react";

export default function SuccessRegister({ messenger, colors, open, onClose }) {// hiển thị thông báo đăng ký thành công
  // const [open, setOpen] = useState(true);

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={onClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" onClose={onClose} sx={{ width: "100%" }} color={colors}>
          {messenger}

        </Alert>
      </Snackbar>

    </>
  );
}