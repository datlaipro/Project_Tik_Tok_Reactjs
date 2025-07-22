import ActionPattern from "./actionPattern";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect, useState } from "react";
import api from "../../api/api";

function Like({ idVideo,numberLike }) {
  const [quantityLike, setQuantityLike] = useState(0);
  const [color, setColor] = useState("none");

  const dataLike = async (newQuantity) => {
    try {
      const res = await api.post("/like", {
        quantityLike: newQuantity, // gửi giá trị mới tính lên sever
        idVideo,
      });
      // console.log("Server response:", res.data);
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
          
          dataLike(newQuantity);
        }}
        data={numberLike+quantityLike}
      >
        <FavoriteIcon sx={{ fontSize: 30, color: color }} />
      </ActionPattern>
    </div>
  );
}
export default Like;
