import AccountUser from "../handleVideo/accountUser";
import Bookmark from "../handleVideo/bookmar";
import Comment from "../handleVideo/comment";
import Like from "../handleVideo/like";
import Share from "../handleVideo/share";
import Video from "../handleVideo/video";
import BackgroundMusic from "../handleVideo/backgroundMusic";
function SidebarAction() {
  return (
    <section
      style={{
        position: "absolute",
        bottom: "20px",
        right: "420px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <AccountUser />
      <Like />
      <Comment />
      <Share />
      <Bookmark />
      <BackgroundMusic />
      
    </section>
  );
}
export default SidebarAction;
