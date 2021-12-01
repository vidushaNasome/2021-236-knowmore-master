import React, {Component} from 'react';
import Footer from "../navigation/Footer";
import NavigationBar from "../navigation/NavigationBar";
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Switch from "react-bootstrap/Switch";
import MainPage from "./MainPage";
import Classmates from "../classmates/Classmates";
import Repositary from "../Repositary/Repositary";
import Cluster from "../cluster/Cluster";
import Knowledgebase from "../knowledgebase/Knowledgebase";
import Profile from "../profile/Profile";
import Bookmarks from "../bookmarks/Bookmarks";
import KnowledgeBaseTem from "../knowledgebase/knowledge/knowledgebaseTem/KnowledgeBaseTem";
import ClusterAll from "../cluster/ClusterAll";
import Scoreboard from "../cluster/comments/scoreboard/Scoreboard";
import Slidesshow from "../cluster/Video/Slidesshow";
import TeacherLogin from "../RegisterAndLogin/TeacherLogin";
import Schoollogin from "../RegisterAndLogin/Schoollogin";
import TeacherRegister from "../RegisterAndLogin/TeacherRegister";
import SchoolRegister from "../RegisterAndLogin/SchoolRegister";
import Displayadded from "../knowledgebase/search/Displayadded"
import logo from "../Images/ll1.JPG";
import Notifications from "../navigation/Notifications";
import Login from "../RegisterAndLogin/Login";
import Register from "../RegisterAndLogin/Register";
//import PrimarySearchAppBar from "./navigation/PrimarySearchAppBar";

class FirstPage extends Component {
    render() {
        return (
            <div>
                <Router>
                    <NavigationBar/>
                    <Switch>
                        <Route  path="/newsfeed" exact  component={MainPage}/>
                        <Route  path="/classmates" exact  component={Classmates}/>
                        <Route  path="/repositary" exact  component={Repositary}/>
                        <Route  path="/cluster"  component={Cluster}/>
                        <Route  path="/clusterall"   component={ClusterAll}/>
                        <Route  path="/knowledgebase" exact  component={Knowledgebase}/>
                        <Route  path="/profile" exact  component={Profile}/>
                        <Route  path="/bookmarks" exact  component={Bookmarks}/>
                        <Route  path="/knowledgebaseadd"   component={KnowledgeBaseTem}/>
                        <Route  path="/scoreboard"   component={Scoreboard}/>
                        <Route  path="/slidesshow"   component={Slidesshow}/>
                        <Route  path="/savedknowledgebases"   component={Displayadded}/>
                        <Route  path="/teacherlogin"   component={TeacherLogin}/>
                        <Route  path="/schoollogin"   component={Schoollogin}/>
                        <Route  path="/teacherregister"   component={TeacherRegister}/>
                        <Route  path="/schoolregister"   component={SchoolRegister}/>
                        <Route  path="/notifications"   component={Notifications}/>
                        <Route  path="/login"   component={Login}/>
                        <Route  path="/register"   component={Register}/>
                        
                    </Switch>

                </Router>

            </div>
        );
    }
}

export default FirstPage;
