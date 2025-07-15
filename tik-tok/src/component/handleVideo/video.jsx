import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import SidebarAction from "../home/sidebarAction";

function Video() {
  const [path, setPath] = useState([]);

  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef([]); // Mảng để lưu trữ các phần tử video DOM

  /* ============ I. FETCH VIDEO MỘT LẦN ============ */ // NEW
  useEffect(() => {
    const controller = new AbortController(); // Tạo controller để hủy yêu cầu bất đồng bộ khi component unmount

    axios
      .get("http://localhost:4000/api/requestVideo", {
        signal: controller.signal, // Thêm signal để hủy yêu cầu bất đồng bộ nếu cần
      })
      .then((res) => {
        const videoUrls = res.data.path.map((i) => i.path); // chuyển đổi kết quả là obj từ api trả về thành mảng đường dẫn video
        setPath(videoUrls);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) console.error("Lỗi khi lấy video:", err);
      });

    return () => controller.abort(); // Hủy yêu cầu khi component unmount
  }, []); // ← KHÔNG có path

  /* ============ II. SETUP OBSERVER KHI ĐÃ CÓ path ============ */ // NEW
  useEffect(() => {
    if (path.length === 0) return;

    const observer = new IntersectionObserver( // obj của trình duyệt để theo dõi các phần tử video
      (entries) => {
        const visible = entries // Lọc các video đang hiển thị
          .filter((e) => e.isIntersecting) // isIntersecting là true nếu video đang hiển thị trong viewport
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio); // Sắp xếp theo tỷ lệ hiển thị (độ lớn của phần tử trong viewport)
        // Nếu có nhiều video hiển thị, chọn video có tỷ lệ hiển thị lớn nhất(có tác dụng trong trường hợp chuyển đổi giữa các video vì lúc đó đang có 2 video hiển thị )

        videoRefs.current.forEach((el, idx) => {
          // duyệt qua từng video để phát hoặc tạm dừng
          // el là phần tử DOM của video, idx là chỉ số của video trong mảng path

          if (!el) return; // Nếu không có el thì bỏ qua
          const videoTag = el.querySelector("video");
          if (!videoTag) return;

          const isVisible = visible.find(
            (v) => Number(v.target.dataset.index) === idx // Kiểm tra xem video này có trong danh sách visible không
          );

          isVisible ? videoTag.play().catch(() => {}) : videoTag.pause();
        });

        if (visible.length > 0) {
          const idx = Number(visible[0].target.dataset.index); // Lấy chỉ số của video đang hiển thị nhiều nhất
          setCurrentIndex(idx);
        }
      },
      { threshold: 0.6 } // có nghĩa là video sẽ được coi là hiển thị khi 60%(threshold: 0.6 ) diện tích của nó nằm trong viewport
    );

    videoRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect(); // Ngắt kết nối observer khi component unmount
  }, [path]); // chạy đúng 1 lần sau khi đã có danh sách video

  /* ---------- Hàm cuộn ---------- */
  const scrollToIndex = (idx) => {
    const el = videoRefs.current[idx]; // Lấy phần tử video theo chỉ số idx
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setCurrentIndex(idx);
    }
  };
  const handleScrollUp = () => scrollToIndex(currentIndex - 1);
  const handleScrollDown = () => scrollToIndex(currentIndex + 1);

  /* ---------- UI ---------- */
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
      {path.map((src, index) => (
        <div
          key={index}
          data-index={index} // Dùng để xác định chỉ số của video trong mảng path
          ref={(el) => (videoRefs.current[index] = el)} // Lưu phần tử DOM của video vào mảng videoRefs
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
              onError={() => {
                handleScrollDown();
                // setCurrentIndex(currentIndex);
              }} // Nếu video không thể tải được thì tự động cuộn xuống video tiếp theo
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
                marginLeft: 20,
                display: "flex",
                flexDirection: "column",
                gap: 15,
                alignItems: "center",
              }}
            >
              <SidebarAction />
            </div>
          </div>
        </div>
      ))}

      {/* === NÚT CUỘN GIỮ NGUYÊN === */}
      <div
        style={{
          position: "fixed",
          right: 20,
          top: "45%",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          zIndex: 9999,
        }}
      >
        <button
          onClick={handleScrollUp}
          disabled={currentIndex === -1} // khi loại video đầu tiên thì không cho cuộn lên nữa
          style={btnStyle}
        >
          ⬆️
        </button>
        <button
          onClick={handleScrollDown}
          disabled={currentIndex === path.length } // khi loai video cuối cùng thì không cho cuộn xuống nữa
          style={btnStyle}
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
