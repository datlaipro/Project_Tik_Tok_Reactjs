import Search from "./search";
import Home from "./home";
import styles from "./styleAlike.module.css";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import UploadIcon from "@mui/icons-material/Upload";
import EmailIcon from "@mui/icons-material/Email";
import TelegramIcon from "@mui/icons-material/Telegram";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Discover from "./discover";
import Friend from "./friend";
import UpLoadVideo from "./uploadVideo";
import Action from "./action";
import Messenger from "./messenger";
import LiveStream from "./liveStream";
import Profile from "./profile";
import { useState } from "react";

function Sidebar() {
  const [red, setRed] = useState("none"); // sử lí màu sắc của nút đề xuất
  return (
    <div>
      <Search />
      <Home icon={<HomeIcon sx={{ fontSize: 30 }} />} title="Đề Xuất"
      
       handleClick={()=>
        setRed("red") // khi click vào nút đề xuất thì sẽ chuyển sang màu đỏ
      }
       color={{ color: red } /* truyền vào prop color để thay đổi màu sắc của nút đề xuất */}
       />;

      <Home
        className={styles.changeTop} // style căn chỉnh các menu sidebar sang trái
        icon={<ExploreIcon sx={{ fontSize: 30 }} />}
        title="Khám Phá"
        color={{ color: red }}
      />
      <Home icon={<PeopleAltIcon sx={{ fontSize: 30 }} />} title="Friends" />;
      <Home
        icon={<UploadIcon sx={{ fontSize: 30 }} />}
        title="Up Load Video"
        className={styles.changeTop}
      />
      ;
      <Home
        icon={<EmailIcon sx={{ fontSize: 30 }} />}
        title="Hoạt Động"
        className={styles.changeTop}
      />
      ;
      <Home
        icon={<TelegramIcon sx={{ fontSize: 30 }} />}
        title="Tin Nhắn"
        className={styles.changeTop}
      />
      ;
      <Home
        icon={<LiveTvIcon sx={{ fontSize: 30 }} />}
        title="Live"
        className={styles.changeTop}
      />
      ;
      <Home
        icon={<AccountCircleIcon sx={{ fontSize: 30 }} />}
        title="Hồ Sơ"
        className={styles.changeTop}
      />
      ;
    </div>
  );
}

export default Sidebar;
