import React, {Component} from 'react';
import "../style_know.css";
import {Card, Button, Fade} from "react-bootstrap";
import axios from 'axios';
import {search_bookmarking} from "../../configs/config";
import {Link} from "react-router-dom";
import {FaComment, FaFacebookMessenger, FaSearch, FaShare, FaSkype} from "react-icons/fa";
import Highlighter from "react-highlight-words";

//Search through bookmark
class Search extends Component {
    constructor(props){
        super(props);
        this.state={
            searchList:[],
            keyword:'',
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.handleInputChange= this.handleInputChange.bind(this);
    }


    //search results using keyword extraction
    onSubmit(e) {
        e.preventDefault();

        const search = this.state.keyword
        //alert(search_bookmarking+'?keyword='+search+'&userid='+sessionStorage.getItem('studentId'))
        axios.get(search_bookmarking+'?keyword='+search+'&userid='+sessionStorage.getItem('studentId'))
            .then(response => {
                //console.log('success')
                //console.log(response.data)
                const myObject = JSON.parse(response.data.paragraphobjects);
                console.log('myObject')
                console.log(myObject)

                this.setState({ searchList: myObject});

                if (myObject === undefined || myObject.length == 0) {
                    // results is empty or does not exist
                    alert('Results Not Found...Please enter another keyword to search...!')
                }

            })
            .catch(function (error) {
                console.log(error);
            })

    }
    handleInputChange(event){
        this.setState({
            [event.target.name.toLowerCase()]: event.target.value.toLowerCase()
        })
    }


    render() {
        const {searchList,keyword}=this.state;
        const BarStyling = {width:"31rem",background:"#F2F1F9", border:"info 1rem", padding:"0.5rem", marginInlineStart:"1.5rem", borderRadius: '5px'};
        return (
                        <div className="search">
                            <br/>
                            <h5 className="text-center">Search Through Bookmarking</h5>
                            <br/>
                            <form className="navbar-form" align='center' onSubmit={this.onSubmit}>
                                <div className="input-group">
                                    <input
                                        style={BarStyling}
                                        type="text"
                                        placeholder="Type Here to Search"
                                        onChange={this.handleInputChange}
                                        value={this.state.keyword}
                                        name="keyword"

                                    />
                                    <Button id="btnSubmit" type="submit"><FaSearch  color="white" fontSize="1.0em"/></Button>

                                </div>
                            </form>
                            {console.log(searchList)}
                            <br/>
                            {searchList.map((sList) => (

                                <Card style={{width: '33rem', padding: 'padding:"0.5rem', marginInlineStart:"1.5rem", borderRadius: '5px', marginInlineEnd:"1.5rem"}}>
                                    <Card.Body>
                                        {console.log('display list')}
                                        {console.log(sList.fields.name)}
                                        <Highlighter
                                            highlightStyle={{backgroundColor: 'yellow'}}
                                            searchWords={[keyword]}
                                            textToHighlight={sList.fields.name}
                                       />
                                        <hr/>
                                        <div className="text-center">
                                        <Button variant=""><FaFacebookMessenger fontSize="1.5em"/></Button>
                                        <Button variant=""><FaComment fontSize="1.5em"/></Button>
                                        <Button variant=""><FaSkype fontSize="1.5em"/></Button>
                                        <Link
                                            to={"/cluster" + "/?k=" + sList.fields.sessionid + "&x=" + sList.fields.clusterid + "&tid=" + sList.fields.clusterid}
                                            id="bt4" style={{textDecoration: 'none'}}>
                                            Go to Page
                                        </Link>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ))}
                            <br/>
                        </div>
        );
    }
}

export default Search;
