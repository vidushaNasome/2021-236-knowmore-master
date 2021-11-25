import React, {Component} from 'react';
import Switch from "react-bootstrap/Switch";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import Login from "./Login";
import Register from "./Register"
import NavigationBarNotLoggedIn from "../navigation/NavigationBarNotLoggedIn";
import TeacherLogin from "./TeacherLogin";
import TeacherRegister from "./TeacherRegister";
import Schoollogin from "./Schoollogin";
import SchoolRegister from "./SchoolRegister";
import './login.css';
import logo from "../Images/ll1.JPG";
import st1 from "../Images/frontpages/image12.JPG"
import st2 from "../Images/frontpages/1111.jpg"
import st3 from "../Images/frontpages/pp58.jpg"

class NotloggenInPage extends Component {
    render() {
        return (
            <div>
                <div className="notlogindiv">
                    <br/>
                    <div align="center">
                        <tr>
                            <td>{/*<img src={logo} className="mr-2" alt=""/>*/}</td>
                            <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                            <td><h1 id="word1"> Hello, Welcome to KnowMore </h1></td>

                        </tr>

                    </div>

                </div>

                <div className="notlogin1">
                    <img src={st1} className="image1234" alt=""/>
                </div>

                <Router>
                    <NavigationBarNotLoggedIn/>
                    <Switch>
                        <Route  path="/login"   component={Login}/>
                        <Route  path="/register"   component={Register}/>
                        <Route  path="/teacherlogin"   component={TeacherLogin}/>
                        <Route  path="/teacherregister"   component={TeacherRegister}/>
                        <Route  path="/schoollogin"   component={Schoollogin}/>
                        <Route  path="/schoolregister"   component={SchoolRegister}/>


                    </Switch>

                </Router>

                <div className="notlogindiv1">
                    <br/>
                    <div align="">
                    <tr>
                        <td><div className="ll1"><img src={st2} className="newimage22" alt=""/></div></td>
                        <td> &nbsp;&nbsp;&nbsp;&nbsp;</td>
                        <td><div className="rr1">
                                <h1 id="word3"> About Us </h1>
                                <h6 id="word2">
                                        We are Social Media Based E-Learning Application. We provide students learning
                                        aspects, and help them to build up their selves with user engagement. Students interaction via
                                        this platform is the main fact we are considering.
                                        This application has build with leveraging social media features.

                                </h6>
                                    </div></td>
                                </tr> <br/> <br/> <br/>
                        <tr>
                            <td><div className="rr1">
                                <h1 id="word3"> What We Provide </h1>
                                <h6 id="word2">
                                    Sub Objective 1: A social media based, web component which allow students to generate a topic map based on knowledgebase textual content which contains students’ learnings.<br/><br/>
                                    Sub Objective 2: A social media based, resources repository to identify keywords, search and allow students to bookmark and share the content.<br/><br/>
                                    Sub Objective 3: A social media based, web component for generating Slides Show and text file Summary from teachers’ videos.<br/><br/>
                                    Sub Objective 4: A social media-based web component to Predict Test Marks by students’ Reactions (like, heart, sad, angry), Comments, Additional links, Knowledgebase Sharing and Video View.<br/><br/>



                                </h6>
                            </div></td>
                            <td> &nbsp;&nbsp;&nbsp;&nbsp;</td>
                            <td><div className="ll1"><img src={st3} className="newimage22" alt=""/></div></td>
                        </tr>


                    </div>

                </div>

                <div className="notlogindiv">
                    <br/>
                    <div align="center">
                        <tr>

                            Add images of the Running Application
                            .tm
                            .enagement
                            .badge
                            .slides show

                        </tr>

                    </div>

                </div>


            </div>
        );
    }
}

export default NotloggenInPage;
