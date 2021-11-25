import React,{Component} from 'react';
import {Modal,Button,Row, Col,Form} from 'react-bootstrap';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";


export class AddknowledgeModel extends Component{
    static get propTypes() {
        return {
            id: PropTypes.string,

        }
    }

    constructor(props) {
        super(props);


        this.state = {
            paragraph:''
        }

        this.onSubmit=this.onSubmit.bind(this);
        this.handleInputChange=this.handleInputChange.bind(this);
    }

    handleInputChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    onSubmit(e){
        e.preventDefault();
        //this.name=this.state.name;
        alert(this.state.name)
        /*axios.post(categoriesAPI, {
            name: this.name

        })
            .then(function (response) {
                console.log(response);
                window.location.reload();

            })*/


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
                        Collaborate With Your Classmates
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4></h4>
                    <div className="container">
                        <div>
                            <Form className="form" onSubmit={this.onSubmit} >
                                <Form.Group>
                                    <Form.Label>Common Knowledgebase</Form.Label>
                                    <textarea
                                        placeholder="Type Paragraph"
                                        onChange={this.handleInputChange}
                                        value={paragraph}
                                        name="paragraph"
                                        rows={6}
                                        cols={70}

                                    />
                                </Form.Group>


                                <Button id="btnSubmit" variant="primary" type="submit">
                                    Save
                                </Button>

                            </Form>

                        </div>
                        <br/>
                        <div>
                            <h6>Contributions from Classmates</h6>
                            <div>


                            </div>
                        </div>


                   </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
