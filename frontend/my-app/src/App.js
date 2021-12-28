import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import PrimarySearchAppBar from "./navigation/PrimarySearchAppBar";
import Footer from "./navigation/Footer";
import React from "react";
import LogginCheckPage from "./LogginCheckPage";
import "./App.css";
import "./background.css";
import SessionCon from "./RegisterAndLogin/SessionCon";
import "./configs/config_m";



function App() {
  return (
    <div className="background">
        <SessionCon/>
        <LogginCheckPage/>    
        <br/>
        <br/>

    </div>
  );
}

export default App;
