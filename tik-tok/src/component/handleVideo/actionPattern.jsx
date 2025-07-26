import React from "react";

// function ActionPattern({ children,parent,data }) {
//   // khuôn mẫu hành động hình tròn (like, comment, share)
//   return (
//     <div>
//     <button
//       style={{
//         position: "relative",
//         width: "50px",
//         height: "50px",
//         backgroundColor: "#e0e0e0", // xám nhẹ
//         borderRadius: "50%",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         border: "none", // loại bỏ viền mặc định
//         padding: 0, // loại bỏ khoảng cách mặc định
//         cursor: "pointer", // hiển thị con trỏ tay
//         outline: "none", // loại bỏ viền focus mặc định
//       }}
//       onClick={parent}
//     >
//       {children}
      
//     </button>
//      <span style={{ marginTop: "4px", fontWeight: "bold", fontSize: "14px", color: "#333" }}>
//         {data}
//       </span>
//     </div>
//   );
// }
// export default ActionPattern;
function ActionPattern({ children, parent, data }) {
  return (
    <div>
      <button
        style={{
          position: "relative",
          width: "50px",
          height: "50px",
          backgroundColor: "#e0e0e0",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          padding: 0,
          cursor: "pointer",
          outline: "none",
        }}
        onClick={parent}
      >
        {/* Icon bên trong button */}
        {React.Children.toArray(children)[0]}
      </button>

      <span style={{ marginTop: "4px", fontWeight: "bold", fontSize: "14px", color: "#333" }}>
        {data}
      </span>

      {/* Component phức tạp bên ngoài button */}
      {React.Children.toArray(children)[1]}
    </div>
  );
}
export default ActionPattern;
