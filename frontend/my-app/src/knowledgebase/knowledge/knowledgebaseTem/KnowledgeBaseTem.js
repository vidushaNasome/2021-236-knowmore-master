import React, {Component} from 'react';
import qs from "query-string";
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './styleKb.css';
import ComponentHeading from "../components/ComponentHeading";
import KnowledgeBaseTmp from "../KnowledgeBaseTmp";
import Search from "../../search/Search";
import OtherKnow from "../../otherknow/OtherKnow";
import ConceptMap from "./ConceptMap";
import AddKnowledgeBase from "./AddKnowledgeBase";

class KnowledgeBaseTem extends Component {

    constructor(props) {
        super(props);
        this.state= {
            val:qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).k,
            name:'',

        }

    }

    render() {
        return (
            <div>
                <div><br/><h3>Manage Your Knowledge Base Here.......</h3>
                    {this.state.val}</div>

                <AddKnowledgeBase session_details={this.state.val} knid={45}/>
                <br/><br/>
                <ConceptMap knid={45}/>


            </div>
        );
    }
}

export default KnowledgeBaseTem;