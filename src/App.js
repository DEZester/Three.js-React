import "./App.css";
import DrawingLines from "./DrawingLines";
import PlaneAndBox from "./PlaneAndBox/PlaneAndBox";
import ThreeBasic from "./ThreeBasic";
import { Routes, Route } from "react-router";
import WinPage from "./PlaneAndBox/WinPage";
import CubeWithEdges from "./CubeWithEdges/CubeWithEdges";
import SmoothCameraAnimation from "./SmoothCameraAnimation/SmoothCameraAnimation";

//x-0 y-0 z-5
function App() {
  return (
    <div className="container">
      {/* <DrawingLines /> */}
      <Routes>
        <Route path="/" element={<SmoothCameraAnimation />} />
        <Route path="/win" element={<WinPage />} />
      </Routes>
    </div>
  );
}

export default App;
