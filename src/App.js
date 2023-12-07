import "./App.css";
import DrawingLines from "./DrawingLines";
import PlaneAndBox from "./PlaneAndBox/PlaneAndBox";
import ThreeBasic from "./ThreeBasic";
import {Routes, Route} from "react-router";
import WinPage from "./PlaneAndBox/WinPage";
import CubeWithEdges from "./CubeWithEdges/CubeWithEdges";
import SphereMesh from "./SphereMesh/SphereMesh";
import Camera from "./LightingAndCameraAnimations";
import Lighting from "./Lighting";

//x-0 y-0 z-5
function App() {
  return (
    <div className="container">
      {/* <DrawingLines /> */}
      <Routes>
        <Route path="/" element={<Camera/>}/>
        {/*<Route path="/win" element={<WinPage />} />*/}
      </Routes>
    </div>
  );
}

export default App;
