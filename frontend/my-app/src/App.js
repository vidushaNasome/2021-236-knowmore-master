import logo from './logo.svg';
import './App.css';
import Page from "./Example/Page";
import Page1 from "./Example/Page1";

import Page2 from "./Page2";

import 'bootstrap/dist/css/bootstrap.min.css';
//import PrimarySearchAppBar from "./navigation/PrimarySearchAppBar";
import Footer from "./navigation/Footer";
import React from "react";
import LogginCheckPage from "./LogginCheckPage";
import "./App.css";
import "./background.css";
import SessionCon from "./RegisterAndLogin/SessionCon";


function App() {
  return (
    <div className="background">
        <SessionCon/>
        <LogginCheckPage/>
        <br/>
        <br/>
        {/*<Footer/>*/}
        {/*checking comment 3*/}
        {/*checking comment 4*/}

    </div>
  );
}

export default App;
