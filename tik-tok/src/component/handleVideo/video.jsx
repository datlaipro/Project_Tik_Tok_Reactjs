import React, { useRef, useState, useEffect } from "react";
import SidebarAction from "../home/sidebarAction";
import SuccessRegister from "../Notification/loginSuccess"; // Import thông báo đăng ký thành công
import AuthForm from "../sidebar/loginAndRegister"; // Import form đăng nhập/đăng ký

const videos = [
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
];

function Video() {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef([]); // danh sách ref của từng video block

  const scrollToIndex = (index) => {
    // xử lý cuộn đến video theo index
    const videoEl = videoRefs.current[index];
    if (videoEl) {
      videoEl.scrollIntoView({ behavior: "smooth" });
      setCurrentIndex(index);
    }
  };

  const handleScrollUp = () => {
    scrollToIndex(currentIndex - 1);
  };

  const handleScrollDown = () => {
    scrollToIndex(currentIndex + 1);
  };

  useEffect(() => {
    // xử lý Intersection Observer để tự động play/pause video khi cuộn
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting) // kiểm tra video có đang hiển thị hay không
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        // Tự động play/pause
        videoRefs.current.forEach((el, idx) => {
          // duyệt qua từng thẻ video
          if (!el) return;
          const videoTag = el.querySelector("video");
          if (!videoTag) return;

          const isVisible = visible.find(
            (entry) => Number(entry.target.dataset.index) === idx
          );

          if (isVisible) {
            videoTag.play().catch(() => {});
          } else {
            videoTag.pause();
          }
        });

        // Cập nhật index đang hiển thị
        if (visible.length > 0) {
          const index = Number(visible[0].target.dataset.index);
          setCurrentIndex(index);
        }
      },
      {
        threshold: 0.6,
      }
    );

    videoRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
 
  return (
    <div
      ref={containerRef}
      style={{
        height: "100vh",
        overflowY: "scroll",
        overflowX: "hidden",
        scrollSnapType: "y mandatory",
      }}
    >
      

      {videos.map((src, index) => (
        <div
          key={index}
          data-index={index}
          ref={(el) => (videoRefs.current[index] = el)}
          style={{
            height: "100vh",
            width: "100vw",
            scrollSnapAlign: "start",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          {/* Video + sidebar */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              maxWidth: "720px",
              padding: "0 20px",
              boxSizing: "border-box",
            }}
          >
            <video
              src={src}
              width="540"
              height="700"
              controls
              style={{
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
              }}
            />
            <div
              style={{
                marginLeft: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                alignItems: "center",
              }}
            >
              <SidebarAction />
            </div>
          </div>

          {/* Nút cuộn lên/xuống */}
          <div
            style={{
              position: "absolute",
              right: "20px",
              top: "45%",
              zIndex: 999,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <button
              onClick={handleScrollUp}
              style={{
                display: "block",
                backgroundColor: "rgba(255,0,0,0.1)",
                color: "black",
                fontSize: "20px",
                padding: "10px",
                border: "1px solid black",
                borderRadius: "50%",
                zIndex: 9999,
              }}
            >
              ⬆️
            </button>

            <button
              onClick={handleScrollDown}
              disabled={currentIndex === videos.length - 1}
              style={{
                backgroundColor: "rgba(255,0,0,0.1)",
                fontSize: "20px",
                padding: "10px",
                border: "1px solid black",
                borderRadius: "50%",
              }}
            >
              ⬇️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Video;
