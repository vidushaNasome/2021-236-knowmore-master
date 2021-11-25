import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";
import ComponentHeading from "../components/ComponentHeading";
import "./styleKb.css";
import PropTypes from "prop-types";
import DisplayaddedKnoel from "../components/DisplayaddedKnoel";
import axios from "axios";
import {knowledgebaseAPI, knowledgebasePostParaAPI, topicmapscore} from "../../../configs/config";
import {Link} from "react-router-dom";
import not from "../../../Images/Icons_navigation/not.png";
import {FaShare, FaHeart, FaUsersCog, FaInbox, FaUser, FaPlusSquare} from 'react-icons/fa';
import Finalscorechart from "../Charts/Finalscorechart";

class AddKnowledgeBase extends Component {

    static get propTypes() {
        return {
            session_id: PropTypes.number,
            session_name: PropTypes.string,
            session_topic: PropTypes.string,
            session_cluster: PropTypes.string,
            tid: PropTypes.number,
            cid: PropTypes.number,


        }
    }


    constructor(props) {
        //data id
        super(props);
        this.state={
            session_id: this.props.session_id,
            main_heading:'My Main Heading',
            sub_heading:'',
            headingno:false,
            merge:[],
            addeddetloading:true,
            ttgen:false,
            paragraph:'',
            dataid:null,
            addedCheck:false,
            paradata:{},
            det_id:'',
            teachers_keywords:'',
            topic_maps:'',
            keywordsvisibility:''


    }

        this.addheading=this.addheading.bind(this);
        this.func_add=this.func_add.bind(this);
        this.func_add2=this.func_add2.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.callbackFunction=this.callbackFunction.bind(this);
        this.handleInputChange=this.handleInputChange.bind(this);
       // this.putmethodforopicmap=this.putmethodforopicmap.bind(this);
        this.checking_detailsexisted=this.checking_detailsexisted.bind(this);
        this.onFileChange=this.onFileChange.bind(this);
        this.handleInputChange1 = this.handleInputChange1.bind(this);
        this.onsubmitteachers_keywords=this.onsubmitteachers_keywords.bind(this);
        this.retrieving_keywords=this.retrieving_keywords.bind(this);

    }

    componentDidMount() {
        this.checking_detailsexisted();
        this.retrieving_keywords();
    }

    handleInputChange1(event) {
        this.setState({
            selectedFile: event.target.files[0],
        })
    }

    retrieving_keywords(){

        axios.get(topicmapscore+'?sid='+this.state.session_id)
            .then(response => {
                this.setState({topic_maps: response.data[0].keywords});
                this.setState({keywordsvisibility: response.data[0].showstudents});
                console.log(this.state.topic_maps)

            })
            .catch(function (error) {
                console.log(error);
            })

    }


    checking_detailsexisted(){
        //alert(this.state.session_id)
        axios.get(knowledgebasePostParaAPI+'?sid='+this.state.session_id+'&stid='+sessionStorage.getItem('studentId'))
            .then(response => {
                this.setState({paradata: response.data});
                console.log('hello world')
                console.log((this.state.paradata))

                this.setState({paragraph: this.state.paradata[0].details});
                this.setState({det_id: this.state.paradata[0].id});
                //this.setState({student_score: this.state.paradata[0].studentscore});
                //this.setState({teachers_score: this.state.paradata[0].teacherscore});

                this.setState({addedCheck: true})
            })
            .catch(function (error) {
                console.log(error);


            })

    }
    handleInputChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    onSubmit(e){
        e.preventDefault();

        this.setState({ttgen: true})

        if(!this.state.addedCheck){
            this.func_add()
        }else{
            
            try {
                axios.put(knowledgebasePostParaAPI + this.state.det_id+'/', {
                    details: this.state.paragraph
                }).then(function (response) {
                    //console.log(response);
                    alert('Successfully Updated. Proceed with Topic Map Genaration.')
                    window.location.reload();

                })
            }catch (e) {
                
            }
        }

    }



    async func_add2(){
        //alert('success post'+this.state.dataid)
        let val;
       await axios.post(knowledgebaseAPI, {
            name: this.state.main_heading,
            knowledgeid:this.state.dataid,
            student_id:sessionStorage.getItem('studentId')

        })
            .then(response=>{
                console.log(response);
                val=response.data.id
                alert('Successfully Added. Now you can Generate Automatic Topic Map!')
                window.location.reload();

            })

       /* if(sessionStorage.getItem('studentId')!=null){
            await axios.post(topicmapscore, {
                session_id:this.state.session_id,
                type:'student',
                student_id:sessionStorage.getItem('studentId'),
                knowledgetid:val,
                keywords:''

            })
                .then(response=>{
                    console.log(response);
                    alert('Successfully Added. Now you can Generate Automatic Topic Map!')
                    window.location.reload();

                })

        }*/



    }

