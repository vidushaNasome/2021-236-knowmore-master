import React, {Component} from 'react';
import Search from "./search/Search";
import OtherKnow from "./otherknow/OtherKnow";
import "./style_know.css";

class Knowledgebase extends Component {
    render() {
        return (
            <div className="search_sc">
                <h3 style={{color: "white"}} className="text-center"> Welcome to Knowledgebase Management</h3>
                <br/>
                <div className="rowC">
                <Search/>
                <OtherKnow/>
                </div>

            </div>
        );
    }
}

export default Knowledgebase;
