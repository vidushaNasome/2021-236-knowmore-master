import React,{Component} from 'react';
import {Modal, Button, Form, Card} from 'react-bootstrap';
import PropTypes from "prop-types";
import axios from "axios";
import {share_my_knowledge} from "../../configs/config3";


export class Sharemyknowledgebase extends Component{
    static get propTypes() {
        return {
            studentid: PropTypes.string,
            sessionid: PropTypes.string,
            name: PropTypes.string,
            knid: PropTypes.string,

        }
    }

    constructor(props) {
        super(props);


        this.state = {
            content:'',
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
        //this.name=this.state.name;
        //alert(this.state.theme)
        axios.post(share_my_knowledge, {
            share_content: this.props.name,
            userid: this.props.studentid,
            sessionid: this.props.sessionid,
            knwid: this.props.knid,
            color: this.state.theme,

        })
            .then(function (response) {
                console.log(response);
                //alert('Successfully Shared ✨✨✨✨')

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
                </Modal.Header>
                <Modal.Body>
                    <h4></h4>
                    <div className="container">
                        <div>
                            <Card className="card96">
                                <Card.Body>
                                    {this.props.name} <br/>
                                </Card.Body>
                            </Card>
                        </div>


                        <div align='center'>
                            <Form className="form" onSubmit={this.onSubmit} >
                                <Form.Group>
                                    <Form.Label>Select a Theme</Form.Label>
                                    <div onChange={this.onChangeValue}>
                                        <tr>
                                            <td><input type="radio" value="No" name="theme" /> No Theme&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                            <td><input type="radio" value="Colour" name="theme" /> Colour Theme&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                            <td><input type="radio" value="Design" name="theme" /> Design Theme</td>
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