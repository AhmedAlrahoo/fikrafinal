import React, { useState, useEffect } from "react";
import "./EditInfo.css";
import vector from "../../../images/vector.svg";
import { useHistory,useParams} from "react-router-dom";

const EditInfo = () => {
  const [data, setData] = useState({
    userInfo: {},
    result: [],
  });
  const [dropDown, setDropDown] = useState([]);
  const params = useParams();
  const userInfoId = parseFloat(params.userInfoId);
  const historyId = parseFloat(params.historyId);
  useEffect(() => {
    fetch(`http://localhost:8000/data/${userInfoId}`)
      .then((res) => res.json())
      .then((information) =>
        setData((prevState) => ({
          userInfo: { ...information },
          result: [...prevState.result],
        }))
      );
    fetch(`http://localhost:8500/testDetails/${historyId}`)
      .then((res) => res.json())
      .then((information) =>
        setData((prevState) => ({
          userInfo: { ...prevState.userInfo },
          result: [...information.results],
        }))
      );
    fetch("./type.json")
      .then((res) => res.json())
      .then((information) => setDropDown(information));
  }, []);



  const [dropSelect, setDropSelect] = useState();

  let history = useHistory();
  const [patientName, setPatientName] = useState(isFetchComplete() ? data.userInfo.name : "name");
  const [patientAge, setPatientAge] = useState(isFetchComplete() ? data.userInfo.age : "age");
  const [patientPhoneNumber, setPatientPhoneNumber] = useState(isFetchComplete() ? data.userInfo.number : "number");
  const [testDate, setTestDate] = useState(isFetchComplete() ? data.userInfo.date : "date");

  const [testResults, setTestResults] = useState(isFetchComplete() ? data.result : [
    { firstTestResult: "",
labtestid: "",
secondTestResult: "" },
  ]);
  console.log(data);
console.log(testResults);
  const handleChange = (e) => {
    setPatientName(e.target.value);
  };
  const handleChange2 = (e) => {
    setPatientAge(e.target.value);
  };
  const handleChange3 = (e) => {
    setPatientPhoneNumber(e.target.value);
  };
  const handleChange4 = (e) => {
    setTestDate(e.target.value);
  };

  const handleChange5 = (e) => {};
  const handleChangeDrop = (e) => {
    console.log(typeof e.target.value);
    setDropSelect(parseInt(e.target.value));
  };

  const handleChangeInput = (index, event) => {
    console.log(event.target.name, event.target.value);
    const values = [...testResults];
    if (event.target.name === "id") {
      values[index].id = event.target.value;
      console.log("1sttttt      ", values);
    } else if (event.target.name === "firstTestResult") {
      values[index].firstTestResult = event.target.value;
      console.log("22 sttttt  ", values);
    } else if (event.target.name === "secondTestResult") {
      values[index].secondTestResult = event.target.value;
      console.log("3 sttttt", values);
    }

    setTestResults(values);
  };

  const handleAddFields = (e) => {
    e.preventDefault();
    setTestResults([
      ...testResults,
      { id: dropSelect, firstTestResult: "", secondTestResult: "" },
    ]);
  };

  const handleRemoveFields = (id) => {
    const values = [...testResults];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setTestResults(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/data", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        patientName,
        patientAge,
        patientPhoneNumber,
        testDate,
        testResults,
        id: Math.random() * 56765,
      }),
    });

    console.log("testResults", testResults);
    setPatientName("");
    setPatientAge("");
    setPatientPhoneNumber("");
    setTestDate("");
    
  };
  function isFetchComplete() {
    return Object.entries(data.userInfo).length &&
      Object.entries(data.result).length
      ? 1
      : 0;
  }
  return (
    <div className="addInfo">
      <form onSubmit={handleSubmit}>
        <div className="info">
          <input onChange={handleChange} placeholder="Enter Name" type="text" />
          <input onChange={handleChange2} placeholder="Age" type="text" />
        </div>
        <div className="info">
          <input
            onChange={handleChange3}
            placeholder="Enter number"
            type="number"
          />
          <input onChange={handleChange4} placeholder="Date" type="date" />
        </div>
        {testResults.map((inputField, index) => (
          <div className="results" key={inputField.id}>
            <select
              name="dropSelect"
              name="id"
              onChange={(event) => handleChangeInput(index, event)}
            >
              {dropDown
                ? dropDown.map((e) => <option value={e.id}>{e.name}</option>)
                : ""}
            </select>

            <textarea
              name="firstTestResult"
              onChange={(event) => handleChangeInput(index, event)}
              className="ckeck2"
              placeholder="result"
              type="text"
            />
            <textarea
              name="secondTestResult"
              onChange={(event) => handleChangeInput(index, event)}
              className="ckeck2"
              placeholder="result 2"
              type="text"
            />
            <button
              disabled={testResults.length === 1}
              onClick={() => handleRemoveFields(inputField.id)}
            >
              Remove
            </button>
            <button onClick={handleAddFields}>Add</button>
          </div>
        ))}
        {/***** INput Field  */}
        <button className="button">Submit</button>
      </form>
      <div className="vector">
        <img src={vector} alt="vector" />
      </div>
    </div>
  );
};
export default EditInfo;
