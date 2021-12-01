import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form, Card} from 'react-bootstrap';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import {badgenewsfeed} from "../../configs/config2";


export class Badge extends Component{
    static get propTypes() {
        return {
            studentid: PropTypes.string,
            sessionid: PropTypes.string,
            marks: PropTypes.string,

        }
    }

    constructor(props) {
        super(props);


        this.state = {
            paragraph:'',
            theme: "Color"
        }

        this.onSubmit=this.onSubmit.bind(this);
        this.handleInputChange=this.handleInputChange.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
    }

    handleInputChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    onSubmit(e){
        e.preventDefault();
       
        axios.post(badgenewsfeed, {
            sessionid: this.props.sessionid,
            studentid: this.props.studentid,
            color: this.state.theme,
            mark: this.props.marks

        })
            .then(function (response) {
                console.log(response);
                alert('Successfully Shared ✨✨✨✨')

            })


    }
    onChangeValue(event) {
        console.log(event.target.value);
        this.setState({theme: event.target.value})
    }

    render() {
        let paragraph= this.state;

        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Select Your Badge Preferences to Share Among Your Friends 🎉🎉
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4></h4>
                    <div className="container" align="center">
                        <div>
                            <Card className="card-style">
                                <Card.Body>
                                    <Card.Title> </Card.Title>
                                    <img id="userimage_scoreboard" src={sessionStorage.getItem('image')} alt="Avatar"/> &nbsp; &nbsp; <br/><br/>
                                    Student ID: &nbsp;&nbsp;{this.props.studentid} <br/>
                                    Session ID: &nbsp;&nbsp;{this.props.sessionid} <br/>
                                    Predicted Marks: &nbsp;&nbsp;{this.props.marks} <br/>
                                </Card.Body>
                            </Card>
                        </div>


                        <div>
                            <Form className="form" onSubmit={this.onSubmit} >
                                <Form.Group>
                                    <Form.Label>Select Preferences</Form.Label>
                                    <div onChange={this.onChangeValue}>
                                       <tr>
                                           <td><input type="radio" value="Red" name="theme" /> Red Theme&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                           <td><input type="radio" value="Blue" name="theme" /> Blue Theme&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                           <td><input type="radio" value="Green" name="theme" /> Green Theme</td>
                                       </tr>

                                    </div>
                                </Form.Group>

                                <Button id="btnSubmit" variant="primary" type="submit">
                                    Share In Newsfeed
                                </Button>

                            </Form>

                        </div>
                        <br/>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}