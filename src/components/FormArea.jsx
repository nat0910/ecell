import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

// Import Svg
import correct from "../assets/svg/correct.svg";
import failed from "../assets/svg/failed.svg";
import info from "../assets/svg/info.svg";

// Import InitialState Values

import {
  InitialState,
  InitialError,
  InitialFocused,
  InitialValid,
} from "../function/InitialStateValues";

// Import Function

import { handleChange } from "../function/handleChange";
import { handleEmailChange } from "../function/handleEmailChange";
import { handleNumberChange } from "../function/handleNumberChange";
import { registerBtnActive } from "../function/registerBtnActive";
import { handleReCaptcha } from "../function/handleReCaptcha";

// Import Data

import {
  teamSizeOption,
  stageOption,
  fundedOption,
  productOption,
  interestOption,
} from "../data/optionData.json";

// Test Functions

export default function FormArea({ width, height }) {
  const [state, setState] = useState(InitialState);
  const [isFocused, setIsFocused] = useState(InitialFocused);
  const [isValid, setIsValid] = useState(InitialValid);
  const [infoHover, setInfoHover] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    fetch(
      "https://zbba6bfl4k.execute-api.ap-south-1.amazonaws.com/dev/startup/form",
      {
        method: "POST",
        headers: {
          //REMEMBER THIS PASS THIS
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      }
    )
      .then(function (response) {
        // The response is a Response instance.
        // You parse the data into a useable format using `.json()`
        return response.json();
      })
      .then(function (data) {
        // `data` is the parsed version of the JSON returned from the above endpoint.
        console.log(data); // { "userId": 1, "id": 1, "title": "...", "body": "..." }
      });
    setState(InitialState);
    setIsFocused(InitialFocused);
    setIsValid(InitialValid);
  }

  // console.log(
  //   "----------------------------------------------------------------"
  // );

  console.log(infoHover);

  // console.log(state);

  return (
    <div className="form-area">
      <form method="post">
        <div className="form-control">
          {/* StartUp Name */}
          <div className="input-group">
            <input
              type="text"
              name="company_name"
              id="company_name"
              className="input"
              required
              placeholder="eg. Example.ly"
              value={state.company_name}
              onChange={(e) => handleChange(e, state, setState)}
              onFocus={(e) => {
                setIsFocused({ ...isFocused, [e.target.name]: true });
              }}
            />
            <label htmlFor="company_name" className="input-label">
              Company Name
            </label>

            {isFocused.company_name && (
              <img
                src={state.company_name.length >= 3 ? correct : failed}
                alt=""
                width={20}
                height={20}
                style={{
                  position: "absolute",
                  top: 12.5,
                  right: -30,
                }}
              />
            )}

            {isFocused.company_name && (
              <div
                className="validity"
                style={{
                  fontSize: "1em",
                  marginTop: "2.5%",
                }}
              >
                <p
                  className="text-danger"
                  style={{
                    display: state.company_name.length >= 3 ? "none" : "block",
                  }}
                >
                  Please fill out this field!
                </p>
              </div>
            )}
          </div>
          {/* Owner Name */}
          <div className="input-group">
            <input
              type="text"
              name="owner_name"
              id="ownername"
              className="input"
              required
              placeholder="eg. John Smith"
              value={state.owner_name}
              onChange={(e) => handleChange(e, state, setState)}
              onFocus={(e) => {
                setIsFocused({ ...isFocused, [e.target.name]: true });
              }}
            />
            <label htmlFor="ownername" className="input-label">
              Founder Name
            </label>

            {isFocused.owner_name && (
              <img
                src={state.owner_name.length >= 2 ? correct : failed}
                alt=""
                width={20}
                height={20}
                style={{
                  position: "absolute",
                  top: 12.5,
                  right: -30,
                }}
              />
            )}

            {isFocused.owner_name && (
              <div
                className="validity"
                style={{
                  fontSize: "1em",
                  marginTop: "2.5%",
                }}
              >
                <p
                  className="text-danger"
                  style={{
                    display: state.owner_name.length >= 2 ? "none" : "block",
                  }}
                >
                  Please fill out this field!
                </p>
              </div>
            )}
          </div>

          {/* Email Address */}

          <div className="input-group">
            <input
              type="text"
              name="email"
              id="email"
              className="input"
              required
              placeholder="eg. me@example.com"
              value={state.email}
              onChange={(e) =>
                handleEmailChange(e, state, isValid, setState, setIsValid)
              }
              onFocus={(e) => {
                setIsFocused({ ...isFocused, [e.target.name]: true });
              }}
            />
            <label htmlFor="email" className="input-label">
              Email Address
            </label>

            {isFocused.email && (
              <img
                src={isValid.email ? correct : failed}
                alt=""
                width={20}
                height={20}
                style={{
                  position: "absolute",
                  top: 12.5,
                  right: -30,
                }}
              />
            )}

            {isFocused.email && (
              <div
                className="validity"
                style={{
                  fontSize: "1em",
                  marginTop: "2.5%",
                }}
              >
                <p
                  className="text-danger"
                  style={{
                    display: isValid.email ? "none" : "block",
                  }}
                >
                  Please enter a valid email address
                </p>
              </div>
            )}
          </div>
          {/* Phone Number */}
          <div className="input-group">
            <input
              type="tel"
              name="contact_number"
              id="phonenumber"
              className="input"
              maxLength={10}
              required
              //   pattern="[0-9]{10}"
              value={state.contact_number}
              onChange={(e) =>
                handleNumberChange(e, state, isValid, setState, setIsValid)
              }
              onFocus={(e) => {
                setIsFocused({ ...isFocused, [e.target.name]: true });
              }}
            />
            <label htmlFor="phonenumber" className="input-label">
              contact number
            </label>

            {isFocused.contact_number && (
              <img
                src={isValid.contact_number ? correct : failed}
                alt=""
                width={20}
                height={20}
                style={{
                  position: "absolute",
                  top: 12.5,
                  right: -30,
                }}
              />
            )}

            {isFocused.contact_number && (
              <div
                className="validity"
                style={{
                  fontSize: "1em",
                  marginTop: "2.5%",
                }}
              >
                <p
                  className="text-danger"
                  style={{
                    display: isValid.contact_number ? "none" : "block",
                  }}
                >
                  Please enter a valid contact number
                </p>
              </div>
            )}
          </div>

          {/* Team Size */}
          <div className="input-group">
            {/* <input
              type="number"
              name="team_size"
              id="team_size"
              className="input"
              required
            /> */}

            <select
              name="team_size"
              id="team_size"
              className="input"
              required
              placeholder="Select Your Team Size"
              value={state.team_size}
              onChange={(e) => handleChange(e, state, setState)}
              onFocus={(e) => {
                setIsFocused({ ...isFocused, [e.target.name]: true });
              }}
            >
              {teamSizeOption.map((item, index) => {
                return (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                );
              })}
            </select>

            <label htmlFor="team_size" className="input-label">
              Team Size
            </label>

            {isFocused.team_size && (
              <img
                src={state.team_size != "none" ? correct : failed}
                alt=""
                width={20}
                height={20}
                style={{
                  position: "absolute",
                  top: 12.5,
                  right: -30,
                }}
              />
            )}

            {isFocused.team_size && (
              <div
                className="validity"
                style={{
                  fontSize: "1em",
                  marginTop: "2.5%",
                }}
              >
                <p
                  className="text-danger"
                  style={{
                    display: state.team_size != "none" ? "none" : "block",
                  }}
                >
                  Please fill out this field!
                </p>
              </div>
            )}
          </div>

          {/* Type of startup */}

          <div className="input-group">
            <select
              name="company_type"
              id="company_type"
              className="input"
              required
              placeholder="Select Your Company Type"
              value={state.company_type}
              onChange={(e) => handleChange(e, state, setState)}
              onFocus={(e) => {
                setIsFocused({ ...isFocused, [e.target.name]: true });
              }}
            >
              {productOption.map((item, index) => {
                return (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                );
              })}
            </select>

            <label htmlFor="company_type" className="input-label">
              Type of Company
            </label>

            {isFocused.company_type && (
              <img
                src={state.company_type != "none" ? correct : failed}
                alt=""
                width={20}
                height={20}
                style={{
                  position: "absolute",
                  top: 12.5,
                  right: -30,
                }}
              />
            )}

            {isFocused.company_type && (
              <div
                className="validity"
                style={{
                  fontSize: "1em",
                  marginTop: "2.5%",
                }}
              >
                <p
                  className="text-danger"
                  style={{
                    display: state.company_type != "none" ? "none" : "block",
                  }}
                >
                  Please fill out this field!
                </p>
              </div>
            )}
          </div>

          {/* Name of product/servse */}

          <div className="input-group">
            <input
              type="text"
              name="commodity_name"
              id="commodity_name"
              className="input"
              required
              placeholder="eg. John Smith"
              value={state.commodity_name}
              onChange={(e) => handleChange(e, state, setState)}
              onFocus={(e) => {
                setIsFocused({ ...isFocused, [e.target.name]: true });
              }}
            />
            <label htmlFor="commodity_name" className="input-label">
              Name of Product/Service
            </label>

            {isFocused.commodity_name && (
              <img
                src={state.commodity_name.length >= 2 ? correct : failed}
                alt=""
                width={20}
                height={20}
                style={{
                  position: "absolute",
                  top: 12.5,
                  right: -30,
                }}
              />
            )}

            {isFocused.commodity_name && (
              <div
                className="validity"
                style={{
                  fontSize: "1em",
                  marginTop: "2.5%",
                }}
              >
                <p
                  className="text-danger"
                  style={{
                    display:
                      state.commodity_name.length >= 2 ? "none" : "block",
                  }}
                >
                  Please fill out this field!
                </p>
              </div>
            )}
          </div>

          {/* Startup domian */}
          <div className="input-group">
            <input
              type="text"
              name="domain"
              id="domain"
              className="input"
              required
              placeholder="eg. Analytics , Comestic , IT Services etc."
              value={state.domain}
              onChange={(e) => handleChange(e, state, setState)}
              onFocus={(e) => {
                setIsFocused({ ...isFocused, [e.target.name]: true });
              }}
            />
            <label htmlFor="domain" className="input-label">
              Domain of your startup
            </label>

            {isFocused.domain && (
              <img
                src={state.domain.length >= 2 ? correct : failed}
                alt=""
                width={20}
                height={20}
                style={{
                  position: "absolute",
                  top: 12.5,
                  right: -30,
                }}
              />
            )}

            {isFocused.domain && (
              <div
                className="validity"
                style={{
                  fontSize: "1em",
                  marginTop: "2.5%",
                }}
              >
                <p
                  className="text-danger"
                  style={{
                    display: state.domain.length >= 2 ? "none" : "block",
                  }}
                >
                  Please fill out this field!
                </p>
              </div>
            )}
          </div>

          {/* Stage */}
          <div className="input-group">
            <select
              name="stage"
              id="stage"
              className="input"
              required
              placeholder="Select Your Stage"
              value={state.stage}
              onChange={(e) => handleChange(e, state, setState)}
              onFocus={(e) => {
                setIsFocused({ ...isFocused, [e.target.name]: true });
              }}
            >
              {stageOption.map((item, index) => {
                return (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                );
              })}
            </select>

            <label htmlFor="stage" className="input-label">
              Stage
            </label>

            {isFocused.stage && (
              <img
                src={state.stage != "none" ? correct : failed}
                alt=""
                width={20}
                height={20}
                style={{
                  position: "absolute",
                  top: 12.5,
                  right: -30,
                }}
              />
            )}

            {isFocused.stage && (
              <div
                className="validity"
                style={{
                  fontSize: "1em",
                  marginTop: "2.5%",
                }}
              >
                <p
                  className="text-danger"
                  style={{
                    display: state.stage != "none" ? "none" : "block",
                  }}
                >
                  Please fill out this field!
                </p>
              </div>
            )}
          </div>

          {/* Funded or Bootstrap */}

          <div className="input-group">
            <select
              name="funded"
              id="funded"
              className="input"
              required
              placeholder="Select Your funded"
              value={state.funded}
              onChange={(e) => handleChange(e, state, setState)}
              onFocus={(e) => {
                setIsFocused({ ...isFocused, [e.target.name]: true });
              }}
            >
              {fundedOption.map((item, index) => {
                return (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                );
              })}
            </select>

            <label htmlFor="funded" className="input-label">
              Funded or Bootstrap
            </label>

            <img
              src={info}
              alt=""
              width={30}
              height={30}
              style={{
                position: "absolute",
                top: 5,
                right: -40,
              }}
              onClick={() => setInfoHover(!infoHover)}
              onMouseEnter={() => setInfoHover(true)}
              onMouseLeave={() => setInfoHover(false)}
            />

            {infoHover && (
              <div
                // className="validity"
                style={{
                  textAlign: "left",
                  position: "absolute",
                  top: -100,
                  right: -5,
                  backgroundColor: "#f7f7fa",
                  padding: "15px 30px",
                  zIndex: 2,
                  width: "50%",
                  color: "#292F36",
                  fontSize: ".85em",
                  borderRadius: "5px",
                }}
              >
                <ul>
                  <li>
                    Funded: Entrepreneur already has some sort or startup
                    capital for their business
                  </li>
                  <br />
                  <li>
                    Bootstrapped: The startup has little to no venture capital
                    and is looking for investments
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* interest type */}

          <div className="input-group">
            <select
              name="interest"
              id="interest"
              className="input"
              required
              placeholder="Select Your interest"
              value={state.interest}
              onChange={(e) => handleChange(e, state, setState)}
              onFocus={(e) => {
                setIsFocused({ ...isFocused, [e.target.name]: true });
              }}
            >
              {interestOption.map((item, index) => {
                return (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                );
              })}
            </select>

            <label htmlFor="interest" className="input-label">
              You are interested in :
            </label>

            {isFocused.interest && (
              <img
                src={state.interest != "none" ? correct : failed}
                alt=""
                width={20}
                height={20}
                style={{
                  position: "absolute",
                  top: 12.5,
                  right: -30,
                }}
              />
            )}

            {isFocused.interest && (
              <div
                className="validity"
                style={{
                  fontSize: "1em",
                  marginTop: "2.5%",
                }}
              >
                <p
                  className="text-danger"
                  style={{
                    display: state.interest != "none" ? "none" : "block",
                  }}
                >
                  Please fill out this field!
                </p>
              </div>
            )}
          </div>

          {/* commodity_description */}
          <div className="input-group">
            <textarea
              name="company_description"
              id="company_description"
              className="input text-area "
              // placeholder={`Give Brief Description of your company`}
              minLength={5}
              maxLength={500}
              value={state.company_description}
              onChange={(e) => handleChange(e, state, setState)}
              onFocus={(e) => {
                setIsFocused({ ...isFocused, [e.target.name]: true });
              }}
              required
            ></textarea>
            <label htmlFor="company_description" className="input-label">
              Company Description
            </label>

            {isFocused.company_description && (
              <img
                src={
                  state.company_description.length > 10 &&
                  state.company_description.length < 500
                    ? correct
                    : failed
                }
                alt=""
                width={20}
                height={20}
                style={{
                  position: "absolute",
                  top: 12.5,
                  right: -30,
                }}
              />
            )}

            {isFocused.company_description && (
              <div
                className="validity"
                style={{
                  fontSize: "1em",
                  marginTop: "2.5%",
                }}
              >
                <p
                  className="text-danger"
                  style={{
                    display:
                      state.company_description.length > 10 &&
                      state.company_description.length < 500
                        ? "none"
                        : "block",
                  }}
                >
                  Please write a description of your company in less than 500
                  characters.
                </p>
              </div>
            )}
          </div>

          {/* Product and service description */}

          <div className="input-group">
            <textarea
              name="commodity_description"
              id="commodity_description"
              className="input text-area "
              // placeholder={`Give Brief Description of your ${state.company_type}`}
              minLength={5}
              maxLength={500}
              value={state.commodity_description}
              onChange={(e) => handleChange(e, state, setState)}
              onFocus={(e) => {
                setIsFocused({ ...isFocused, [e.target.name]: true });
              }}
              required
            ></textarea>
            <label htmlFor="commodity_description" className="input-label">
              Product/Service Description
            </label>

            {isFocused.commodity_description && (
              <img
                src={
                  state.commodity_description.length > 10 &&
                  state.commodity_description.length < 500
                    ? correct
                    : failed
                }
                alt=""
                width={20}
                height={20}
                style={{
                  position: "absolute",
                  top: 12.5,
                  right: -30,
                }}
              />
            )}

            {isFocused.commodity_description && (
              <div
                className="validity"
                style={{
                  fontSize: "1em",
                  marginTop: "2.5%",
                }}
              >
                <p
                  className="text-danger"
                  style={{
                    display:
                      state.commodity_description.length > 10 &&
                      state.commodity_description.length < 500
                        ? "none"
                        : "block",
                  }}
                >
                  Please write a description of your product/service in less
                  than 500 characters.
                </p>
              </div>
            )}
          </div>

          {/* STARTUP Website  LINK */}
          <div className="input-group">
            <input
              type="text"
              name="website_link"
              id="website_link"
              className="input"
              value={state.website_link}
              onChange={(e) => handleChange(e, state, setState)}
              required
            />
            <label htmlFor="website_link" className="input-label">
              website link (optional)
            </label>
          </div>
          {/* STARTUP App  LINK */}

          <div className="input-group">
            <input
              type="text"
              name="app_link"
              id="app_link"
              className="input"
              value={state.app_link}
              onChange={(e) => handleChange(e, state, setState)}
              required
            />
            <label htmlFor="app_link" className="input-label">
              App link (optional)
            </label>
          </div>

          {/* ReCAPTCHA */}
          <div>
            <ReCAPTCHA
              sitekey="6Lekeo0gAAAAANQn_eAw4gHugk-P_V8sdFex94e9"
              onChange={(e) => handleReCaptcha(e, state, setState)}
            />
          </div>
        </div>
        <div
          className="register"
          style={{
            paddingBottom: width < 900 ? "100px" : "",
          }}
        >
          <button
            type="submit"
            className="register-btn"
            disabled={registerBtnActive(state, isValid)}
            onClick={handleSubmit}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
