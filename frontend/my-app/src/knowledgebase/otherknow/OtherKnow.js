import React, {Component} from 'react';
import "../style_know.css";
import {Card,Button} from "react-bootstrap";
import axios from 'axios';

import {search_all} from "../../configs/config";
import {Link} from "react-router-dom";
import {
    FaComment,
    FaFacebookMessenger,
    FaSearch, FaShare, FaSkype
} from "react-icons/fa";
import Highlighter from "react-highlight-words";
import {Sharemyknowledgebase} from "../search/sharemyknowledgebase";

//My knowledgebase search engine
class OtherKnow extends Component {
    constructor(props){
        super(props);
        this.state={
            searchList:[],
            keyword:'',
            addModalShow:false,
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.handleInputChange= this.handleInputChange.bind(this);
    }

    //search results using keyword extraction
    onSubmit(e) {
        e.preventDefault();

        const search = this.state.keyword
        //alert(search_all+'?keyword='+search)
        axios.get(search_all+'?keyword='+search+'&usid='+sessionStorage.getItem('studentId'))
            .then(response => {
                //console.log('success')
                //console.log(response.data)

                const myObject87 = JSON.parse(response.data.paragraphobjects);
                console.log('myObject')
                console.log(myObject87)

                this.setState({ searchList: myObject87});

                if (myObject87 === undefined || myObject87.length == 0) {
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

    /*IncrementItem = () => {
        this.setState({ clicks: this.state.clicks + 1 });
    }*/

    share_newsfeed(id){
        this.setState({addModalShow:true})
    }

    render() {
        let addModalClose=()=>this.setState({addModalShow:false})
        const {searchList, keyword}=this.state;
        const BarStyling = {width:"31rem",background:"#F2F1F9", border:"info 1rem", padding:"0.5rem", marginInlineStart:"1.7rem", borderRadius: '5px'};
        const ButtonStyling = {width:"0.5",background:"#7FFF00", border:"#7FFF00"}
        return (
            <div className="other">
                <div align="center">
                    <br/>
                    <h5 className="text-center">Search Through Knowledgebases</h5>
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
                            <Link to={"/savedknowledgebases"} style={ButtonStyling}><img src="https://img.icons8.com/color/34/000000/repository.png"/></Link>

                        </div>
                    </form>
                    {console.log(searchList)}
                    <br/>
                    {searchList.map((sList) => (

                        <Card style={{ width: '37rem' }}>
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
                                    {/*<Button variant=""><img src="https://img.icons8.com/plumpy/24/000000/add-to-favorites.png" onClick={this.IncrementItem}/>{ this.state.clicks }</Button>*/}
                                    <Button variant=""><FaFacebookMessenger fontSize="1.5em"/></Button>
                                    <Button variant="" id="bt86" style={{  textDecoration: 'none' }} onClick={() => this.share_newsfeed(sList.fields.name)}>
                                        <FaShare color="black" fontSize="2.0em"/>
                                    </Button>
                                    <Sharemyknowledgebase
                                        show={this.state.addModalShow}
                                        onHide={addModalClose}
                                        studentid={sList.fields.userid}
                                        sessionid={sList.fields.sessionid}
                                        name={sList.fields.name}
                                    />
                                    <Button variant=""><FaComment fontSize="1.5em"/></Button>
                                    <Button variant=""><FaSkype fontSize="1.5em"/></Button>
                                </div>

                            </Card.Body>
                        </Card>
                    ))}
                    <br/>
                </div>
            </div>
        );
    }
}

export default OtherKnow;
