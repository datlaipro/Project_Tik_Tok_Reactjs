import ActionPattern from "./actionPattern";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
function Like() {
    const [color, setColor] = useState("none");
  return (
    <div>
      <ActionPattern parent={()=>{
        setColor(color === "none" ? "red" : "none");
        // if
        //     (color === "none") {
        //   alert("You liked this video");

        // }else{
        //   alert("You unliked this video");
        // }
      }}
      data={0}>
        <FavoriteIcon sx={{ fontSize: 30,color: color }} />
        
      </ActionPattern>
    </div>
  );
}

export default Like;
