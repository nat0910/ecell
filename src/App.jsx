import { useState } from "react";
import logo from "./logo.svg";
import SakecEcellLogo from "./assets/svg/SakecEcellLogo";
import useWindowDimension from "./hooks/useWindowDimension";
import FormArea from "./formArea";
import SignUp from "./assets/icon/Standup meeting-bro.png";

function App() {
  const [count, setCount] = useState(0);

  const { width, height } = useWindowDimension();

  const styles = {
    width: width < 900 ? 130 : 200,
    height: width < 900 ? 140 : 200,
    fill: "#fff",
    top: 10,
  };

  // console.log(`width=  ${width - 1000}`, "height= " + height);

  // console.log(SignUp);

  const sign_up_conatiner = {};

  return (
    <>
      <ul className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>

      <div
        className="root-container"
        style={{
          height: height,
        }}
      >
        <header
          style={{
            height: width < 900 ? "" : "100%",
          }}
        >
          <SakecEcellLogo {...styles} />

          <div
            style={{
              display: width < 900 ? "none" : "block",
            }}
          >
            <img src={SignUp} alt="" width={500} height={500} />
            {/* <SignUpIllustration /> */}
            <p
              style={{
                display: width < 900 ? "none" : "block",
              }}
            >
              Welcome to Ecell
            </p>
          </div>
        </header>
        <main
          style={{
            height: height,
            width: "100%",
          }}
        >
          <div
            className="container"
            style={{
              borderRadius: width < 900 ? "20px 20px 0 0" : "20px 0 0 20px",
              width: "100%",
              height: "100%",
            }}
          >
            {/* <div className="popup success ">
              <p>You have been register!! 😊</p>
            </div> */}

            <div className="cont-header">
              <h1>Register</h1>
            </div>
            <div className="hr">
              <hr />
            </div>
            <FormArea />
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
