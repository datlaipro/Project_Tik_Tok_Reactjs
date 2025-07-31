import './App.css';
import Sidebar from './component/sidebar/menuSiderbar';
import Discover from './component/sidebar/discover';
import Video from './component/handleVideo/video';
import UpLoadVideo from './component/sidebar/uploadVideo';
import { Routes, Route } from 'react-router-dom';
import Profile from './component/sidebar/profile';
import { useState, useEffect } from 'react';
import { MyContext } from './context/myContext';
import RequireLogin from './component/auth/RequireLogin';
import MobileSiderbar from './mobile/siderbarMobile';
function App() {

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true); // mặc định là desktop
  const [red,setRed]=useState(false);// trạng thái để quản lí màu sắc của nút tim

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
      setIsDesktop(width > 1300);
    };

    handleResize(); // Khởi tạo khi load lần đầu
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const [sharedData, setSharedData] = useState(false);// quản lí trạng thái upload video (đã upload/chưa upload)
  const [showComments, setShowComments] = useState(false)
  return (
    <MyContext.Provider value={{ sharedData, setSharedData, showComments, setShowComments,isMobile, setIsMobile,red,setRed }}>
      <div className="App">
        {isMobile ? (
          // 📱 Giao diện Mobile
          <>
            <MobileSiderbar />
            <Routes>

              <Route path="/upload" element={<RequireLogin>{/* Chặn /upload nếu chưa đăng nhập */}
                <UpLoadVideo />
              </RequireLogin>} />
              <Route path="/" element={<Video />} />
              <Route path="/video" element={<Video />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/profile" element={<RequireLogin>{/* Chặn /xem profile nếu chưa đăng nhập */}
                <Profile />
              </RequireLogin>} />
            </Routes>
          </>
        ) : isTablet ? ( // 📱 Giao diện Tablet
          <>
          <MobileSiderbar />
          <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
            <div style={{
              width: "60px", flexShrink: 0, zIndex: 2,
              marginTop: "300px", // ✅ Đẩy Sidebar xuống 50px trên tablet
              transition: "margin-top 0.3s ease", // ✅ Mượt hơn khi resize
            }}>
              {/* <Sidebar /> */}
            </div>
            <div style={{ flex: 1, overflowY: "scroll", position: "relative" }}>
              <Routes>
                <Route path="/upload" element={<RequireLogin>{/* Chặn /upload nếu chưa đăng nhập */}
                  <UpLoadVideo />
                </RequireLogin>} />
                <Route path="/" element={<Video />} />
                <Route path="/video" element={<Video />} />
                <Route path="/discover" element={<Discover />} />
                <Route path="/profile" element={<RequireLogin>{/* Chặn /xem profile nếu chưa đăng nhập */}
                  <Profile />
                </RequireLogin>} />
              </Routes>
            </div>
          </div>
          </>
        ) : isDesktop ? (
          // 🖥 Giao diện Desktop
          <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
            <div style={{
              width: "80px", flexShrink: 0, zIndex: 2,

            }}>
              <Sidebar />
            </div>
            <div style={{ flex: 1, overflowY: "scroll", position: "relative" }}>
              <Routes>
                <Route path="/upload" element={<RequireLogin>{/* Chặn /upload nếu chưa đăng nhập */}
                  <UpLoadVideo />
                </RequireLogin>} />
                <Route path="/" element={<Video />} />
                <Route path="/video" element={<Video />} />
                <Route path="/discover" element={<Discover />} />
                <Route path="/profile" element={<RequireLogin>{/* Chặn /xem profile nếu chưa đăng nhập */}
                  <Profile />
                </RequireLogin>} />
              </Routes>
            </div>
          </div>
        ) : (
          // 🖥 Giao diện Desktop
          <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
            <div style={{
              width: "80px", flexShrink: 0, zIndex: 2,
              // marginTop: "200px", // ✅ Đẩy Sidebar xuống 50px trên tablet
              // transition: "margin-top 0.3s ease", // ✅ Mượt hơn khi resize
            }}>
              <Sidebar />
            </div>
            <div style={{ flex: 1, overflowY: "scroll", position: "relative" }}>
              <Routes>
                <Route path="/upload" element={<RequireLogin>
                  <UpLoadVideo />
                </RequireLogin>} />
                <Route path="/" element={<Video />} />
                <Route path="/video" element={<Video />} />
                <Route path="/discover" element={<Discover />} />
                <Route path="/profile" element={<RequireLogin>{/* Chặn /xem profile nếu chưa đăng nhập */}
                  <Profile />
                </RequireLogin>} />
              </Routes>
            </div>
          </div>
        )}
      </div>
    </MyContext.Provider >
  );

}

export default App;
