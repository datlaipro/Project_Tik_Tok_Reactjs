import ActionPattern from "./actionPattern";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
function Like() {
    const [color, setColor] = useState("none");
  return (
    <div>
      <ActionPattern parent={()=>{
        setColor(color === "none" ? "red" : "none");
      }}
      data={0}>
        <FavoriteIcon sx={{ fontSize: 30,color: color }} />
        
      </ActionPattern>
    </div>
  );
}

export default Like;
