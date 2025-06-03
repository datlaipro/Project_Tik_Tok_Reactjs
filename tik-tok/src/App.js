import './App.css';
import Sidebar from './component/sidebar/menuSiderbar';
import Discover from './component/sidebar/discover';
import Video from './component/handleVideo/video';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App" >
      <Sidebar />

      {/* phần bên phải thay đổi theo route */}
      <div >
        <Routes>
          <Route path="/" element={<Video />} />
          <Route path="/discover" element={<Discover/>} />
          {/* có thể thêm các route khác tại đây */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
