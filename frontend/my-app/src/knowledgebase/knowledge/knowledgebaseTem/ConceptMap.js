import React, {Component} from 'react';
import "./styleKb.css";
import Displayshapes from "../conceptmap/Displayshapes";
import DisplayShapetwo from "../conceptmap/DisplayShapetwo";
import DisplayShapeTwo from "../conceptmap/DisplayShapetwo";
import Connectors from "../conceptmap/Connectors";
import {knowledgebaseAPI, knowledgebasePostParaAPI} from "../../../configs/config"
import {categoriesAPI} from "../../../configs/config";
import axios from "axios";
import ComponentHeading from "../components/ComponentHeading";
import {Button, Form} from "react-bootstrap";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {FaAward, FaPlusSquare, FaShare} from "react-icons/fa";
import Finalscorechart from "../Charts/Finalscorechart";
import ProgressBar from "react-animated-progress-bar";
import {AddknowledgeModel} from "../Model/AddknowledgeModel";
import ReactToPrint from "react-to-print";

class ConceptMap extends Component {

    static get propTypes() {
        return {
            session_id: PropTypes.number,
            session_name: PropTypes.string,
            session_topic: PropTypes.string,
            session_cluster: PropTypes.string,

        }
    }

    constructor(props) {
        super(props);

        this.state={
            level1:[],
            level2:[],
            relation:[],
            level_new:[],
            show:false,
            paradata:{},
            session_id:this.props.session_id,
            paradata_id:null,
            dis_para:'',
            dis_id:'',
            student_score:null,
            teachers_score:null,
            show_percentage:false,
            addModalShow:false,
            addModalShowTemplate:false,

        }

        console.log(this.state.level1)

        this.topicmap=this.topicmap.bind(this);
        this.topicmap_details=this.topicmap_details.bind(this);
        this.putmethodforopicmap=this.putmethodforopicmap.bind(this);
        this.show_percentage=this.show_percentage.bind(this);


    }

    componentDidMount() {
        //axios.get(knowledgebasePostParaAPI+'?sid=2')
        console.log('calling compoennt did mount')
        console.log(knowledgebasePostParaAPI+'?sid='+this.state.session_id)
        axios.get(knowledgebasePostParaAPI+'?sid='+this.state.session_id+'&stid='+sessionStorage.getItem('studentId'))
            .then(response => {
                this.setState({paradata: response.data});
                this.setState({dis_para: this.state.paradata[0].details});
                this.setState({paradata_id: this.state.paradata[0].id});
                console.log('hello world')
                console.log((this.state.paradata_id))

            }).then(
                this.topicmap_details
        )
            .catch(function (error) {
                console.log(error);


            })

    }

    async topicmap_details(){
        //alert('tpoic map calling')
        //const x =this.state.paradata[0].id
        //axios.get(knowledgebaseAPI+'?kid=1')

            console.log(knowledgebaseAPI+'?kid='+this.state.paradata_id)

            await axios.get(knowledgebaseAPI+'?kid='+this.state.paradata_id+'&stid='+sessionStorage.getItem('studentId'))
            .then(response => {
                this.setState({level_new: response.data});
                //console.log(this.state.level_new)
                //alert(this.state.student_score)
                //alert(this.state.teachers_score)
                //console.log('displaying1')
                //console.log(response.data)
                //console.log(this.state.level_new[0].output)

            })
            .catch(function (error) {
                console.log(error);


            })

        console.log('######## Underpath ########')

        console.log(this.state.level_new[0].output)

        this.setState({dis_id: this.state.level_new[0].id})

        console.log('displaying*********id')
        console.log(this.state.dis_id)

        if(this.state.level_new[0].output !== ''){
            console.log(JSON.parse(this.state.level_new[0].output))

            this.setState({level1: JSON.parse(this.state.level_new[0].output)})

            this.setState({level2: JSON.parse(this.state.level_new[0].output1)})

            this.setState({relation: JSON.parse(this.state.level_new[0].relation)});

        }

        this.setState({student_score: this.state.level_new[0].studentscore});
        this.setState({teachers_score: this.state.level_new[0].teacherscore});

    }


