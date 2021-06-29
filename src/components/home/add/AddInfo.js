import React, { useState, useEffect } from 'react';
import './AddInfo.css';
import vector from '../../../images/vector.svg';
import { useHistory } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import add from "../../../images/plus.svg"
import remove from "../../../images/minus.svg"

const AddInfo = () => {


    // State Stuff
    const [dropDown, setDropDown] = useState([])
    const [patient_name, setPatientName] = useState("");
    const [patient_age, setPatientAge] = useState();
    const [patient_phone_number, setPatientPhoneNumber] = useState();
    const [test_date, setTestDate] = useState("");
    const [test_results, setTestResults] = useState([
        { id: '', firstTestResult: '', secondTestResult: '' },
    ]);
    let history = useHistory();

    // fetch data
    useEffect(() => {
        fetch("http://lab.fikracamp.com/api/labtesttypes")
            .then((res) => res.json())
            .then((information) =>{
                information.map((element => {
                    element.TestsType = element.TestsType.test_type
                }))
                setDropDown(information);
                });

    }, []);


    //Handle CHange Form
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
    const handleChangeInput = (index, event) => {
        
        const values = [...test_results];
        if (event.target.name === "id") {
            values[index].id = event.target.value;
        } else if (event.target.name === "firstTestResult") {
            values[index].firstTestResult = event.target.value;
        } else if (event.target.name === "secondTestResult") {
            values[index].secondTestResult = event.target.value;
        }
        setTestResults(values)
    }
    // Add &  Remove Dynamic input Field
    const handleAddFields = (e) => {
        e.preventDefault();
        setTestResults([...test_results, { id: "", firstTestResult: "", secondTestResult: "" }])
    }
    const handleRemoveFields = (id) => {
        const values = [...test_results];
        values.splice(values.findIndex(value => value.id === id), 1);
        setTestResults(values);
    }

    // Submit data on Form
    const handleSubmit = (e) => {
        console.log(patient_name)
        e.preventDefault();
        fetch("http://lab.fikracamp.com/api/tests/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                  patient_name,
                test_date,
                patient_phone_number,
                patient_age,
                test_results
              })
            }).then(() => history.push("/"));
            // body: {
            //     "patient_name" : `${patient_name}`,
            //     "test_data" : `${test_date}`,
            //     "patient_phone_number" : `${patient_phone_number}`,
            //     "patient_age" : `${patient_age}`,
            //     "test_results": test_results
            // }

        setPatientName("");
        setPatientAge("");
        setPatientPhoneNumber("");
        setTestDate("");
    };

    return (
        <div className="addInfo">
            <form onSubmit={handleSubmit}>
                <div className="info mrg">
                    <input onChange={handleChange} placeholder="Enter Name" type="text" />
                    <input onChange={handleChange2} placeholder="Age" type="text" />
                </div>
                <div className="info mrg">
                    <input onChange={handleChange3} placeholder="Enter number" type="number" />
                    <input onChange={handleChange4} placeholder="Date" type="date" />
                </div>

                {test_results.map((inputField, index) => (
                    <div key={inputField.id}>
                        <select className="mrg" id="cars" name="id" onChange={(event) => handleChangeInput(index, event)}>
                            {dropDown ? (dropDown.map((e) => (
                                <option value={e.TestsTypeId}>{e.TestsType}</option>
                            ))) : ""}
                        </select>
                        <textarea
                            name="firstTestResult"
                            onChange={(event) => handleChangeInput(index, event)}
                            className="ckeck2 mrg" placeholder="result" type="text" />
                        <textarea
                            name="secondTestResult"
                            onChange={(event) => handleChangeInput(index, event)}
                            className="ckeck2 mrg" placeholder="result 2" type="text" />
                        <div className="postion" >
                        <button style={{backgroundColor:"#00000000"}} disabled={test_results.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
                            <img  style={{width:"20px",borderRadius:"50%"}} src={remove} alt="remove"/>
                        </button>
                        <button style={{backgroundColor:"#00000000"}} onClick={handleAddFields}>
                            {/* <AddIcon /> */}
                            <img  style={{width:"20px",borderRadius:"50%",marginLeft:"10px"}} src={add} alt="add" />
                        </button>
                        </div>
                    </div>
                ))}
                <button className="button">Submit</button>
            </form>
            <div className="vector">
                <img src={vector} alt="vector" />
            </div>
        </div>
    )
}
export default AddInfo