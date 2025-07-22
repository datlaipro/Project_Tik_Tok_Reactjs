import React, { useState } from "react";

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
  },{
    id: 3,
    avatar: "https://i.pravatar.cc/40?img=3",
    name: "Thúy nhung94",
    content: "tội nghiệp cô dâu chú rể, thấy vậy chứ rầu thùi ruột đó",
  },{
    id: 3,
    avatar: "https://i.pravatar.cc/40?img=3",
    name: "Thúy nhung94",
    content: "tội nghiệp cô dâu chú rể, thấy vậy chứ rầu thùi ruột đó",
  },{
    id: 3,
    avatar: "https://i.pravatar.cc/40?img=3",
    name: "Thúy nhung94",
    content: "tội nghiệp cô dâu chú rể, thấy vậy chứ rầu thùi ruột đó",
  },{
    id: 3,
    avatar: "https://i.pravatar.cc/40?img=3",
    name: "Thúy nhung94",
    content: "tội nghiệp cô dâu chú rể, thấy vậy chứ rầu thùi ruột đó",
  },{
    id: 3,
    avatar: "https://i.pravatar.cc/40?img=3",
    name: "Thúy nhung94",
    content: "tội nghiệp cô dâu chú rể, thấy vậy chứ rầu thùi ruột đó",
  },
];

export default function SimpleComments() {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    const newCmt = {
      id: Date.now(),
      avatar: "https://i.pravatar.cc/40?img=5", // giả avatar người dùng
      name: "Bạn",
      content: newComment.trim(),
    };
    setComments([newCmt, ...comments]);
    setNewComment("");
  };

  return (
    <div
      style={{ width: 250, fontFamily: "Arial, sans-serif", marginRight: -280 }}
    >
      <h3>Bình luận ({comments.length})</h3>
      <div
        style={{
          maxHeight: 400,
          overflowY: "auto",
          border: "1px solid #eee",
          borderRadius: 8,
          padding: 8,
        }}
      >
        {comments.map(({ id, avatar, name, content }) => (
          <div
            key={id}
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

      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <input
          type="text"
          placeholder="Thêm bình luận..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          style={{
            flexGrow: 1,
            padding: 8,
            borderRadius: 4,
            border: "1px solid #ccc",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddComment();
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
