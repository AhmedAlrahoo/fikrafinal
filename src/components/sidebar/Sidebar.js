import React, { useEffect } from 'react';
import "./Sidebar.css";
import add from "../../images/data_saver.svg";
import logout from "../../images/logout.svg";
import view from "../../images/view.svg";
import dashboard from "../../images/dashboard.svg";
import {Link} from 'react-router-dom';
const Sidebar = ({setAction,action}) => {

    useEffect(()=>{
        localStorage.setItem("set-action",(action));
    })
    return (
        <div className="sidebar">
            <div>
            <div><img className="logo" src={dashboard} alt="dashboard" /></div>
            <ul>
                <Link to="/"><li onClick={() => setAction(false)}><img src={view} alt="pic" /></li></Link>
                <Link to="/add"><li onClick={() => setAction(true)}><img src={add} alt="pic" /></li></Link>
                <div className={action ? `circuit circuit2` : `circuit`}></div>
            </ul>
            </div>
            <div className="logout"><img style={{width:"16px" }} src={logout} alt="logout"/></div>
        </div>
    )
}

export default Sidebar
