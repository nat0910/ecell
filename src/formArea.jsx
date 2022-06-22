import axios from "axios";
import { useState, useEffect } from "react";
import { v4 } from "uuid";
import Correct from "./assets/icon/correct.png";
import Failed from "./assets/icon/failed.png";
import PasswordValidity from "./components/PasswordValidity";
import useWindowDimension from "./hooks/useWindowDimension";
import ReCAPTCHA from "react-google-recaptcha";
 
const InitialState = {
  name: "",
  lname: "",
  rollno: "",
  div: "",
  phone: "",
  email: "",
  password: "",
  cnfpassword: "",
};

const InitialFocused = {
  password: false,
  cnfpassword: false,
  email: false,
};
const isNumberRegx = /\d/;
const specialCharacterRegx = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

const regex = new RegExp(
  "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@sakec.ac.in"
);

export default function FormArea() {
  const [person, setPerson] = useState(InitialState);

  // Focused state

  const [isFocused, setisFocused] = useState(InitialFocused);

  // Password Validity check parameters

  const [passwordValidity, setPasswordValidity] = useState({
    minChar: null,
    number: null,
    specialChar: null,
  });

  const { width, height } = useWindowDimension();

  // Email address , Password & Confirm Password are valid or not.

  const [isvalidPassword, setIsValidPassword] = useState(false);
  const [isvalidCnf, setIsvalidCnf] = useState(false);
  const [isvalidEmail, setisvalidEmail] = useState(false);
  const [isHuman, setIsHuman] = useState(false);

  function btnIsDisable() {
    if (
      isHuman &&
      person.name != "" &&
      person.lname != "" &&
      person.rollno != "" &&
      person.div != "" &&
      person.phone != "" &&
      isvalidEmail &&
      isvalidPassword &&
      isvalidCnf
    ) {
      return false;
    }
    return true;
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log("submmitted");
    if (
      isHuman &&
      person.name &&
      person.lname &&
      person.rollno &&
      person.div &&
      person.phone &&
      isvalidEmail &&
      isvalidPassword &&
      isvalidCnf
    ) {
      let id = v4();
      // console.log(id);
      let newPerson = { ...person};
      console.log(newPerson);
      fetch(
        "https://13luceihu1.execute-api.ap-south-1.amazonaws.com/dev/ecell/register",
        {
          method: "POST",
          headers: {
            //REMEMBER THIS PASS THIS
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPerson),
        }
      ).then((res) => console.log(res));
      setPerson(InitialState);
      setIsvalidCnf(false);
      setisFocused(InitialFocused);
    }
  }
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPerson({ ...person, [name]: value });
  };

  const onChangePassword = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPerson({ ...person, [name]: value });
    setPasswordValidity({
      minChar: password.length >= 8 ? true : false,
      number: isNumberRegx.test(password) ? true : false,
      specialChar: specialCharacterRegx.test(password) ? true : false,
    });
  };

  const onChangCnf = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPerson({ ...person, [name]: value });

    if (person.password == e.target.value) {
      // console.log("its true");
      setIsvalidCnf(true);
    } else {
      setIsvalidCnf(false);
    }
  };

  const onChangeEmail = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    let result = regex.test(e.target.value);

    if (result) {
      setisvalidEmail(true);
    } else {
      setisvalidEmail(false);
    }

    setPerson({ ...person, [name]: value });
  };

  function onChange(value) {
    console.log("Captcha value:", value);
    setPerson({ ...person, token: value });
    setIsHuman(true)
  }
   

  // console.log("password valid :", isvalidPassword);
  // console.log(person);
  // console.log("focuseState : ", isFocused);

  return (
    <>
      <form method="post">
        <div className="form-control">
          <div className="name-area">
            <div className="input-group">
              <input
                type="text"
                name="name"
                id="name"
                className="input"
                value={person.name}
                onChange={handleChange}
                required
                placeholder="eg. John"
              />
              <label htmlFor="name" className="input-label">
                first name
              </label>
            </div>

            <div className="input-group">
              <input
                type="text"
                name="lname"
                id="lname"
                className="input"
                value={person.lname}
                onChange={handleChange}
                required
                placeholder="eg. Smith"
              />
              <label htmlFor="lname" className="input-label">
                last name
              </label>
            </div>
          </div>

          {/* First Name & Last Name */}

          <div className="name-area">
            <div className="input-group">
              <input
                type="text"
                name="div"
                id="div"
                className="input"
                value={person.div}
                onChange={handleChange}
                required
                placeholder="eg. BE-1"
              />
              <label htmlFor="div" className="input-label">
                Div
              </label>
            </div>

            <div className="input-group">
              <input
                type="text"
                name="rollno"
                id=" rollno"
                className="input"
                value={person.rollno}
                onChange={handleChange}
                required
                placeholder="eg. 04 or 35"
              />
              <label htmlFor=" rollno" className="input-label">
                Roll No
              </label>
            </div>
          </div>

          {/* email */}

          <div className="input-group">
            <input
              type="text"
              name="email"
              id="email"
              className="input email "
              value={person.email}
              onChange={onChangeEmail}
              required
              placeholder="eg. example@sakec.ac.in"
              onFocus={() => {
                setisFocused({ ...isFocused, email: true });
              }}
            />
            <label htmlFor="email" className="input-label">
              email address
            </label>

            {isFocused.email && (
              <img
                src={isvalidEmail ? Correct : Failed}
                alt=""
                width={20}
                height={20}
                style={{
                  position: "absolute",
                  top: 12.5,
                  right: width < 900 ? 10 : -30,
                }}
              />
            )}

            {isFocused.email && (
              <div
                className="email-validity"
                style={{
                  fontSize: "1em",
                  marginTop: "2.5%",
                }}
              >
                <p
                  className="text-danger"
                  style={{
                    display: isvalidEmail ? "none" : "block",
                  }}
                >
                  Please use your college email address
                </p>
              </div>
            )}
          </div>

          {/* Phone Number*/}

          <div className="input-group">
            <input
              type="tel"
              name="phone"
              id="phone"
              className="input"
              value={person.phone}
              onChange={handleChange}
              required
            />
            <label htmlFor="phone" className="input-label">
              phone number
            </label>
          </div>

          {/* Password */}

          <div className="input-group">
            <input
              type="password"
              name="password"
              id="password"
              className="input"
              value={person.password}
              onChange={onChangePassword}
              required
              onFocus={() => {
                setisFocused({ ...isFocused, password: true });
              }}
            />
            <label htmlFor="password" className="input-label">
              password
            </label>

            {isFocused.password && (
              <img
                src={isvalidPassword ? Correct : Failed}
                alt=""
                width={20}
                height={20}
                style={{
                  position: "absolute",
                  top: 12.5,
                  right: width < 900 ? 10 : -30,
                }}
              />
            )}

            {isFocused.password && (
              <PasswordValidity
                validity={passwordValidity}
                setIsValidPassword={setIsValidPassword}
                isvalidPassword={isvalidPassword}
                password={person.password}
                style={{
                  display: isvalidPassword ? "none" : "block",
                }}
              />
            )}
          </div>

          {/* Confirm password*/}
          <div className="input-group">
            <input
              type="password"
              name="cnfpassword"
              id="cnfpassword"
              className="input"
              value={person.cnfpassword}
              onChange={onChangCnf}
              required
              onFocus={() => {
                setisFocused({ ...isFocused, cnfpassword: true });
              }}
            />
            <label htmlFor="cnfpassword" className="input-label">
              confirm password
            </label>

            {isFocused.cnfpassword && (
              <img
                src={isvalidCnf ? Correct : Failed}
                alt=""
                width={20}
                height={20}
                style={{
                  position: "absolute",
                  top: 12.5,
                  right: width < 900 ? 10 : -30,
                }}
              />
            )}
            {isFocused.cnfpassword && (
              <div
                className="cnf-validity"
                style={{
                  fontSize: "1em",
                  marginTop: "2.5%",
                }}
              >
                <p
                  className="text-danger"
                  style={{
                    display: isvalidCnf ? "none" : "block",
                  }}
                >
                  Password are not matching
                </p>
              </div>
            )}
          </div>
        </div>
        <ReCAPTCHA 
        sitekey="6Lekeo0gAAAAANQn_eAw4gHugk-P_V8sdFex94e9"
        onChange={onChange}/>

        <button
          type="submit"
          onClick={handleSubmit}
          className="register-btn"
          disabled={btnIsDisable()}
        >
          register
        </button>
        
      </form>
    </>
  );
}