    async func_add(){

        await axios.post(knowledgebasePostParaAPI, {
            details:this.state.paragraph,
            cluster_id:this.props.cid,
            session_id:this.state.session_id,
            topic_id:this.props.tid,
            student_id:sessionStorage.getItem('studentId')

        })
            .then(response=>{
                console.log(response);
                this.setState({ dataid: response.data.id });


                alert('Successfully Added data....proceeding next step.')

            })

        this.func_add2()

    }
    addheading(){

        if(this.state.headingno){
            this.setState({headingno: false})
        }else{
            this.setState({headingno: true})
            //this.setState({addeddetloading: false})
        }

        //alert(this.state.headingno)


    }
    callbackFunction = (Data) => {
        //alert(Data)
        this.setState({main_heading: Data})

    }

    mergingalldetails(){


    }
    /**/

    onFileChange = event => {

        // Update the state
        this.setState({ audio: event.target.files[0] });

    };

    async onsubmitteachers_keywords(e){
        //alert('you have clicked teachers onsubmit!!!');
        e.preventDefault();

        const conceptsarray = this.state.teachers_keywords;
        const array_concept_len = conceptsarray.split(',');
        console.log(array_concept_len.length)



        await axios.post(topicmapscore, {
            session_id:this.state.session_id,
            showstudents:'no',
            teacher_id:sessionStorage.getItem('teacherId'),
            keywords:this.state.teachers_keywords,
            teacherscore:array_concept_len.length,
            //knowledgeid:this.state.dataid


        })
            .then(response=>{
                console.log(response);
                alert('Successfully Added Topic Map Concepts.')
                window.location.reload();

            })


    }

    render() {

        const {paragraph} = this.state

        return (
            <div >
                <div> <br/>
                    <br/>
                    <h3 style={{color: "white"}}> Add Knowledge Base for this Session To Brainstorm your Knowledge.</h3><br/>
                    <h7 style={{color: "white"}}>Session ID: &nbsp; {this.state.session_id}</h7><br/><br/>
                    <Link to="/xxx" id="nn" style={{  textDecoration: 'none' }}>
                        <FaHeart color="pink"  fontSize="2.4em"/>
                    </Link>

                    <br/>
                    <br/>

                    <div className="row">

                    </div>
                    {(sessionStorage.getItem('studentId')!=null)
                        ?
                        <div>

                            <Form className="formclass" onSubmit={this.onSubmit} >
                                <div className="detdisplay">

                                    {<Form.Group>
                                <textarea
                                    placeholder="Type Paragraph"
                                    onChange={this.handleInputChange}
                                    value={paragraph}
                                    name="paragraph"
                                    rows={6}
                                    cols={120}

                                />

                                    </Form.Group>}
                                    <br/>

                                    <Button id="btnSubmit" variant="primary" type="submit">
                                        Save to My Knowledgebase
                                    </Button>
                                    <div>
                                    </div>
                                    <br/>
                                </div>
                            </Form>

                        </div>
                        :null}

                    {(sessionStorage.getItem('teacherId')!=null & this.state.topic_maps=='')
                        ?
                        <div>
                            <div className="teachers_keywords">
                                <Form className="" onSubmit={this.onsubmitteachers_keywords} >
                                    <div className="detdisplay">

                                        <Form.Label>Input Keywords </Form.Label>
                                        <Form.Control type="text"
                                                      placeholder="Input Concepts separataed by Commas. (ex: apple,ben,cat)"
                                                      onChange={this.handleInputChange}
                                                      value={this.state.teachers_keywords}
                                                      name="teachers_keywords"
                                                      required

                                        />

                                        <br/>

                                        <Button id="btnSubmit" variant="primary" type="submit">
                                            Save Keywords
                                        </Button>

                                        <div>
                                        </div>
                                        <br/>
                                    </div>
                                </Form>

                            </div>

                        </div>

                        :null}


                    {sessionStorage.getItem('teacherId')!=null
                        ?<div className="teachers_keywords">
                            <h5> Added Keywords</h5>
                            <h6>{this.state.topic_maps}</h6>
                            <br/>
                            <h5> Topic Map Concepts Visibility for students</h5>
                            <h6>{this.state.keywordsvisibility}</h6>
                            <button> Make visible for Students</button>

                        </div>
                        :null
                    }

                </div>

            </div>
        );
    }
}

export default AddKnowledgeBase;
