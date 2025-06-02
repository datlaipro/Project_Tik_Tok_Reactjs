import logo from './logo.svg';
import './App.css';
import Sidebar from './component/sidebar/menuSiderbar';
import Video from './component/handleVideo/video';
function App() {
  return (
    <div className="App">
      <Sidebar />
     <Video />
    </div>
  );
}

export default App;
