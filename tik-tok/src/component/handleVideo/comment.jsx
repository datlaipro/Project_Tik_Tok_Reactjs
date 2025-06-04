import ActionPattern from "./actionPattern";
import CommentIcon from "@mui/icons-material/Comment";

function Comment() {
  return (
    <div>
      <ActionPattern 
      data={0}>
        <CommentIcon sx={{ fontSize: 30 }} />
      </ActionPattern>
    </div>
  );
}
export default Comment;
