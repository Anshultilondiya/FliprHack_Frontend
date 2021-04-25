// import logo from './logo.svg';
import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route, useHistory
} from "react-router-dom";
import Home from "./pages/home";
import styled from "styled-components";
import img from "./assets/ground2.jpg";
import Match from "./pages/match"
import UserPanel from "./components/userPanel";
import Game from "./pages/game"
import {useUserStore} from "./contextProvider/userContext";
import Lost from "./pages/lost";


const LandingPage =  styled.div`
  background-image: linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3) ), url(${img});
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-attachment: fixed;
`


const App=()=>{

    const userStore = useUserStore()
    const history = useHistory()



  return (
      <Router>
        <LandingPage>
        <div className="App">
        <Switch>
            <Route exact path="/" >
                <Home/>
            </Route>
            <Route path="/match">
                <div className="match-selection">
                    <UserPanel/>
                    <Match/>
                </div>
            </Route>
            <Route path="/game">
                    <Game/>
            </Route>
            <Route path="/lost">
                <Lost/>
            </Route>
        </Switch>
        </div>
        </LandingPage>
      </Router>
  );
}

export default App;
