import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import './Header.css';
import avatar from "../../../images/avatar.svg";

const Home = () => {
    return(
        <div className="header">
            <div className="flx">
            <div className="form2">
            <form>
                <input placeholder="Search..." style={{border:"none"}} type="text" />
                <SearchIcon style={{marginTop:"2px"}} />
            </form>
            </div>
            <div className="avatar">
                <img style={{width:"37px"}} src={avatar} alt="avatar" />
            </div>
            </div>
        </div>
    )
}
export default Home