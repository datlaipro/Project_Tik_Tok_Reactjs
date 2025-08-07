import BookmarkIcon from "@mui/icons-material/Bookmark";
import ActionPattern from "./actionPattern";
import { useState } from "react";
import api from "../../api/api";// 

function Bookmark({idVideo,numberBookmark}) {
   const [quantityBookmark, setQuantityBookmark] = useState(numberBookmark);
  const [color, setColor] = useState("");
  var id = localStorage.getItem("id");// lấy id người dùng từ localStorage
  var userID = parseInt(id);
  const addBookmark = async () => {
    try {
      const res = await api.post("/addBookmark", {
        userID, // gửi giá trị mới tính lên sever
        idVideo,
      });
      console.log("Server response:", res.data);
    } catch (err) {
      console.error("Lỗi gửi bookmark:", err);
    }
  };
  return (
    <div>
      <ActionPattern parent={() => {
         const newColor = color === "" ? "yellow" : "";

            setColor(newColor);
            // Tính giá trị bookmark mới
            const newQuantity =
              newColor === "yellow" ? quantityBookmark + 1 : quantityBookmark - 1;

            setQuantityBookmark(newQuantity);
            addBookmark();

      }}
                  data={quantityBookmark}>
        <BookmarkIcon sx={{ fontSize: 30 ,color:color}} />
      </ActionPattern>
    </div>
  );
}
export default Bookmark;
