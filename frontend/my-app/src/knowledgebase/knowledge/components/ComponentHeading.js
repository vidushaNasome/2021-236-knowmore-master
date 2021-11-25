import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";
import './stylencomponents.css';
import PropTypes from "prop-types";
class ComponentHeading extends Component {

    static get propTypes() {
        return {
            main_heading: PropTypes.string,

        }
    }

    constructor(props) {
        super(props);

        this.state= {
            heading:this.props.main_heading,
        }
        //console.log("value :"+this.state.val)
        this.handleInputChange=this.handleInputChange.bind(this);
       //this.onSubmit=this.onSubmit.bind(this);
        this.sendBackData=this.sendBackData.bind(this);
    }

    handleInputChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

   /* onSubmit(e){
        e.preventDefault();
        this.val=this.state.heading;
        alert(this.val)


    }*/
    sendBackData = () => {
        //alert('alert 1'+this.state.heading)
        this.props.parentCallback(this.state.heading);
    }
    render() {
        return (
            <div className="headingform">
                <Form className="formheadline" >
                        <Form.Control type="text"
                                      placeholder="Type Main Heading"
                                      onChange={this.handleInputChange}
                                      value={this.state.heading}
                                      name="heading"

                        />
                        <br/>
                            <Button id="btnSubmit" variant="primary" onClick={this.sendBackData}>
                                +
                            </Button>


                </Form>

            </div>
        );
    }
}

export default ComponentHeading;