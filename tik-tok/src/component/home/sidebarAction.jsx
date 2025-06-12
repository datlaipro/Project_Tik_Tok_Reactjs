import AccountUser from "../handleVideo/accountUser";
import Bookmark from "../handleVideo/bookmar";
import Comment from "../handleVideo/comment";
import Like from "../handleVideo/like";
import Share from "../handleVideo/share";
import Video from "../handleVideo/video";
import BackgroundMusic from "../handleVideo/backgroundMusic";
function SidebarAction() {
  return (
    <div>
      <section
        style={{
          position: "absolute",
          bottom: "20px",
          right: "420px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
          zIndex: 9999, // ✅ rất cao để nằm trên video
          pointerEvents: "auto", // ✅ đảm bảo có thể click
        }}
      >
        <AccountUser />
        <Like />
        <Comment />
        <Share />
        <Bookmark />
        <BackgroundMusic />
      </section>
      
    </div>
  );
}
export default SidebarAction;
