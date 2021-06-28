import React, { useState, useEffect } from "react";
import "./History.css";
import HistoryItem from "./historyItem/HistoryItem";
import { useParams } from "react-router-dom";

const History = () => {
  const [data, setData] = useState({
    userInfo: {},
    history: [],
  });
 

  const params = useParams();
  const id = parseFloat(params["id"]);

  useEffect(() => {
    
    fetch(`http://lab.fikracamp.com/api/tests/patient-tests/${id}`)
      .then((res) => res.json())
      .then((information) => {
        setData((prevState) => ({
          userInfo: {
            ...prevState.userInfo,
          },
          history: [
            ...information,
          ],
        }))
        
      });
    fetch(`http://lab.fikracamp.com/api/patients/${id}`)
      .then((res) => res.json())
      .then((information) => {
        setData((prevState) => ({
          userInfo: {
            ...information,
          },
          history: [
            ...prevState.history,
          ],
        }))
        
      });
  }, []);

  const deleteHandle = async (id) => {
    await fetch("http://localhost:8000/data/" + id, {
      method: "DELETE",
    });
    const newItem = data.filter((info) => info.id !== id);
    setData(newItem);
  };

  function isFetchComplete() {
    return Object.entries(data.userInfo).length &&
      Object.entries(data.history).length
      ? 1
      : 0;
  }


  return (
    <div>
      <table>
        <thead>
          <tr className="table-sheet">
            <th>Name</th>
            <th>History</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        {isFetchComplete() ? (
          data.history.map((item) => (
            <HistoryItem
              item={item}
              deleteHandle={deleteHandle}
              data={data.userInfo}
              key={item.id}
            />
          ))
        ) : (
          <tbody>
            <tr>
              <td></td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};
export default History;
