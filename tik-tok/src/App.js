import './App.css';
import Sidebar from './component/sidebar/menuSiderbar';
import Discover from './component/sidebar/discover';
import Video from './component/handleVideo/video';
import UpLoadVideo from './component/sidebar/uploadVideo';
import { Routes, Route } from 'react-router-dom';
import Profile from './component/sidebar/profile';
import { useState } from 'react';
import { MyContext } from './context/myContext';
import SidebarAction from './component/home/sidebarAction';
function App() {
 
  const [sharedData, setSharedData] = useState(false);
  return (
    <MyContext.Provider value={{ sharedData, setSharedData }}>
      <div className="App">
        <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
          {/* Sidebar trái */}
          <div style={{ width: "80px", flexShrink: 0, zIndex: 2 }}>
            <Sidebar />
          </div>

          {/* Phần giữa: hiển thị nội dung route */}
          <div style={{ flex: 1, overflowY: "scroll", position: "relative" }}>
            <Routes>
              <Route path="/upload" element={<UpLoadVideo />} />
              <Route path="/" element={<Video />} />
              <Route path="/video" element={<Video />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </div>
      </div>
    </MyContext.Provider>
  );
}

export default App;
