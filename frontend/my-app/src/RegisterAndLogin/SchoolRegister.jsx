import React, {Component} from 'react';
import './login.css';
import axios from "axios";
import {
    DisplaySchoolAPI,
    DisplayStudentsAPI,
    DisplayTeachersAPI,
    repositaryclustercreationAPI,
    topicmapscore,
    videosAPI
} from "../configs/config";
import MainPage from "../components/MainPage";

class SchoolRegister extends Component {

    constructor(props) {
        super(props);
        this.state={
            name:'',
            location:'',
            password:'',
            rpassword:'',
            selectedFile: '',
        }

        this.OnChange=this.OnChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.handleInputChange1 = this.handleInputChange1.bind(this);
    }

    OnChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    async onSubmit(e) {
        e.preventDefault();
        this.name = this.state.name;
        this.password = this.state.password;
        this.location = this.state.location;

        const formData = new FormData();

        formData.append("image", this.state.selectedFile);
        formData.append('name', this.state.name);
        formData.append('password', this.state.password);
        formData.append('location', this.state.school);

        await axios.post(DisplaySchoolAPI, formData, {})
            .then(response => {
                console.log(response);
                if(response.data !== null) {
                    sessionStorage.setItem("Username", response.data.name)
                    sessionStorage.setItem("schoolId", response.data.id)
                    sessionStorage.setItem("image", response.data.image)
                    alert('You are successfully Registered!')
                    window.location.reload()
                }

            }).catch((err) => {
                console.log(err)
                alert('Something went wrong with '+err)
            })


        window.localStorage.setItem('REQUESTING_SHARED_CREDENTIALS', Date.now().toString())
        window.localStorage.removeItem('REQUESTING_SHARED_CREDENTIALS')


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
                    (sessionStorage.getItem('schoolId') == null)
                        ?

                <div>
                    <div className="col-md-3 m-auto" >
                        <div className="m-3">
                            <h3>School Registration</h3>
                        </div>
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
                                <input type="text" className="form-control alert-link"
                                       placeholder="Location"
                                       required
                                       name="location"
                                       value={this.state.location}
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
                </div>:<div>
                            <MainPage/>
                        </div>}



            </div>
        );
    }
}

export default SchoolRegister;