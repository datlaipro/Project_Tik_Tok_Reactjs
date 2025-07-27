import React, { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import SidebarAction from "../home/sidebarAction";
import { MyContext } from "../../context/myContext";
function Video() {
  const [path, setPath] = useState([]); // lưu danh sách video để hiển thị ra giao diện
  const [lastId, setLastId] = useState(0); // lưu vị trí video cuối để lần sau gọi api từ video tiếp theo trong db
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // ✅ Chống gọi liên tục
  const containerRef = useRef(null);
  const videoRefs = useRef({}); // ✅ Sửa thành object thay vì array
  const [currentId, setCurrentId] = useState(null); // ✅ Lưu id_video thay vì index
  const { showComments } = useContext(MyContext); // nhận use id từ component menuSiderbar
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.overflowY = showComments ? "hidden" : "scroll";
    }
  }, [showComments]);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);

    // ✅ Thêm CSS ẩn thanh cuộn vào <head>
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
      .hide-scrollbar {
        scrollbar-width: none;           /* Firefox */
        -ms-overflow-style: none;        /* IE 10+ */
      }
      .hide-scrollbar::-webkit-scrollbar {
        display: none;                   /* Chrome, Safari */
      }
    `;
    document.head.appendChild(styleTag);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.head.removeChild(styleTag);
    };
  }, []);

  // ✅ Responsive: check nếu là màn hình nhỏ
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth > 768 && window.innerWidth <= 1024
  );
  const [isDesktop, setIsDesktop] = useState(true); // mặc định là desktop

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
      setIsDesktop(width > 1300);
    };

    handleResize(); // Gọi khi lần đầu
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Gọi API để lấy video
  const fetchVideos = async () => {
    if (isLoading) return; // Tránh gọi chồng nếu gọi api xong thì mới cho gọi tiếp
    setIsLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:4000/api/requestVideo?lastId=${lastId}`
      );

      const videos = res.data.path; // ✅ Đúng định dạng từ backend

      if (!Array.isArray(videos) || videos.length === 0) {
        // nếu backend không trả về dữ liệu thì thôi không gọi api nữa
        setHasMore(false);
        return;
      }

      setPath((prev) => {
        const newVideos = videos.filter(
          (v) => !prev.some((p) => p.id_video === v.id_video) // ✅ tránh trùng video theo id_video
        );
        return [...prev, ...newVideos];
      });

      setLastId(videos[videos.length - 1].id_video); // cập nhật id của video cuối để load thêm video
    } catch (err) {
      console.error("Lỗi khi lấy video:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos(); // Lần đầu load
  }, []);

  // Quan sát video để play/pause + auto load thêm
  useEffect(() => {
    if (path.length === 0) return;

    const observer = new IntersectionObserver( // obj của trình duyệt để theo dõi các phần tử video
      (entries) => {
        const visible = entries // Lọc các video đang hiển thị
          .filter((e) => e.isIntersecting) // isIntersecting là true nếu video đang hiển thị trong viewport
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio); // Sắp xếp theo tỷ lệ hiển thị (độ lớn của phần tử trong viewport)
        // Nếu có nhiều video hiển thị, chọn video có tỷ lệ hiển thị lớn nhất(có tác dụng trong trường hợp chuyển đổi giữa các video vì lúc đó đang có 2 video hiển thị )

        Object.values(videoRefs.current).forEach((el) => {
          if (!el) return;
          const videoTag = el.querySelector("video");
          if (!videoTag) return;
          const isVisible = visible.find(
            (v) => Number(v.target.dataset.index) === Number(el.dataset.index) // so sánh id_video
          );
          isVisible ? videoTag.play().catch(() => {}) : videoTag.pause();
          // console.log("visible", isVisible);
        });
        if (visible.length > 0) {
          const id = Number(visible[0].target.dataset.index); // Lấy id_video của video đang hiển thị nhiều nhất
          setCurrentId(id);
          // ✅ Tự động load thêm video
          const currentIndex = path.findIndex((v) => v.id_video === id);
          if (currentIndex >= path.length - 2 && hasMore) {
            fetchVideos();
          }
        }
      },

      {
        threshold: 0.6,
        root: containerRef.current, // ✅ quan sát chính vùng cuộn của container để hoạt động chính xác trên thiết bị tablet
      }
    );

    Object.values(videoRefs.current).forEach(
      (el) => el && observer.observe(el)
    );
    return () => observer.disconnect(); // Ngắt kết nối observer khi component unmount
  }, [path]);

  const scrollToIndex = (idVideo) => {
    const el = videoRefs.current[idVideo]; // lấy ra thẻ video đang hiển thị
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setCurrentId(idVideo);
    }
  };

  const handleScrollUp = () => {
    const idx = path.findIndex((v) => v.id_video === currentId);
    if (idx > 0) {
      const prevId = path[idx - 1].id_video;
      scrollToIndex(prevId);
    }
  };

  const handleScrollDown = () => {
    const idx = path.findIndex((v) => v.id_video === currentId);
    if (idx < path.length - 1) {
      const nextId = path[idx + 1].id_video;
      scrollToIndex(nextId);
    }
  };
  return (
    <div
      ref={containerRef}
      className={isMobile || isTablet ? "hide-scrollbar" : ""}
      style={{
        height: "100vh",
        overflowY: "scroll",
        overflowX: "hidden",
        scrollSnapType: "y mandatory",
      }}
    >
      <div
        style={{
          width: showComments && !isMobile ? "calc(100vw - 350px)" : "100vw",
          transition: "width 0.3s ease",
          marginRight: showComments && !isMobile ? "auto" : "0",
        }}
      >
        {path.map((src) => (
          <div
            key={src.id_video}
            data-index={src.id_video}
            ref={(el) => {
              if (el) videoRefs.current[src.id_video] = el;
            }}
            style={{
              height: "100vh",
              width: "100vw",
              scrollSnapAlign: "start",
              display: "flex",
              justifyContent: showComments ? "flex-start" : "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                justifyContent: isMobile ? "flex-start" : "center",
                alignItems: isMobile ? "flex-start" : "center",
                minWidth: isMobile ? "100%" : isTablet ? 1100 : 1300,
                height: "100vh",
                padding: isMobile ? "10px" : isTablet ? "0 15px" : "0 20px",
                boxSizing: "border-box",
                gap: isMobile ? 10 : isTablet ? 15 : 20,
              }}
            >
              <video
                onError={handleScrollDown}
                src={src.path}
                width={isMobile || isTablet ? "100%" : 540}
                height={isMobile || isTablet ? "100vh" : 700}
                controls
                style={{
                  width: isMobile || isTablet ? "100vw" : 540,
                  height: isMobile || isTablet ? "100dvh" : 900, // Dùng dvh để an toàn trên mobile browser
                  maxHeight: "100dvh",
                  borderRadius: isMobile || isTablet ? 0 : "12px",
                  boxShadow:
                    isMobile || isTablet
                      ? "none"
                      : "0 4px 20px rgba(0, 0, 0, 0.2)",
                  maxWidth: "100%",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: isMobile ? 10 : 15,
                  alignItems: "center",
                }}
              >
                <SidebarAction
                  dataLike={src.id_video}
                  numberLike={src.likes}
                  isTablet={isTablet}
                  isMobile={isMobile}
                  isDesktop={isDesktop}
                  showComments={showComments} // 👈 thêm dòng này
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          position: "fixed",
          right: showComments && !isMobile ? 370 : 20,
          top: "45%",
          display: isMobile || isTablet ? "none" : "flex",
          flexDirection: "column",
          gap: 10,
          zIndex: 9999,
        }}
      >
        <button
          onClick={handleScrollUp}
          disabled={path.findIndex((v) => v.id_video === currentId) <= -1}
          style={{
            ...btnStyle,
            padding: isMobile ? 8 : 10,
            fontSize: isMobile ? 16 : 20,
          }}
        >
          ⬆️
        </button>
        <button
          onClick={handleScrollDown}
          disabled={
            path.findIndex((v) => v.id_video === currentId) >= path.length - 1
          }
          style={{
            ...btnStyle,
            padding: isMobile ? 8 : 10,
            fontSize: isMobile ? 16 : 20,
          }}
        >
          ⬇️
        </button>
      </div>
    </div>
  );
}

const btnStyle = {
  background: "rgba(255,0,0,0.1)",
  border: "1px solid black",
  borderRadius: "50%",
  fontSize: 20,
  padding: 10,
  cursor: "pointer",
};

export default Video;
