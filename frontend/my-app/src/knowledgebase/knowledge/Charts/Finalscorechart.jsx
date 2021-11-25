import React, {Component} from 'react';
import ProgressBar from 'react-animated-progress-bar';
import PropTypes from "prop-types";

class Finalscorechart extends Component {

    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            score: PropTypes.number,
        }
    }

    render() {
        return (
            <div>
                <ProgressBar
                    width="250px"
                    height="20px"
                    fontColor="white"
                    trackWidth="40"
                    percentage={this.props.score}
                    trackPathColor="grey"
                    trackBorderColor="white"
                    hollowBackgroundColor="#7575a3"
                    defColor={{
                        fair: 'orangered',
                        good: 'yellow',
                        excellent: 'green',
                        poor: 'red',
                    }}
                />
            </div>
        );
    }
}

export default Finalscorechart;