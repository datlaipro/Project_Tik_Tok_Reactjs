import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RequireLogin({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (!userId) {
      navigate("/video"); //chưa đăng nhập thì không cho truy cập vào đường link nhạy cảm
    }
  }, [navigate]);

  return children;// trả lại component nằm bên trong RequireLogin nếu đã đăng nhập 
}
