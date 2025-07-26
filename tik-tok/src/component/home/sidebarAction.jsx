import AccountUser from "../handleVideo/accountUser";
import Bookmark from "../handleVideo/bookmar";
import Comment from "../handleVideo/comment";
import Like from "../handleVideo/like";
import Share from "../handleVideo/share";
import Video from "../handleVideo/video";
import { useContext, useState, useEffect } from "react";
import BackgroundMusic from "../handleVideo/backgroundMusic";
import { MyContext } from "../../context/myContext";
function SidebarAction({ dataLike, numberLike }) {
  const { showComments } = useContext(MyContext);

  // ✅ Responsive
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div>
      <section
        style={{
          position: "absolute",
          bottom: isMobile ? "10px" : "20px", // ✅ thấp hơn trên mobile
          right: isMobile?"20":"420",

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isMobile ? "15px" : "10px",
          zIndex: 9999, // ✅ rất cao để nằm trên video
          pointerEvents: "auto", // ✅ đảm bảo có thể click
          transition: "right 0.3s ease", // ✅ mượt hơn khi dịch chuyển
        }}
      >
        <AccountUser />
        <Like idVideo={dataLike} numberLike={numberLike} />
        <Comment />
        <Share />
        <Bookmark />
        <BackgroundMusic />
      </section>
    </div>
  );
}
export default SidebarAction;
