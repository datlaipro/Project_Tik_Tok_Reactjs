import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import { MyContext } from "../../context/myContext";
import api from "../../api/api";

export default function SimpleComments({ close, idVideo }) {
  const lastCommentIdRef = useRef(null); // ✅ lưu id bình luận cuối
  const commentTimestamps = useRef([]); // theo dõi thời điểm comment
  const isBlockedRef = useRef(false);
  const blockUntilRef = useRef(null);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { setShowComments } = useContext(MyContext);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth > 768 && window.innerWidth <= 1024
  );
  const MAX_COMMENTS = 20;
  const TIME_WINDOW_MS = 10 * 1000; // 10 giây

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
    };

    handleResize(); // Gọi khi lần đầu
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  var id = localStorage.getItem("id");
  var userID = parseInt(id);
  var account = localStorage.getItem("username");
  var username = account;
  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    const now = Date.now();

    // ⛔ Kiểm tra có đang bị chặn không
    if (isBlockedRef.current && now < blockUntilRef.current) {
      const secondsLeft = Math.ceil((blockUntilRef.current - now) / 1000);
      alert(`⛔ Bạn đang bị chặn. Vui lòng thử lại sau ${secondsLeft} giây.`);
      return;
    }

    // ✅ Nếu hết thời gian chặn, mở khóa lại
    if (isBlockedRef.current && now >= blockUntilRef.current) {
      isBlockedRef.current = false;
      commentTimestamps.current = [];
    }

    // Lọc các comment trong 10 giây gần nhất
    commentTimestamps.current = commentTimestamps.current.filter(
      //
      (timestamp) => now - timestamp < TIME_WINDOW_MS
    );

    if (commentTimestamps.current.length >= MAX_COMMENTS) {
      // 🚫 Bắt đầu chặn trong 2 phút
      isBlockedRef.current = true;
      blockUntilRef.current = now + 2 * 60 * 1000; // 2 phút = 120000ms
      alert("⛔️ Bạn đã gửi quá nhiều bình luận. Vui lòng thử lại sau 2 phút.");
      return;
    }

    commentTimestamps.current.push(now);

    try {
      const res = await api.post("/postcomment", {
        userID,
        idVideo,
        comments: newComment.trim(),
      });

      const newCmt = {
        avatar: "https://i.pravatar.cc/40?img=5",
        name: username,
        content: newComment.trim(),
      };

      setComments((prev) => [newCmt, ...prev]);
      setNewComment("");
    } catch (err) {
      console.error("❌ Lỗi khi gửi comment:", err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await api.get(
        `/getcomments?idVideo=${idVideo}&lastId=${
          lastCommentIdRef.current || 0
        }`
      );
      const newComments = res.data.comments;
      if (newComments.length > 0) {
        // ✅ Cập nhật lastCommentIdRef với id cuối cùng trong danh sách mới
        lastCommentIdRef.current = newComments[newComments.length - 1].id;

        // ✅ Nối thêm bình luận mới vào mảng cũ, không ghi đè
        setComments((prev) => [...prev, ...newComments]);
      }
    } catch (err) {
      console.error("❌ Lỗi khi tải thêm comment:", err);
    }
  };
  useEffect(() => {
    fetchComments();
  }, [idVideo]);

  const observer = useRef();

  const lastCommentRef = useCallback((node) => {
    // khởi tạo rồi gán lastCommentRef cho bình luận cuối cùng
    if (observer.current) observer.current.disconnect(); // đảm bảo comment thứ 10 được quan sát trước đó rồi thì lần tới sẽ bỏ và quan sát comment thứ 20

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // true nếu phần tử được quan sát nằm trong viewport
        fetchComments(); // ✅ gọi load thêm
      }
    });

    if (node) observer.current.observe(node); // nếu tải đến comment thứ 10 thì bắt đầu quan sát(chạy đoạn mã lastCommentRef)
  }, []);

  useEffect(() => {}, [comments]);

  return (
    <div
      style={{
        position: "fixed",
        top: isMobile || isTablet ? "auto" : 0, // đảm bảo khung bình luận ở dưới màn hình
        bottom: isMobile || isTablet ? 0 : "auto",
        right: 0,
        width: isMobile || isTablet ? "100%" : 350, // nếu khung bình luận ở dưới màn hình thì chiếm toàn bộ chiều ngang màn hình
        height: isMobile || isTablet ? "40vh" : "100vh", // ✅ chiều cao khi ở trên mobile
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
              close();
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
        {comments.map(({ id, avatar, account, content }, index) => {
          const isLast = index === comments.length - 1;
          return (
            <div
              key={id + content}
              ref={isLast ? lastCommentRef : null} // nếu đang ở bình luận thứ 10 thì gọi thêm bình luận ra
              style={{
                display: "flex",
                gap: 8,
                padding: "8px 0",
                borderBottom: "1px solid #ddd",
                alignItems: "center",
              }}
            >
              <img
                src={"https://i.pravatar.cc/300?img=6"}
                alt={""}
                style={{ width: 40, height: 40, borderRadius: "50%" }}
              />
              <div>
                <strong>{account}</strong>
                <p style={{ margin: "4px 0" }}>{content}</p>
              </div>
            </div>
          );
        })}
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