    topicmap(){

        if(this.state.show){
            this.setState({show: false})
        }else{
            this.setState({show: true})
            //this.setState({addeddetloading: false})
        }


    }

    putmethodforopicmap(dis_id){
        //60
       // alert(knowledgebaseAPI+dis_id+'/')
        console.log('displaying dis id')
        console.log(dis_id)
        axios.put(knowledgebaseAPI+this.state.dis_id+'/', {
            name: 'just adding'

        }).then(function (response) {
            //console.log(response);
            alert('Successfully Updated. Now you can View  Automatic Generated Topic Map!')
            window.location.reload();


        })

    }
    show_percentage(){

        if(this.state.show_percentage){
            this.setState({show_percentage: false})
        }else{
            this.setState({show_percentage: true})
            //this.setState({addeddetloading: false})
        }

    }


    render() {

        let addModalClose=()=>this.setState({addModalShow:false})

        const {dis_para} = this.state
        const {paradata_id} = this.state
        const {student_score}=this.state
        const {teachers_score}=this.state
        return (
            <div className="conceptmap">
                <br/>
                <h3> Automatic Topic Map</h3>
                <br/>

                <div className="evaluatetm">
                    <div className="rowC">

                        <div className="final">

                            <Link to="/xxx" id="nn" style={{  textDecoration: 'none' }}>
                                <FaShare color="white" fontSize="1.5em"/>
                            </Link>
                            <button onClick={this.show_percentage} id="btn-">
                                <FaAward color="brown" fontSize="1.5em"/>
                            </button>
                            {(this.state.show_percentage)?
                                <div align="center">

                                <div>
                                <Finalscorechart score={(this.state.student_score/this.state.teachers_score)*100}/>
                                </div>
                                </div>

                                :
                                null}

                            <h5>Topic Map - Concepts Identification Score</h5>

                        </div>

                        <div className="keywords">
                            <div align="center">
                                <h7>Identified Concepts</h7>
                                <h1 id="shownumers1">
                                    {this.state.student_score}
                                </h1>

                            </div>
                        </div>

                        <div className="keywords">
                            <div align="center">
                                <h7>Try to Identify Concepts More:</h7>
                                <h1 id="shownumers2">
                                    {(this.state.teachers_score-this.state.student_score)}
                                </h1>

                            </div>
                        </div>

                        <div className="wordcount">
                            <div align="center">


                                <h5> Collaborate with Classmates </h5>
                                <br/><br/>
                                <button id="btnsubmit_cols" onClick={()=>this.setState({addModalShow:true})}>
                                    <FaPlusSquare color="black" color="white" fontSize="2.0em"/>Classmates
                                </button>

                                <AddknowledgeModel
                                    show={this.state.addModalShow}
                                    onHide={addModalClose}
                                    id={this.state.id}
                                />


                            </div>
                        </div>
                    </div>

                </div><br/> <br/>
                <Button id="btnSubmit" variant="dark" onClick={()=>this.putmethodforopicmap(paradata_id)}>
                    Proceed to Automatic Generated Topic Map
                </Button>

                <br/>
                <br/>
                <div>
                    <h6>
                        Paragraph:<br/>
                        {dis_para}
                    <br/>
                        <br/>
                    </h6>

                </div>

                <br/><br/>

                <Button id="btnSubmit" variant="info" onClick={this.topicmap}>
                   View Generated Automatic Topic Map
                </Button>

                <br/><br/>



                { //Check if message failed
                    (this.state.show)
                        ?
                        <div>
                            <ReactToPrint
                                trigger={() => <a id="new_link" href="#">Print</a>}
                                content={() => this.componentRef}
                            />
                            <Displayshapes ref={el => (this.componentRef = el)} sessiontopic={this.props.session_topic} sessionssession={this.props.session_name} level1={this.state.level1} level2={this.state.level2} relationship={this.state.relation}/>
                        </div>

                        : null
                }

                {/*<Connectors/>*/}




            </div>
        );
    }
}

export default ConceptMap;
