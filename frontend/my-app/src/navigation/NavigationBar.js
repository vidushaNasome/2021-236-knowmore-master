import React, { useState } from 'react';
import {Nav,NavItem,Navbar,NavDropdown} from 'react-bootstrap';
import {Link} from "react-router-dom";
import './style_nav.css';
import "bootstrap/dist/css/bootstrap.min.css";
//import userimg from "../Images/user.png"
import logo3 from "../Images/ll1.JPG"

import classmates from "../Images/Icons_navigation/classmates.PNG";
import cluster from "../Images/Icons_navigation/cluster.PNG";
import know from "../Images/Icons_navigation/knowldegebase.PNG";

import home from "../Images/Icons_navigation/home.png";
import repo from "../Images/Icons_navigation/repositary.png";
import not from "../Images/Icons_navigation/not.png";
import bookmark from "../Images/Icons_navigation/bookmark.png";
import { Tooltip } from '@varld/popover';





function NavigationBar() {

    return(
        <div >
            <br/>

                <Nav className="fixed-top row" id="navd">
                    <div className="div1">
                        <div>
                        <img id="logo1" className="primary-color"  src={logo3} alt="Company Picture"/>
                        </div>
                        <div id="logoname">
                            <h5>&nbsp;&nbsp; KnowMore</h5>
                        </div>
                    </div>

                    <div className="div2">
                        <div>
                            <Tooltip content="Newsfeed">
                                <Link to="/newsfeed" id="nn" style={{  textDecoration: 'none' }}>
                                    <img src={home} className="mr-2" alt=""/>
                                </Link>
                            </Tooltip>
                        </div>

                        <div>
                            <Tooltip content="Classmates">
                                <Link to="/classmates" id="nn" style={{  textDecoration: 'none' }}>
                                    <img src={classmates} className="mr-3" alt=""/>
                                </Link>
                            </Tooltip>
                        </div>

                        <div>
                            <Tooltip content="Repositary">
                                <Link to="/repositary" id="nn" style={{  textDecoration: 'none' }}>
                                    <img src={repo} className="mr-3" alt=""/>
                                </Link>
                            </Tooltip>
                        </div>

                        <div>
                            <Tooltip content="Cluster">
                                <Link to="/clusterall" id="nn" style={{  textDecoration: 'none' }}>
                                    <img src={cluster} className="mr-3" alt=""/>
                                </Link>
                            </Tooltip>
                        </div>

                        <div>
                            <Tooltip content="Knowledge Base">
                                <Link to="/knowledgebase" id="nn" style={{  textDecoration: 'none' }}>
                                    <img src={know} className="mr-3" alt=""/>
                                </Link>
                            </Tooltip>
                        </div>
                    </div>



                    <div className="div3">
                        <div>
                        <Tooltip content="Bookmarks">
                            <Link to="/bookmarks" id="nn" style={{  textDecoration: 'none' }}>
                                <img src={bookmark} className="mr-3" alt=""/>
                            </Link>
                        </Tooltip>

                        </div>
                        <div>
                            <Tooltip content="Notifications">
                            <Link to="/notifications" id="nn" style={{  textDecoration: 'none' }}>
                                <img src={not} className="mr-3" alt=""/>
                            </Link>
                                </Tooltip>
                        </div>
                    {sessionStorage.getItem("Username") === null?
                        <div>
                        </div>
                        :<div id="logged1">
                            <Link to="/profile" id="nn" style={{  textDecoration: 'none' }}>
                                <h6> <img src={sessionStorage.getItem("image")} id="im_pro" alt="profile" />
                                    &nbsp;&nbsp; {sessionStorage.getItem("Username")}</h6>
                            </Link>
                        </div>}
                    </div>

                </Nav>
                <br/>





        </div>


    );
}
function onClickMethod(){
    sessionStorage.clear();
    window.location.reload();

}

export default NavigationBar;
