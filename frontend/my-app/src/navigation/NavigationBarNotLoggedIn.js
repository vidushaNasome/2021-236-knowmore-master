import React from 'react';
import {Nav,NavItem,Navbar,NavDropdown} from 'react-bootstrap';
import {BrowserRouter as Router, Link} from "react-router-dom";
import './style_nav.css';
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../Images/logo.png";
import logo3 from "../Images/ll1.JPG";
function NavigationBarNotLoggedIn() {

    return(
        <div >
            <br/>
                    <Nav className="fixed-top" id="navd">
                        <div>
                            <img id="logo1" src={logo3} alt="Company Picture"/>
                        </div>
                        <div id="logoname">
                            <h5>&nbsp;&nbsp; KnowMore&nbsp;&nbsp;</h5>
                        </div>

                        <button id="reg_btn"><Link to="/login" id="nn" style={{  textDecoration: 'none' }}>Student Login</Link></button>
                        <button id="reg_btn"> <Link to="/register" id="nn" style={{  textDecoration: 'none' }}>Student Register</Link></button>
                        <button id="reg_btn"> <Link to="/teacherlogin" id="nn" style={{  textDecoration: 'none' }}>Teacher Login</Link></button>
                        <button id="reg_btn"> <Link to="/teacherregister" id="nn" style={{  textDecoration: 'none' }}>Teacher Register</Link></button>
                        <button id="reg_btn"> <Link to="/schoollogin" id="nn" style={{  textDecoration: 'none' }}>School Login</Link></button>
                        <button id="reg_btn"><Link to="/schoolregister" id="nn" style={{  textDecoration: 'none' }}>School Register</Link></button>

                </Nav>






        </div>


    );
}
export default NavigationBarNotLoggedIn;
