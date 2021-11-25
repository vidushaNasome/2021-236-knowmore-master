import React, {Component} from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBModalFooter } from 'mdbreact';
import './login.css';
import axios from "axios";
import {DisplaySchoolAPI, DisplayStudentsAPI} from "../configs/config";
import FirstPage from "../components/FirstPage";
import MainPage from "../components/MainPage";

class Schoollogin extends Component {

    constructor(props) {
        super(props);

        this.state={
            name:"",
            password:"",
            errors:{},
            isLoading:false,
            meStudent:{}
        }

        this.OnChange=this.OnChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);


    }
    async onSubmit(e) {
        e.preventDefault();
        this.name = this.state.name;
        this.password = this.state.password;

        //alert(this.name+this.password)
        ///?name=Ben&pw=1234
        // alert(DisplayStudentsAPI+'?name='+this.name+'&pw='+this.password)
        axios.get(DisplaySchoolAPI+'?name='+this.name+'&pw='+this.password)
            .then(response => {
                this.setState({ MeStudent: response.data});
                console.log(this.state.MeStudent)
                if(response.data !== null && response.data.length !== 0) {
                    sessionStorage.setItem("Username", this.name)
                    //sessionStorage.setItem("studentId", this.state.MeStudent[0].id)
                    sessionStorage.setItem("schoolId", this.state.MeStudent[0].id)
                    sessionStorage.setItem("image", this.state.MeStudent[0].image)
                    window.location.reload();
                }


            })
            .catch(function (error) {
                console.log(error);


            })

        window.localStorage.setItem('REQUESTING_SHARED_CREDENTIALS', Date.now().toString())
        window.localStorage.removeItem('REQUESTING_SHARED_CREDENTIALS')


    }
    OnChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    render() {
        return (
            <div id="login">


                { //Check if message failed
                    (sessionStorage.getItem('schoolId') == null)
                        ? <div>
                            <div className="col-md-3 m-auto" >
                                <div className="m-3">
                                </div>
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group text-center">
                                        <label className="btn-block m-2 h4">School Login</label>
                                        <br/>
                                        <input type="text" className="form-control alert-link"
                                               placeholder="User Name"
                                               required
                                               name="name"
                                               value={this.state.name}
                                               error={this.state.errors.name}
                                               onChange={this.OnChange}/>
                                        <br/>
                                        <input type="password" className="form-control alert-link"
                                               placeholder="Password"
                                               required
                                               name="password"
                                               value={this.state.password}
                                               error={this.state.errors.password}
                                               onChange={this.OnChange}/>
                                        <input type="submit" className="btn btn-outline-info btn-block mt-4"/>
                                        <br/>
                                    </div>
                                </form>

                                <br/>
                            </div>
                        </div>
                        :
                        <div>
                            <MainPage/>
                        </div>
                }




            </div>
        );
    }

    login() {
        alert('inside login');
    }
}

export default Schoollogin;