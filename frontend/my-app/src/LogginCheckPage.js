import React, {Component} from 'react';
import FirstPage from "./components/FirstPage";
import NotloggenInPage from "./RegisterAndLogin/NotloggenInPage";
import { isExpired, decodeToken } from "react-jwt";
import axios from "axios";
import {tokenValidation} from './configs/config'; 
import {authAxios} from "./configs/config";


class LogginCheckPage extends Component {

    constructor(props){

        super(props);

        this.state={
            token:sessionStorage.getItem('token'),
            secret:'false',
        }

        this.checkSession=this.checkSession.bind(this);

        this.checkSession();

        //sessionStorage.setItem('token','');


    }
    async checkSession(){
       
        const de_token  = decodeToken(this.state.token);
        const ex_token  = isExpired(this.state.token);
        //alert('checking......'+ de_token);
        console.log(de_token);
        console.log(ex_token);

      if(de_token !== null){

        await authAxios.get(tokenValidation+'?id='+de_token.studentId)
        .then(response => {
         console.log(response);
         this.setState({secret:response.data.validation});
         //alert(this.state.secret);
     
        })
        .catch(function (error) {
            console.log(error);
 
 
        })

      }


    }

    render() {
        return (
            <div>
                {sessionStorage.getItem("token") !== null?
                            <div>

                                {this.state.secret === 'true'? 
                                <div><FirstPage/></div>
                                :<NotloggenInPage/>
                                }
                                
                            </div>
                    :<div>
                        <NotloggenInPage/>
                    </div>}




            </div>
        );
    }
}

export default LogginCheckPage;
