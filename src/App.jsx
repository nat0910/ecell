import { useState } from "react";
import "./css/style.css";
import useWindow from "./hooks/useWindow";
import FormArea from "./components/FormArea";
import projectPillarLogo from "./assets/svg/Project-Pillar-Logo.svg";
import ecellSakecLogo from "./assets/svg/Ecell-Sakec-Logo.svg";

function App() {
  const [count, setCount] = useState(0);

  const { height, width } = useWindow();

  return (
    <div
      className="base-container"
      style={{
        // backgroundImage: `url(${background})`,
        height: height,
        width: width,
      }}
    >
      <div
        className="container"
        style={{
          width: width < 900 ? width : "60%",
          height: width < 900 ? "auto" : "87.5%",
          // paddingBottom: width < 900 ? "250px" : "",
        }}
      >
        <div className="header">
          <div className="logo-area">
            <div className="logo">
              <img
                src={ecellSakecLogo}
                alt="Ecell-Sakec-Logo"
                width="100%"
                height="100%"
              />
            </div>
            <div className="logo">
              <img
                src={projectPillarLogo}
                alt="Project-Pillar-Logo"
                width="100%"
                height="100%"
              />
            </div>
          </div>
          <h1>project pillar Registration form </h1>
        </div>

        <FormArea height={height} width={width} />
      </div>
    </div>
  );
}

export default App;
