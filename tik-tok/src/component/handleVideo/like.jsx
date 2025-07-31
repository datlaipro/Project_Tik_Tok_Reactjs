import ActionPattern from "./actionPattern";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect, useState, useContext } from "react";
import { MyContext } from "../../context/myContext";

import api from "../../api/api";

function Like({ idVideo, numberLike }) {
  const { red } = useContext(MyContext); // lấy trạng thái màu sắc từ context
  const [quantityLike, setQuantityLike] = useState(numberLike);
  const [color, setColor] = useState("none");
  var id = localStorage.getItem("id");
  var userID = parseInt(id);
  const dataLike = async () => {
    try {
      const res = await api.post("/like", {
        userID, // gửi giá trị mới tính lên sever
        idVideo,
      });
      console.log("Server response:", res.data);
    } catch (err) {
      console.error("Lỗi gửi like:", err);
    }
  };

  return (
    <div>
      <ActionPattern
        parent={() => {
         
            const newColor = color === "none" ? "red" : "none";

            setColor(newColor);
            // Tính giá trị like mới
            const newQuantity =
              newColor === "red" ? quantityLike + 1 : quantityLike - 1;

            setQuantityLike(newQuantity);
            dataLike();
          
        }}
        data={quantityLike}
      >
        <FavoriteIcon sx={{ fontSize: 30, color: color }} />
      </ActionPattern>
    </div>
  );
}
export default Like;
