import React, {Component} from 'react';
import PropTypes from "prop-types";

class DisplayaddedKnoel extends Component {

    static get propTypes() {
        return {
            main_heading: PropTypes.string,

        }
    }

    constructor(props) {
        super(props)

        this.state={
            main_heading: this.props.main_heading,


        }
}



    render() {
        return (
            <div>
                Heading: {this.state.main_heading}



            </div>
        );
    }
}

export default DisplayaddedKnoel;