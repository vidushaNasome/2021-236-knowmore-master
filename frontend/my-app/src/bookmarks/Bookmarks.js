import React, {Component} from 'react';
import axios from "axios";
import {Button, Card} from "react-bootstrap";
import {display_bookmarks} from "../configs/config";
import {FaBookmark, FaComment, FaFacebookMessenger, FaInstagram, FaShare, FaSkype, FaStar} from "react-icons/fa";
import "./bookmarks.css"
import {Link} from "react-router-dom";

class Bookmarks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: []
        }
    }

    componentDidMount() {
        axios.get(display_bookmarks+'?userid='+sessionStorage.getItem('studentId'))
            //alert(all_bookmarks+'&userid='+sessionStorage.getItem('studentId'))
            .then(response => {
                console.log('success')
                console.log(response)
                const myObject = JSON.parse(response.data.bookmark);

                this.setState({dataList: myObject});

            })
            .catch(function (error) {
                console.log(error);
            })
    }


    render() {
            const {dataList} = this.state;
            return (
                <div align='center'>
                    <div className="bookmark">
                        <h1 style={{color: "white"}} className="text-center"><FaBookmark color="pink"
                                                                                         fontSize="1.0em"/> Bookmarks
                        </h1>
                        <br/>
                        <br/>
                        {dataList.map((dList) => (
                            <Card style={{width: '50rem'}}>
                                <Card.Body>
                                    <p>{dList.fields.name}</p>
                                    <hr/>
                                    <Button variant=""><FaFacebookMessenger fontSize="1.5em"/></Button>
                                    <Button variant=""><FaComment fontSize="1.5em"/></Button>
                                    <Button variant=""><FaSkype fontSize="1.5em"/></Button>
                                    <Link
                                        to={"/cluster" + "/?k=" + dList.fields.sessionid + "&x=" + dList.fields.clusterid + "&tid=" + dList.fields.clusterid}
                                        id="bt4" style={{textDecoration: 'none'}}>
                                        Go to Page
                                    </Link>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </div>
            );
        }
}

export default Bookmarks;