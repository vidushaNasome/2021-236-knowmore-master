import React, {Component} from 'react';
import axios from "axios";
import {DisplaySchoolAPI, DisplayStudentsAPI, DisplayTeachersAPI, repositarytopiccreationAPI} from "../configs/config";
import "./profile.css";
import "../components/mainpage.css"
import {
    FaFontAwesomeLogoFull,
    FaHome,
    FaRegHeart,
    FaRegThumbsUp,
    FaServer,
    FaTimesCircle,
    FaUserLock
} from "react-icons/fa";
import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import s1 from "../Images/usersimages/avatar1.jpg";
import s2 from "../Images/usersimages/aa12.jpg";
import {badgenewsfeed} from "../configs/config2";
import badge from "../Images/badges/digital_badge.png"

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state={
            MeStudent:[],
            badge_certifi:'',
            heart:'',
        }

        this.logout=this.logout.bind(this);
        this.bagde_certificates=this.bagde_certificates.bind(this);
    }

    componentDidMount() {

        const stid = sessionStorage.getItem('studentId')
        const tid = sessionStorage.getItem('teacherId')
        const schoolid = sessionStorage.getItem('schoolId')


        //let passingid=''

        if(stid != null){
            axios.get(DisplayStudentsAPI+stid)
                .then(response => {
                    this.setState({ MeStudent: response.data});
                    console.log(this.state.MeStudent)

                })
                .catch(function (error) {
                    console.log(error);


                })
        }else if(tid != null){
            axios.get(DisplayTeachersAPI+tid)
                .then(response => {
                    this.setState({ MeStudent: response.data});
                    console.log(this.state.MeStudent)

                })
                .catch(function (error) {
                    console.log(error);


                })
        }else{
            axios.get(DisplaySchoolAPI+schoolid)
                .then(response => {
                    this.setState({ MeStudent: response.data});
                    console.log(this.state.MeStudent)

                })
                .catch(function (error) {
                    console.log(error);


                })
        }

        this.bagde_certificates()


    }

    bagde_certificates(){
        axios.get(badgenewsfeed+'?userid='+sessionStorage.getItem('studentId'))
            .then(response => {
                this.setState({   badge_certifi: response.data});
                console.log(response.data)

            })
            .catch(function (error) {
                console.log(error);


            })

    }

    logout(){
        window.localStorage.setItem('CREDENTIALS_FLUSH', Date.now().toString())
        window.localStorage.removeItem('CREDENTIALS_FLUSH')
        console.log("sign out");
        sessionStorage.clear();
        window.location.reload()
    }
    render() {
        return (
            <div className="mainall"><br/><br/><br/><br/>
                <div align="center" className="profile">
                    <img id="userimages5" src={this.state.MeStudent.image} alt="Avatar"/>
                    <br/><br/>
                    <div>
                        <h5>{this.state.MeStudent.id}&nbsp;&nbsp;
                        {this.state.MeStudent.name}</h5>
                    </div>
                </div>

                <div id="">
                    <Button onClick={()=>{this.logout()}} >
                        <FaHome  color="yellow"  fontSize="2.0em"/>
                    </Button> &nbsp; &nbsp; &nbsp;
                    <Button onClick={()=>{this.logout()}} >
                        <FaServer color="white"  fontSize="2.0em"/>
                    </Button> &nbsp; &nbsp; &nbsp;
                    <Button onClick={()=>{this.logout()}} >
                        <FaUserLock  color="pink"  fontSize="2.0em"/>
                    </Button> &nbsp; &nbsp; &nbsp;

                    <br/> <br/>


                </div>

                <br/> <br/>


                <div id="CreateaPost">

                    <h5> Create a Post</h5>
                    <Form className="" >
                        <div className="detdisplay">

                            <Form.Label> </Form.Label>
                            <Form.Control type="text"
                                          placeholder="Add Text"
                                          name="teachers_keywords"
                                          required

                            />

                            <br/>

                            <Button id="btnSubmit" variant="primary" type="submit">
                                Create Post
                            </Button>

                            <div>
                            </div>
                            <br/>
                        </div>
                    </Form>

                </div>

                <br/><br/>

                <div id="questions">

                    <h5> Ask a Question? </h5>
                    <Form className="" onSubmit={this.onsubmitteachers_keywords} >
                        <div className="detdisplay">

                            <Form.Label> </Form.Label>
                            <Form.Control type="text"
                                          placeholder="Add Text"
                                          name="teachers_keywords"
                                          required

                            />

                            <br/>

                            <Button id="btnSubmit" variant="primary" type="submit">
                                Post Question
                            </Button>

                            <div>
                            </div>
                            <br/>
                        </div>
                    </Form>


                </div>

                <br/><br/>
                <div className="Badges">
                    <h3>Earned Badges</h3>

                    {//starting sessions
                        (this.state. badge_certifi !== '')
                            ? <div className= " col-md-16">
                                <div className="session">
                                    {this.state. badge_certifi.map((l3cat) => (
                                        <div>
                                            {(l3cat.color === 'Color')?
                                                <div className="badgecolor" align="center">
                                                    <img id="userimages7" src={badge} alt="Avatar"/>

                                                <tr>
                                                    <td>
                                                        {l3cat.id}
                                                    </td>
                                                    <td>
                                                        &nbsp; &nbsp; &nbsp;
                                                    </td>
                                                    <td>
                                                       Shared Time:  &nbsp; &nbsp;   {l3cat.date}
                                                    </td>
                                                </tr>
                                                    <br/>
                                                    <div> <h6>Session ID: {l3cat.sessionid}</h6> </div>
                                                    <br/>

                                                    <div> <h4>Obtained Marks: {l3cat.mark}</h4> </div>
                                                    <Button>
                                                        <FaRegHeart  color="pink" enableBackground="Red" fontSize="1.0em"/>

                                                    </Button> &nbsp; &nbsp;
                                                    <Button >
                                                        <FaTimesCircle  color="pink" enableBackground="Red" fontSize="1.0em"/>

                                                    </Button>

                                                </div>
                                                :
                                                <div>
                                                    {(l3cat.color === 'Blue')?
                                                        <div className="badgeblue" align="center">
                                                            <img id="userimages7" src={badge} alt="Avatar"/>

                                                            <tr>
                                                                <td>
                                                                    {l3cat.id}
                                                                </td>
                                                                <td>
                                                                    &nbsp; &nbsp; &nbsp;
                                                                </td>
                                                                <td>
                                                                    Shared Time:  &nbsp; &nbsp;   {l3cat.date}
                                                                </td>
                                                            </tr>
                                                            <br/>
                                                            <div> <h6>Session ID: {l3cat.sessionid}</h6> </div>
                                                            <br/>

                                                            <div> <h4>Obtained Marks: {l3cat.mark}</h4> </div>
                                                            <Button>
                                                                <FaRegHeart  color="pink" enableBackground="Red" fontSize="1.0em"/>

                                                            </Button> &nbsp; &nbsp;
                                                            <Button >
                                                                <FaTimesCircle  color="pink" enableBackground="Red" fontSize="1.0em"/>

                                                            </Button>

                                                        </div>:
                                                        <div>
                                                            {(l3cat.color === 'Green')?
                                                                <div className="badgegreen" align="center">
                                                                    <img id="userimages7" src={badge} alt="Avatar"/>

                                                                    <tr>
                                                                        <td>
                                                                            {l3cat.id}
                                                                        </td>
                                                                        <td>
                                                                            &nbsp; &nbsp; &nbsp;
                                                                        </td>
                                                                        <td>
                                                                            Shared Time:  &nbsp; &nbsp;   {l3cat.date}
                                                                        </td>
                                                                    </tr>
                                                                    <br/>
                                                                    <div> <h6>Session ID: {l3cat.sessionid}</h6> </div>
                                                                    <br/>

                                                                    <div> <h4>Obtained Marks: {l3cat.mark}</h4> </div>
                                                                    <Button>
                                                                        <FaRegHeart  color="pink" enableBackground="Red" fontSize="1.0em"/>

                                                                    </Button> &nbsp; &nbsp;
                                                                    <Button >
                                                                        <FaTimesCircle  color="pink" enableBackground="Red" fontSize="1.0em"/>

                                                                    </Button>

                                                                </div>:
                                                                <div>
                                                                    {(l3cat.color === 'Red')?
                                                                        <div className="badgered" align="center">
                                                                            <img id="userimages7" src={badge} alt="Avatar"/>

                                                                            <tr>
                                                                                <td>
                                                                                    {l3cat.id}
                                                                                </td>
                                                                                <td>
                                                                                    &nbsp; &nbsp; &nbsp;
                                                                                </td>
                                                                                <td>
                                                                                    Shared Time:  &nbsp; &nbsp;   {l3cat.date}
                                                                                </td>
                                                                            </tr>
                                                                            <br/>
                                                                            <div> <h6>Session ID: {l3cat.sessionid}</h6> </div>
                                                                            <br/>

                                                                            <div> <h4>Obtained Marks: {l3cat.mark}</h4> </div>
                                                                            <Button>
                                                                                <FaRegHeart  color="pink" enableBackground="Red" fontSize="1.0em"/>

                                                                            </Button> &nbsp; &nbsp;
                                                                            <Button >
                                                                                <FaTimesCircle  color="pink" enableBackground="Red" fontSize="1.0em"/>

                                                                            </Button>

                                                                        </div>:null}
                                                                </div>
                                                            }</div>}
                                                </div>}



                                        </div>

                                    ))}

                                    <br/>


                                </div>

                                <br/></div>
                            : null
                    }


                </div>

                <br/><br/>

                <div id="yourpost">
                    <h5> My Posts and Questions </h5>
                    <br/><br/>

                    <div className="post1">

                        <div>
                            <Link to={"/viewprofile/"} style={{  textDecoration: 'none' }}>
                                <img id="cm_im" src={this.state.MeStudent.image} alt="Avatar"/> &nbsp; &nbsp; {this.state.MeStudent.name}
                            </Link>
                        </div>
                        <br/>
                        <div>
                            <p>
                                When serving our customers, we create experiences and moments of excellence.
                                Tied in closely with the Fortude value of caring - we help solve problems and go the distance to
                                ensure we are a trusted partner and advisor. Thank you to all our customers who have chosen
                                us - we’re so happy to be part of your journey.
                            </p>
                        </div>
                        <br/>
                        <div>
                            <img  src={s2} alt="Avatar"/>
                        </div>


                    </div>


                </div>

                <br/><br/>



            </div>
        );
    }
}

export default Profile;
