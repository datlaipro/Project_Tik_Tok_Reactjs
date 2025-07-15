import { useState, useRef, useEffect } from "react";
import axios from "axios";
import UploadIcon from "@mui/icons-material/Upload";
import styles from "./styleAlike.module.css"; // CSS module riêng
import api from "../../api/api";
function UpLoadVideo() {
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!previewURL) return;
    return () => URL.revokeObjectURL(previewURL);
  }, [previewURL]);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreviewURL(URL.createObjectURL(f));
  };

  const handleUpload = async () => {
    if (!file) return alert("Bạn chưa chọn file!");
    const formData = new FormData();
    formData.append("video", file);
    formData.append("visibility", visibility);

    try {
      setLoading(true);
      await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      alert("Upload thành công!");
      setFile(null);
      setPreviewURL("");
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (err) {
      console.error("Lỗi khi upload:", err);
      alert("Upload thất bại");
    } finally {
      setLoading(false);
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
        accept="image/*,video/*"
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
      >
        {loading ? "Đang đăng..." : "Đăng"}
      </button>
    </div>
  );
}

export default UpLoadVideo;
