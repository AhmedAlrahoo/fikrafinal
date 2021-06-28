import React, { useState, useEffect } from "react";
import "./Details.css";
import vector from "../../../images/vector.svg";
import { useParams, Link } from "react-router-dom";
import Result from "./Result";

const Details = () => {
  const [data, setData] = useState({
    userInfo: {},
    result: [],
  });
  const [testsType, setTestsType] = useState();

  const params = useParams();
  const userInfoId = parseFloat(params.userInfoId);
  const historyId = parseFloat(params.historyId);
  const history = params.history;
  console.log(history);

  useEffect(() => {
    fetch(`http://lab.fikracamp.com/api/patients/${userInfoId}`)
      .then((res) => res.json())
      .then((information) =>
        setData((prevState) => ({
          userInfo: { ...information },
          result: [...prevState.result],
        }))
        
      );
    fetch(`http://lab.fikracamp.com/api/results/test-results/${historyId}`)
      .then((res) => res.json())
      .then((information) =>
        setData((prevState) => ({
          userInfo: { ...prevState.userInfo },
          result: [...information],
        }))
   
      );
      //for getting test name
    // fetch(`./type.json`)
    //   .then((res) => res.json())
    //   .then((information) => setTestsType(information));
  }, []);

  function isFetchComplete() {
    return Object.entries(data.userInfo).length &&
      Object.entries(data.result).length
      ? 1
      : 0;
  }
  
  return (
    <div className="details">
      <form>
        <label className="label">Patient Info</label>
        <div className="info">
          <div className="field">
            {isFetchComplete ? data.userInfo.patient_name : "name"}
          </div>
          <div className="field">
            {isFetchComplete ? data.userInfo.patient_age : "age"}
          </div>
        </div>
        <div className="info">
          <div className="field">
            {isFetchComplete ? data.userInfo.patient_phone_number : "number"}
          </div>
          <div className="field">
            {isFetchComplete ? history : "date"}
          </div>
        </div>
        <label>Test Results</label>
        {isFetchComplete
          ? data.result.map((e) => (
              <Result testsType={testsType} result={e} key={e.labtestid} />
            ))
          : ""}
        <button className="button">
          <Link
            className="link"
            to={isFetchComplete ? `/edit/${data.userInfo.id}` : ``}
          >
            Edit
          </Link>
        </button>
      </form>
      <div className="vector">
        <img src={vector} alt="vector" />
      </div>
    </div>
  );
};
export default Details;
