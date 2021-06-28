import Home from './components/home/Home'
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import React,{useState,useEffect} from 'react'
function App() {
  const [action, setAction] = useState(false);
  const [data, setData] = useState([]);
    
  useEffect(() => {
    fetch("http://lab.fikracamp.com/api/patients/lab-patients/8")
      .then((res) => res.json())
      .then((information) => setData(information));
  }, []);


  return (
    <div>
      <Sidebar action={action} setAction={setAction} />
      <Home data={data} setData={setData} action={action} />
    </div>
  );
}

export default App;
