import React, {Component} from 'react';
import './login.css';
import axios from "axios";
import {DisplayStudentsAPI, repositaryclustercreationAPI, topicmapscore, videosAPI} from "../configs/config";
import MainPage from "../components/MainPage";
import sign from "jwt-encode";
import {tokenStudentAPI,gettoken} from "../configs/config";

class Register extends Component {

    constructor(props) {
        super(props);
        this.state={
            name:'',
            year:'',
            password:'',
            rpassword:'',
            selectedFile: '',
        }

        this.OnChange=this.OnChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.join_to_cluster=this.join_to_cluster.bind(this);
        this.handleInputChange1 = this.handleInputChange1.bind(this);
    }

    OnChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    join_to_cluster(id){
        //alert('adding to clusters')
        //Update User
        try {
            axios.put(DisplayStudentsAPI + sessionStorage.getItem('studentId')+'/', {
                clusterIds: id
            }).then(function (response) {
                //console.log(response);
                //alert('success')
                //window.location.reload();

            })
        }catch (e) {

        }

        //Update Repository

        try {
            axios.put(repositaryclustercreationAPI + id+'/', {
                allids: sessionStorage.getItem('studentId')
            }).then(function (response) {
                //console.log(response);
                alert('All Set')
                window.location.reload();
            })
        }catch (e) {

        }

        //reload Page

    }


    async onSubmit(e) {
        e.preventDefault();
        this.name = this.state.name;
        this.password = this.state.password;
        this.year = this.state.year;
        this.rpassword= this.state.rpassword;

        if(this.password !== this.rpassword){
            alert('Wrong Password');
            return 0;

        }else{
            //alert('correct Password');
            const formData = new FormData();

            //const min = Math.ceil(min);
            //const max = Math.floor(max);
            //const rand= Math.floor(Math.random() * (max - min + 1)) + min;
     
            const rand= Math.floor(Math.random() * 100000);
     
             formData.append("image", this.state.selectedFile);
             formData.append('name', this.state.name);
             formData.append('password', this.state.password);
             formData.append('memebersince', this.state.year);
             formData.append('secret', rand);
     
             //alert('calling post method');


             await axios.post(DisplayStudentsAPI, formData, {})
                 .then(response => {
                     console.log(response);
                     if(response.data !== null) {
                         sessionStorage.setItem("Username", response.data.name)
                         sessionStorage.setItem("studentId", response.data.id)
                         sessionStorage.setItem("image", response.data.image)
                         alert('You are successfully Registered!')
                        
                     }
     
                 }).catch((err) => {
                 console.log(err)
                 alert(err)
             })
     
             
             await axios.get(gettoken+'?id='+sessionStorage.getItem("studentId"))
                 .then(response => {
                     console.log(response.data.token);
                     if(response.data.token !== 'Error') {
                         sessionStorage.setItem("token", response.data.token)
                     
                     }else{
                         
                     }
     
                 })
                 .catch(function (error) {
                     console.log(error);
     
     
                 })
     
         
     
             window.localStorage.setItem('REQUESTING_SHARED_CREDENTIALS', Date.now().toString())
             window.localStorage.removeItem('REQUESTING_SHARED_CREDENTIALS')
     
             this.join_to_cluster('1');
        }

    }
    handleInputChange1(event) {
        this.setState({
            selectedFile: event.target.files[0],
        })

        console.log(this.state.selectedFile)
    }

    render() {
        return (
            <div className="register" align="center">

                { //Check if message failed
                    (sessionStorage.getItem('studentId') == null)
                        ?
                <div>
                    <div className="col-md-3 m-auto" >
                        <div className="m-3">
                        </div>
                        <h3>Register Student</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group text-center">
                                <h6> Add Basic Details</h6>
                                <input type="text" className="form-control alert-link"
                                       placeholder="User Name"
                                       required
                                       name="name"
                                       value={this.state.name}
                                       onChange={this.OnChange}/>
                                <br/>
                                <input type="number" className="form-control alert-link"
                                       placeholder="Birth Year"
                                       required
                                       name="year"
                                       value={this.state.year}
                                       onChange={this.OnChange}/>
                                <br/><br/>
                                <h6> Upload Profile Image</h6>
                                <input type="file" className="form-control" name="upload_file"
                                       onChange={this.handleInputChange1}/>
                                <br/><br/>
                                <h6> User Authenticate</h6>
                                <input type="password" className="form-control alert-link"
                                       placeholder="Password"
                                       required
                                       name="password"
                                       value={this.state.password}
                                       onChange={this.OnChange}/>
                                <br/>
                                <input type="password" className="form-control alert-link"
                                       placeholder="Re-enter Password"
                                       required
                                       name="rpassword"
                                       value={this.state.rpassword}
                                       onChange={this.OnChange}/>
                                <input type="submit" className="btn btn-outline-info btn-block mt-4"/>
                                <br/>
                            </div>
                        </form>

                        <br/>
                    </div>
                </div>
                        :<div>
                            <MainPage/>
                        </div>}



            </div>
        );
    }
}

export default Register;