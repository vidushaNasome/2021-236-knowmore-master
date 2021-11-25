import React,{Component} from 'react';
import {Modal,Button,Row, Col,Form} from 'react-bootstrap';
import {Link} from "react-router-dom";

export class AddknowledgeTemplateModel extends Component{
    constructor(props) {
        super(props);

        var date = new Date();

        var formatedDate = `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`

        this.state = {
            video: {
                src: "",

            },
            startDate: formatedDate,
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
        /*axios.post(categoriesAPI, {
            name: this.name

        })
            .then(function (response) {
                console.log(response);
                window.location.reload();

            })*/


    }


    render() {
        let startDate= this.state;
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add your Knowldegebase Template
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4></h4>
                    <div className="container">
                        <Form className="form" onSubmit={this.onSubmit} >
                            <Form.Group>
                                <Form.Label>Topic</Form.Label>
                                <Form.Control type="text"
                                              placeholder="Add Topic here"
                                              onChange={this.handleInputChange}
                                              name="name"

                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Sub Topic</Form.Label>
                                <Form.Control type="text"
                                              placeholder="Add Subtopic here"
                                              onChange={this.handleInputChange}
                                              name="name"

                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Notes</Form.Label>
                                <Form.Control type="text"
                                              placeholder="Add Notes here"
                                              onChange={this.handleInputChange}
                                              name="name"

                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="date"
                                              onChange={this.handleInputChange}
                                              defaultValue={this.state.startDate}

                                />
                                <Form.Group>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="text"
                                                  placeholder="Type Comments here"
                                                  onChange={this.handleInputChange}
                                                  name="name"

                                    />
                                </Form.Group>
                            </Form.Group>
                            <Button id="btnSubmit" variant="primary" type="submit">
                                Add to My Knowldegebase
                            </Button>

                        </Form>

                   </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
