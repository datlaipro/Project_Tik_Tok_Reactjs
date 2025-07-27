import ActionPattern from "./actionPattern";
import CommentIcon from "@mui/icons-material/Comment";
import SimpleComments from "./commentDetails";
import { MyContext } from "../../context/myContext";
import { useState, useContext, useEffect } from "react";

function Comment() {
  useEffect(() => {
    // đóng hộp comment khi nhấn esc
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setShowComments(false);
        setDisplay(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const { setShowComments } = useContext(MyContext);

  const [display, setDisplay] = useState(false);

  const close = () => {
    setDisplay(false); //đóng
    //  hộp comment
    setShowComments(false);
  };
  return (
    <div>
      <ActionPattern
        parent={() => {
          setDisplay(true); //mở hộp comment
          setShowComments(true); // giúp khung video trở lại vị trí ban đầu
        }}
        data={0}
      >
        <CommentIcon sx={{ fontSize: 30 }} />
        {display && <SimpleComments close={close} />}
      </ActionPattern>
    </div>
  );
}
export default Comment;
