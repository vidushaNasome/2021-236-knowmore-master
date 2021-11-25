import React, {Component} from 'react';
import './styleFooter.css';
/*The method needs to check with the format*/

class Footer extends Component {

    render() {
        return(<div className="setfooter">
            <footer>

                <div className="text-center p-3">
                    © 2021 Copyright:
                    <a className="text-dark" href=""> knowmore.com </a>
                </div>


            </footer>
        </div>);
    }
}
export default Footer;
