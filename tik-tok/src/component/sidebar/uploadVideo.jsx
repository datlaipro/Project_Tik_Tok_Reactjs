import { useState, useRef, useEffect } from "react";
import UploadIcon from "@mui/icons-material/Upload";
import styles from "./styleAlike.module.css"; // CSS module riêng
import api from "../../api/api";
import { useContext } from "react";

import { MyContext } from "../../context/myContext";
function UpLoadVideo() {
  const { setSharedData } = useContext(MyContext); // trạng thái thông báo upload video
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(""); // quản lý URL tạm thời để xem trước video
  const [visibility, setVisibility] = useState("public");
  const [arrFiles, setArrFiles] = useState([]); // danh sách các file thực tế  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  // const [disabled, setDisabled] = useState(false);
  const inputRef = useRef(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!previewURL) return;

    return () => URL.revokeObjectURL(previewURL);
  }, [previewURL]);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    const preview = URL.createObjectURL(f); // tạo URL tạm cho preview

    // Kiểm tra thời lượng video
    const video = document.createElement("video");
    video.preload = "metadata";
    video.src = preview;

    video.onloadedmetadata = () => {
      const duration = video.duration; // thời lượng tính bằng giây

      if (duration > 600) {
        alert("Video quá dài! Chỉ chấp nhận video dưới 10 phút.");
        setMessage("none");
        return; // dừng luôn
      }

      // Kiểm tra trùng file
      const isDuplicate = arrFiles.some(
        (file) =>
          file.name === f.name &&
          file.size === f.size &&
          file.lastModified === f.lastModified
      );
      if (isDuplicate) {
        alert("Bạn phải thay đổi video mới thì mới được đăng!");
        setMessage("none");
        setPreviewURL(preview);
        return;
      }

      // Lưu file và URL preview
      setFile(f);
      setPreviewURL(preview);
      setMessage("block");
    };
  };
  useEffect(() => {
  return () => {
    if (previewURL) {
      URL.revokeObjectURL(previewURL); // chỉ revoke khi đổi video hoặc unmount
    }
  };
}, [previewURL]);


  const handleUpload = async () => {
    if (!file) return alert("Bạn chưa chọn file!");
    const formData = new FormData();
    formData.append("video", file);
    formData.append("visibility", visibility);

    try {
      setLoading(true);
      setSharedData(true); // nếu chưa upload xong thì không cho upload tiếp
      await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // gọi đến API upload video từ api.js
      alert("Upload thành công!");

      setArrFiles((prev) => [...prev, file]); // thêm url video do người dùng đã upload để so sánh tránh up trùng video
      setFile(null); // reset file sau khi upload
      setPreviewURL("");
      if (inputRef.current) {
        // tránh lỗi giao diện khi upload xong (khi render lại thì sẽ lỗi err nếu không có dk này )
        inputRef.current.value = "";
      }
    } catch (err) {
      console.error("Lỗi khi upload:", err);
      alert("Upload thất bại");
    } finally {
      setLoading(false);
      setSharedData(false); // nếu upload xong rồi thì mới cho upload tiếp
    }
  };

  return (
    <div className={styles.uploadWrapper}>
      <button
        className={styles.pickBtn}
        onClick={() => inputRef.current.click()}
      >
        <UploadIcon sx={{ fontSize: 18, verticalAlign: "middle" }} /> Tải ảnh
        hoặc video lên
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {file && (
        <div className={styles.previewBox}>
          {file.type.startsWith("image/") ? (
            <img src={previewURL} alt="preview" />
          ) : (
            <video src={previewURL} controls />
          )}
        </div>
      )}

      <label htmlFor="visibility" className={styles.label}>
        Ai có thể xem video này
      </label>
      <select
        id="visibility"
        value={visibility}
        onChange={(e) => setVisibility(e.target.value)}
        className={styles.select}
      >
        <option value="public">Mọi người</option>
        <option value="friends">Bạn bè (follower bạn follow lại)</option>
        <option value="private">Chỉ mình bạn</option>
      </select>

      <button
        className={styles.btnPost}
        onClick={handleUpload}
        disabled={loading}
        style={{ display: message }}
      >
        {loading ? "Đang đăng..." : "Đăng"}
      </button>
    </div>
  );
}

export default UpLoadVideo;
