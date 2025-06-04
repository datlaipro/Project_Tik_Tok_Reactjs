import React from "react";

function Video(children) {
  return (
    <div
      style={{
        position: "absolute",
        top: "4%",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10, // để nó nổi trên
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
      }}
    >
      <video
        width="540"
        height="700"
        controls
        style={{
          scrollSnapAlign: "start",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <source
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          type="video/mp4"
        />
        Trình duyệt của bạn không hỗ trợ video.
      </video>
    {/* {children} */}
    </div>
  );
}

export default Video;
