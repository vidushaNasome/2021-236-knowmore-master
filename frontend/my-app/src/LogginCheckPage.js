import React, {Component} from 'react';
import FirstPage from "./components/FirstPage";
import NotloggenInPage from "./RegisterAndLogin/NotloggenInPage";
import logo from "./Images/ll1.JPG";


class LogginCheckPage extends Component {
    render() {
        return (
            <div>
                {sessionStorage.getItem("Username") !== null?
                            <div>
                                <FirstPage/>
                            </div>
                    :<div>
                        <NotloggenInPage/>
                    </div>}




            </div>
        );
    }
}

export default LogginCheckPage;
