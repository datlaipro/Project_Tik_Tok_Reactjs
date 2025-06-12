import Home from "./home";
import UploadIcon from "@mui/icons-material/Upload";
import { useState, useRef } from "react";

function UpLoadVideo() {
  const [file, setFile] = useState(null);
  const inputRef = useRef();

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    console.log("File được chọn:", selectedFile);
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <div>
      <button onClick={handleClick}>
        <UploadIcon style={{ verticalAlign: "middle" }} /> Tải ảnh hoặc video lên
      </button>

      <input
        type="file"
        accept="image/*,video/*"
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
