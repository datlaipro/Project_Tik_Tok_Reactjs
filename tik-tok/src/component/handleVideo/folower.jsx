import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
function Follower() {
  //nút follower
  const [followed, setFollowed] = useState(false);

  return (
    <button
      style={{
        position: "absolute",
        bottom: "-5px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        backgroundColor: "#ff2e63", // hồng tiktok
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: "16px",
        cursor: "pointer",
      }}
      onClick={() => setFollowed((prev) => !prev)}// xử lý sự kiện click để thay đổi trạng thái followed
    >
      {followed ? <DoneIcon sx={{ fontSize: 16 }} /> : "+"}
    </button>
  );
}

export default Follower;
