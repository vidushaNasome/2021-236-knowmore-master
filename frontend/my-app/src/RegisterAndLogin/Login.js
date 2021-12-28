import React, {Component} from 'react';
import './login.css';
import axios from "axios";
import {DisplayStudentsAPI} from "../configs/config";
import FirstPage from "../components/FirstPage";
import MainPage from "../components/MainPage";
import {tokenStudentAPI} from "../configs/config";
//import {authAxios} from "../configs/config";
import { isExpired, decodeToken } from "react-jwt";
//import {tokenValidation} from '../configs/config'; 


class Login extends Component {

    constructor(props) {
        super(props);

        this.state={
            name:"",
            password:"",
            errors:{},
            isLoading:false,
            meStudent:{},
            session:"",
        
            
        }

        this.OnChange=this.OnChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        //this.showsession=this.showsession.bind(this);

      

        


    }
    async onSubmit(e) {
        e.preventDefault();
        this.name = this.state.name;
        this.password = this.state.password;

        await axios.get(tokenStudentAPI+'?name='+this.name+'&pw='+this.password)
            .then(response => {
                console.log(response.data.token);
                //this.setState({ MeStudent: response.data});
                //console.log(this.state.MeStudent)
                if(response.data.token !== 'Incorrect Username or Password') {
                    sessionStorage.setItem("token", response.data.token)
                    const decode_t = decodeToken(response.data.token);
                    sessionStorage.setItem("Username", decode_t.Username)

                    const str =decode_t.image
                    console.log(str)
                    sessionStorage.setItem("image", str.slice(1,-1))
                    sessionStorage.setItem("studentId", decode_t.studentId)
                    window.location.reload();


                }else{
                    alert('Incorrect Username or Password!');
                }


            })
            .catch(function (error) {
                console.log(error);


            })

     
       /* await axios.get(DisplayStudentsAPI+'?name='+this.name+'&pw='+this.password)
            .then(response => {
                this.setState({ MeStudent: response.data});
                console.log(this.state.MeStudent)
                if(response.data !== null && response.data.length !== 0) {
                    sessionStorage.setItem("Username", this.name)
                    sessionStorage.setItem("studentId", this.state.MeStudent[0].id)
                    sessionStorage.setItem("image", this.state.MeStudent[0].image)
                    //alert('hello')
                    window.location.reload();
                }else{
                    alert('Incorrect Username or Password!');
                }


            })
            .catch(function (error) {
                console.log(error);


            })*/

        window.localStorage.setItem('REQUESTING_SHARED_CREDENTIALS', Date.now().toString())
        window.localStorage.removeItem('REQUESTING_SHARED_CREDENTIALS')


    }
    OnChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    /*showsession(){
        alert('display')
        this.setState({session: true})
    }*/

    handleCallback = (childData) =>{
        //this.setState({data: childData})
       // alert(childData)
       console.log(childData);
    }


   


    render() {
        return (
            <div id="login">

                { //Check if message failed
                // (sessionStorage.getItem('studentId') == null)
                                    (sessionStorage.getItem('token') == null)
                                        ? <div>
                                            <div className="col-md-3 m-auto" >
                                                <div className="m-3">
                                                </div>
                                                <form onSubmit={this.onSubmit}>
                                                    <div className="form-group text-center">
                                                        <label className="btn-block m-2 h4">Student Login</label>
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

export default Login;
