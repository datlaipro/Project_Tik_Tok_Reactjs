import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "../../context/myContext";

const initialComments = [
  {
    id: 1,
    avatar: "https://i.pravatar.cc/40?img=1",
    name: "Lúc Lắc",
    content: "đây là đám cưới của con bạn t với nyc",
  },
  {
    id: 2,
    avatar: "https://i.pravatar.cc/40?img=2",
    name: "Hữu Hào",
    content: "Mời ông thần gió tới ăn đám cưới 🥳",
  },
  {
    id: 3,
    avatar: "https://i.pravatar.cc/40?img=3",
    name: "Thúy nhung94",
    content: "tội nghiệp cô dâu chú rể, thấy vậy chứ rầu thùi ruột đó",
  },
];

export default function SimpleComments({close}) {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { setShowComments } = useContext(MyContext);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    const newCmt = {
      id: Date.now(),
      avatar: "https://i.pravatar.cc/40?img=5",
      name: "Bạn",
      content: newComment.trim(),
    };
    setComments([newCmt, ...comments]);
    setNewComment("");
  };

  return (
    <div
      style={{
        position: "fixed",
        top: isMobile ? "auto" : 0,
        bottom: isMobile ? 0 : "auto",
        right: 0,
        width: isMobile ? "100%" : 350,
        height: isMobile ? "80vh" : "100vh", // ✅ chiều cao rõ ràng
        background: "#fff",
        boxShadow: isMobile
          ? "0 -2px 8px rgba(0,0,0,0.15)"
          : "-2px 0 8px rgba(0,0,0,0.2)",
        zIndex: 9999,
        borderTopLeftRadius: isMobile ? 12 : 0,
        borderTopRightRadius: isMobile ? 12 : 0,
        transition: "all 0.3s ease-in-out",
        display: "flex", // ✅ Flex layout
        flexDirection: "column",
      }}
    >
      {/* Header */}

      <h3
        style={{
          padding: 8,
          borderBottom: "1px solid #eee",
          margin: 0,
          fontSize: 16,
        }}
      >
        Bình luận ({comments.length})
        <span style={{ float: "right" }}>
          <button
            onClick={() => {
              close()
              setShowComments(false); // giúp khung video trở lại vị trí ban đầu 
            }}
          >
            x
          </button>
        </span>
      </h3>

      {/* Danh sách bình luận */}
      <div
        style={{
          flexGrow: 1,
          overflowY: "scroll",
          padding: 8,
          overscrollBehavior: "contain", // ✅ Ngăn scroll lan sang video
          WebkitOverflowScrolling: "touch", // ✅ Mượt mà trên iOS
        }}
      >
        {comments.map(({ id, avatar, name, content }) => (
          <div
            key={id + content}
            style={{
              display: "flex",
              gap: 8,
              padding: "8px 0",
              borderBottom: "1px solid #ddd",
              alignItems: "center",
            }}
          >
            <img
              src={avatar}
              alt={name}
              style={{ width: 40, height: 40, borderRadius: "50%" }}
            />
            <div>
              <strong>{name}</strong>
              <p style={{ margin: "4px 0" }}>{content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input thêm bình luận */}
      <div
        style={{
          padding: 8,
          borderTop: "1px solid #ddd",
          display: "flex",
          gap: 8,
          background: "#fff",
          overscrollBehavior: "contain", // ✅ Ngăn chảy cuộn ra ngoài
          touchAction: "pan-y", // ✅ Hỗ trợ cuộn dọc trên mobile
          WebkitOverflowScrolling: "touch", // ✅ iOS mượt
        }}
      >
        <input
          type="text"
          placeholder="Thêm bình luận..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddComment();
          }}
          style={{
            flexGrow: 1,
            padding: 8,
            borderRadius: 4,
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleAddComment}
          style={{
            backgroundColor: "#fe2c55",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Đăng
        </button>
      </div>
    </div>
  );
}
