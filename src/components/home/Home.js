import React from 'react';
import Header from './header/Header'
import Landing from './landing/Landing'
import AddInfo from './add/AddInfo'
import ListInfo from './list/ListInfo'
import History from './history/History'
import EditInfo from './edit/EditInfo'
import Details from './details/Details'
import './Home.css';
import {Route ,Switch} from 'react-router-dom';

const Home = ({data, setData }) => {
    return (
        <div className="home">
                <Header />
                <Landing />
                <Switch>
                <Route exact path="/">
                    <ListInfo data={data} setData={setData} />
                </Route>
                <Route path="/add">
                    <AddInfo  />
                </Route>
                <Route path="/history/details/:historyId&:userInfoId&:history">
                    <Details />
                </Route>
                <Route path="/history/edit/:historyId&:userInfoId">
                    <EditInfo />
                </Route>
                <Route path="/history/:id">
                    <History />
                </Route>
                </Switch>
        </div>
    )
}
export default Home