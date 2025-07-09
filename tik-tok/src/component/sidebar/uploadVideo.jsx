import Home from "./home";
import UploadIcon from "@mui/icons-material/Upload";
import { useState, useRef } from "react";
import axios from "axios";
function UpLoadVideo() {
  const [file, setFile] = useState(null);
  const inputRef = useRef();

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    // console.log("File được chọn:", selectedFile);
  };

  const handleClick = async () => {
    // Mở hộp thoại chọn file
    inputRef.current.click();
    if (!file) return alert("Chưa chọn file!");

    const formData = new FormData();
    formData.append("video", file); // tên "video" phải trùng với backend: upload.single('video')

    try {
      const res = await axios.post(
        "http://localhost:4000/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      alert("Upload thành công!");
      console.log("URL từ Cloudinary:", res.data.url);
    } catch (err) {
      console.error("Lỗi upload:", err);
      alert("Upload thất bại");
    }
  };

  return (
    <div>
      <button onClick={handleClick}>
        <UploadIcon style={{ verticalAlign: "middle" }} /> Tải ảnh hoặc video
        lên
      </button>

      <input
        type="file"
        accept="video/*"
        ref={inputRef}
        onChange={handleChange}
        style={{ display: "none" }}
      />

      {file && (
        <div style={{ marginTop: "10px" }}>
          {file.type.startsWith("image/") ? (
            <img
              src={URL.createObjectURL(file)}
              alt="Ảnh đã chọn"
              style={{ maxWidth: "200px" }}
            />
          ) : file.type.startsWith("video/") ? (
            <video
              controls
              src={URL.createObjectURL(file)}
              style={{ maxWidth: "300px" }}
            />
          ) : (
            <p>File không phải ảnh hoặc video.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default UpLoadVideo;
