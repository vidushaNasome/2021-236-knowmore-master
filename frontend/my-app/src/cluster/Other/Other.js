import React, {Component} from 'react';
import "../style.css";
import PropTypes from "prop-types";
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import {additionallinkAPI} from "../../configs/config";
import {FaArrowRight, FaRemoveFormat} from "react-icons/fa";
import {Link} from "react-router-dom";
import "./additionallink.css";

class Other extends Component {

    static get propTypes() {
        return {
            session_id: PropTypes.number,
            session_name: PropTypes.string,
            session_topic: PropTypes.string,
            session_cluster: PropTypes.string,
            tid:PropTypes.number,
            cid:PropTypes.number,

        }
    }

    constructor(props) {
        //data id
        super(props);

        this.state = {
            userid: '',
            clusterid: '',
            sessionid: '',
            topicid: '',
            additionalLink: '',
            userimage:'',
            additionalLinkData: '',


        }

        {/* static get propTypes()
        {
            return {
                session_id: PropTypes.number,
                session_name: PropTypes.string,
                session_topic: PropTypes.string,
                session_cluster: PropTypes.string,

            }
        } */
        }


        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.retrieveclink = this.retrieveclink.bind(this);

    }

        componentDidMount() {

            const x = this.retrieveclink()
            //alert(2)


         }

        retrieveclink(){

            //alert('display retrieve comments')
            //alert(additionalLinkAPI+'?sessid='+this.props.session_id)

            axios.get(additionallinkAPI+'?sessid='+this.props.session_id)
                .then(response => {
                    this.setState({additionalLinkData: response.data})
                    //console.log('display video')
                    console.log(this.state.videodata)

                })
                .catch(function (error) {
                    console.log(error);


                })

            return 2;



        }
        handleInputChange(event)
        {
            this.setState({
                [event.target.name]: event.target.value
            })
        }

    onSubmit(e) {
        e.preventDefault();

        try {

            axios.post(additionallinkAPI, {
                userid:sessionStorage.getItem('studentId'),
                clusterid:this.props.cid,
                sessionid:this.props.session_id,
                topicid:this.props.tid,
                additionalLink: this.state.additionalLink,
                userimage:sessionStorage.getItem('image'),


            })
                .then(response=>{
                    console.log(response);
                    //alert('Success')
                    this.retrieveclink()
                    window.location.reload();

                })

        }catch (e) {

            console.log(e)

        }



    }
        render()
        {
            return (
                <div className="other12">
                    <br/><br/>
                    <div align="center"> <h5>Additional Reading</h5></div>
                    <Form className="" onSubmit={this.onSubmit} >

                        <div className="">

                            <tr>

                                <td>
                                    <img id="cm_im" src={sessionStorage.getItem('image')} alt="Avatar"/> &nbsp; &nbsp;
                                </td>

                                <Form.Group>



                        <td><input
                            type="text"
                            placeholder="Add Refer Links"
                            onChange={this.handleInputChange}
                            value={this.state.additionalLink}
                            name="additionalLink"

                        /></td>
                    </Form.Group>
                                <td><Button id="btnSubmit" variant="primary" type="submit">
                                    <FaArrowRight/>
                                </Button> </td>

                            </tr>




                </div>
                    </Form>
                    {
                        (this.state.additionalLinkData[0] != null)
                            ?  <div>{this.state.additionalLinkData.map((l3cat) => (
                                <div className="col-md-16">

                                    <tr>

                                        <Link to={"/viewprofile/"+l3cat.userid} style={{  textDecoration: 'none' }}>
                                            <img id="cm_im" src={l3cat.userimage} alt="Avatar"/> &nbsp; &nbsp;
                                        </Link>
                                        <td><a href={l3cat.additionalLink}> Click Me</a> </td>
                                        <td>
                                            {
                                                (sessionStorage.getItem('studentId') == l3cat.userid)
                                                    ?  <td> <Button id="btndelete" color="red" variant="primary">
                                                        ❌
                                                    </Button> </td>
                                                    : null
                                            }

                                        </td>
                                    </tr>
                                    <br/>

                                </div>

                            ))}<br/></div>
                            : null
                    }
                </div>
            );
        }

}

export default Other;
