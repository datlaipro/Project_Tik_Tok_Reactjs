import ActionPattern from "./actionPattern";
import CommentIcon from "@mui/icons-material/Comment";
import SimpleComments from "./commentDetails";
import { useState } from "react";
function Comment() {
  const [display, setDisplay] = useState(false);
  return (
    <div>
      <ActionPattern parent={() => {
        setDisplay(true)
      }} data={0}>
        <CommentIcon sx={{ fontSize: 30 }} />
        {display && <SimpleComments />}
      </ActionPattern>
    </div>
  );
}
export default Comment;
