import BookmarkIcon from "@mui/icons-material/Bookmark";
import ActionPattern from "./actionPattern";
import { useState } from "react";
function Bookmark() {
    const [color, setColor] = useState("none"); 
  return (
    <div>
      <ActionPattern parent={() => {
        setColor(color === "none" ? "yellow" : "none");
      }}
                  data={0}>
        <BookmarkIcon sx={{ fontSize: 30 ,color:color}} />
      </ActionPattern>
    </div>
  );
}
export default Bookmark;
