import ShareIcon from "@mui/icons-material/Share";
import ActionPattern from "./actionPattern";
function Share() {
  return (
    <div>
      <ActionPattern
      data={0}>
        <ShareIcon sx={{ fontSize: 30 }} />
      </ActionPattern>
    </div>
  );
}
export default Share;
