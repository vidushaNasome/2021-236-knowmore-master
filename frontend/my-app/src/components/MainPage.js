import React, {Component} from 'react';
import "./mainpage.css"
import "./newNewsFeed.css"
import {
    DisplaySchoolAPI,
    DisplayStudentsAPI,
    DisplayTeachersAPI, userreactionAPI,
    validity,
} from "../configs/config";
import {Link} from "react-router-dom";
import s1 from "../Images/usersimages/avatar1.jpg"
import s2 from "../Images/usersimages/aa12.jpg"
import axios from "axios";
import PropTypes from "prop-types";
import {share_my_knowledge} from "../configs/config3";
import {Button, Form} from "react-bootstrap";
import {FaCodeBranch, FaComment, FaFacebookMessenger, FaRegCommentAlt, FaSkype, FaStar} from "react-icons/fa";
import {authAxios} from "../configs/config";
import { isExpired, decodeToken } from "react-jwt";
import {tokenValidation,tokenValidation_teachers} from '../configs/config'; 


class MainPage extends Component {
    static get propTypes() {
        return {
            name: PropTypes.string,
        }
    }
    constructor(props) {
        super(props);

        this.state={
            MeStudent:[],
            para:[],
            my_knowledge:'',
            clicks:0,
            citations:0,
            token:sessionStorage.getItem('token'),
            secret:'false',
        }
        this.my_knowledge_share=this.my_knowledge_share.bind(this);
        console.log('helloooooo');
        console.log(validity);

        this.checkSession=this.checkSession.bind(this);
        this.checkSession();
    }

    componentDidMount() {

        const stid = sessionStorage.getItem('studentId')
        const tid = sessionStorage.getItem('teacherId')
        const schoolid = sessionStorage.getItem('schoolId')


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

        this.my_knowledge_share()

    }

    //share
    my_knowledge_share(){
        axios.get(share_my_knowledge+'?userid='+sessionStorage.getItem('studentId'))
            .then(response => {
                this.setState({   my_knowledge: response.data});
                console.log(response.data)

            })
            .catch(function (error) {
                console.log(error);


            })

    }

    IncrementItem = () => {
    this.setState({ citations: this.state.citations + 1 });

    // put method citation
        //citations_count = [2,4,7]
        //2 -- student id

        //

        //1 table citations column
        //2 put method citations add

    }

    /*func_post_citations(type){
        alert('inside post')
        axios.post(share_my_knowledge, {


        })
            .then(response=>{
                console.log(response);
                //window.location.reload();
            })

    }*/

    async checkSession(){
       
        const de_token  = decodeToken(this.state.token);
        const ex_token  = isExpired(this.state.token);
        //alert('checking......'+ de_token);
        console.log(de_token);
        console.log(ex_token);

      if(de_token !== null && sessionStorage.getItem('studentId') !== null){

        await authAxios.get(tokenValidation+'?id='+de_token.studentId)
        .then(response => {
         console.log(response);
         this.setState({secret:response.data.validation});
         //alert(this.state.secret);
     
        })
        .catch(function (error) {
            console.log(error);
 
 
        })

      }else if(de_token !== null && sessionStorage.getItem('teacherId') !== null){

        //alert('teaher');
        console.log(de_token)
        await authAxios.get(tokenValidation_teachers+'?id='+de_token.teacherId)
        .then(response => {
         console.log(response);
         this.setState({secret:response.data.validation});
        
     
        })
        .catch(function (error) {
            console.log(error);
 
 
        })

      }


    }



    render() {
        const {my_knowledge}=this.state;
        return (
            <div className="mainpage1">
                <br/>
                {this.state.secret === 'true'? 
                
                <div>

                <div align="center">
                    <h2 id="word3">Newsfeed</h2>
                </div>


                <div>
                    <Form>
                    {//starting sessions
                        (my_knowledge !== '')
                            ? <div>
                                    {my_knowledge.map((m1) => (
                                        <div>
                                            {(m1.color === 'Color')?
                                                <div className="feed1">
                                                    <br/>
                                                    <div> <p>{m1.share_content}</p> </div>
                                                </div>
                                                :
                                                <div>
                                                    {(m1.color === 'No')?
                                                        <div className="feedNo">
                                                            <div>
                                                                {console.log('displaying M1')}
                                                                {console.log(m1)}
                                                                <Link to={"/viewprofile/"} style={{  textDecoration: 'none' }}>
                                                                    <img id="cm_im" src={m1.imageurl}/> &nbsp; &nbsp; {m1.username}
                                                                </Link>
                                                            </div>
                                                            <br/>
                                                            <div> <p>{m1.share_content}</p> </div>
                                                            <hr/>
                                                            <div className="text-center">
                                                            <Button variant=""><FaStar fontSize="1.4em" onClick={this.IncrementItem}/>{ this.state.citations }</Button>
                                                            <Button variant=""><FaFacebookMessenger fontSize="1.5em"/></Button>
                                                            <Button variant=""><FaComment fontSize="1.5em"/></Button>
                                                            <Button variant=""><FaSkype fontSize="1.5em"/></Button>
                                                            </div>
                                                        </div>:
                                                        <div>
                                                            {(m1.color === 'Design')?
                                                                <div className="feedDesign">
                                                                    <div>
                                                                        <Link to={"/viewprofile/"} style={{  textDecoration: 'none' }}>
                                                                            <img id="cm_im" src={m1.imageurl}/> &nbsp; &nbsp; {m1.username}
                                                                        </Link>
                                                                    </div>
                                                                    <br/>
                                                                    <div> <p>{m1.share_content}</p> </div>
                                                                    <hr/>
                                                                    <div className="text-center">
                                                                    <Button variant="" align='center'><FaStar fontSize="1.4em" onClick={this.IncrementItem}/>{ this.state.citations }</Button>
                                                                    <Button variant=""><FaFacebookMessenger fontSize="1.5em"/></Button>
                                                                    <Button variant=""><FaComment fontSize="1.5em"/></Button>
                                                                    <Button variant=""><FaSkype fontSize="1.5em"/></Button>
                                                                    </div>
                                                                </div>:
                                                                <div>
                                                                    {(m1.color === 'Colour')?
                                                                        <div className="feedColor">
                                                                            <div>
                                                                                <Link to={"/viewprofile/"+m1.userid} style={{  textDecoration: 'none' }}>
                                                                                    <img id="cm_im" src={m1.imageurl}/> &nbsp; &nbsp; {m1.username}
                                                                                </Link>
                                                                            </div>
                                                                            <br/>
                                                                            <div> <p>{m1.share_content}</p> </div>
                                                                            <hr/>
                                                                            <div className="text-center">
                                                                            <Button variant=""><FaStar fontSize="1.4em" onClick={this.IncrementItem}/>{ this.state.citations }</Button>
                                                                            <Button variant=""><FaFacebookMessenger fontSize="1.5em"/></Button>
                                                                            <Button variant=""><FaComment fontSize="1.5em"/></Button>
                                                                            <Button variant=""><FaSkype fontSize="1.5em"/></Button>
                                                                            </div>
                                                                        </div>:null}
                                                                </div>
                                                            }</div>}
                                                </div>}



                                        </div>

                                    ))}

                                    <br/>

                                <br/></div>
                            : null
                    }
                    </Form>
                </div>

                <br/><br/>


                                </div>
                                :<div align="center">
                                    <h3> Something Went Wrong... Please re-open the browser.</h3>
                                </div>
                                }
                
            </div>
        );
    }
}

export default MainPage;
