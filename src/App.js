import React, { useEffect, useState } from "react";
import "./App.css";

const axios = require("axios").default;

function App() {
  const [options, setOptions] = useState([]);
  const [to, setTo] = useState("en");
  const [from, setFrom] = useState("en");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  function translate() {
    const params = new URLSearchParams();
    params.append("q", input);
    params.append("source", from);
    params.append("target", to);
    params.append("api_key", "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");
    axios
      .post("https://libretranslate.de/translate", params, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        console.log(res.data);
        const output = setOutput(res.data.translatedText);
      });
  }

  useEffect(() => {
    axios
      .get("https://libretranslate.com/languages", {
        headers: { accept: "application/json" },
      })
      .then((res) => {
        console.log(res);
        setOptions(res.data);
      });
  }, []);

  return (
    <div className="App">
      <div className="secondBar">
        <div className="row justify-content-center p 1">
          <div className="row justify-content-center">
            <div className="col-3"></div>
            <div className="col-2">
              {/* From ({from}): */}
              <select
                className="btn btn-dark dropdown-toggle"
                onChange={(e) => setFrom(e.target.value)}
              >
                {options.map((src) => (
                  <option key={src.code} value={src.code}>
                    {src.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-1">
              <button type="button" className="btn btn-dark bg-light btn-sm">
                <img alt="changeIcon"
                  src="https://img.icons8.com/ios/50/000000/available-updates.png"
                />
              </button>
            </div>
            <div className="col-2">
              {/* To ({to}): */}
              <select
                className="btn btn-dark dropdown-toggle"
                onChange={(e) => setTo(e.target.value)}
              >
                {options.map((src) => (
                  <option key={src.code} value={src.code}>
                    {src.name}
                  </option>
                ))}
              </select>
            </div>
            <div class="col-3"></div>
          </div>
        </div>

        <div>
          <textarea
            className="border border-5"
            cols="55"
            rows="5"
            onInput={(e) => setInput(e.target.value)}
          ></textarea>
        </div>

        <div>
          <textarea
            className="border border-5"
            cols="55"
            rows="5"
            value={output}
          ></textarea>
        </div>
        <button
          className="btn btn-success"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            translate();
          }}
        >
          Translate
        </button>
        <button
          className="btn btn-warning"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            alert("Sözlüğe ekledi çalışma aşamasındadır!");
          }}
          style={{ marginLeft: "20px" }}
        >
          Add My Pocket
        </button>
      </div>
    </div>
  );
}

export default App;
