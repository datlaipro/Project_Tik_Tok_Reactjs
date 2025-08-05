import AccountUser from "../handleVideo/accountUser";
import Bookmark from "../handleVideo/bookmar";
import Comment from "../handleVideo/comment";
import Like from "../handleVideo/like";
import Share from "../handleVideo/share";
import Video from "../handleVideo/video";
import { useContext, useState, useEffect } from "react";
import BackgroundMusic from "../handleVideo/backgroundMusic";
import { MyContext } from "../../context/myContext";
function SidebarAction({
  dataLike,
  numberLike,
  isTablet,
  isMobile,
  isDesktop,
  numberComment,
  numberBookmark
}) {
  
  return (
    <div>
      <section
        style={{
          position: isDesktop ? "static" : "absolute",
          // tách biệt độc lập so với thẻ cha
          bottom: isMobile || isTablet ? "80px" : "20px", // ✅ thấp hơn trên mobile
          right: isMobile ? "20px" : isTablet ? "80px" : "420px", // ✅ Sát phải trên mobile, giữ nguyên desktop
          marginTop: "300px", // 👈 đẩy xuống cuối cột
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isMobile ? "15px" : "10px",
          zIndex: 900, // ✅ rất cao để nằm trên video
          pointerEvents: "auto", // ✅ đảm bảo có thể click
          transition: "right 0.3s ease", // ✅ mượt hơn khi dịch chuyển
        }}
      >
        <AccountUser />
        <Like idVideo={dataLike} numberLike={numberLike} />
        <Comment idVideo={dataLike} numberComment={numberComment}/>
        <Share />
        <Bookmark idVideo={dataLike} numberBookmark={numberBookmark}/>
        {/* <BackgroundMusic /> */}
      </section>
    </div>
  );
}
export default SidebarAction;
