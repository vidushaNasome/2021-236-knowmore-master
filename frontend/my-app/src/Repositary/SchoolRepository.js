import React, {Component} from 'react';
import './student.css';
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import {
    DisplayStudentsAPI, DisplayTeachersAPI, knowledgebasePostParaAPI,
    repositaryclustercreationAPI,
    repositarysessioncreationAPI,
    repositarytopiccreationAPI
} from "../configs/config";
import {Link} from "react-router-dom";
import not from "../Images/Icons_navigation/not.png";
import {Tooltip} from "@varld/popover";
import Clusterusers from "./users/Clusterusers";

class SchoolRepository extends Component {

    constructor(props) {
        super(props);

        this.state={
            cluster:'',
            allclusters:[],
            topic:'',
            showtopic:false,
            cid_:null,
            checkid:null,
            checkidsession:null,
            showalltopic:[],
            showsession:false,
            showallsessions:[],
            teachers_id:'',
        }

        this.onSubmit=this.onSubmit.bind(this);
        this.displaysessions=this.displaysessions.bind(this);
        this.displaytopics=this.displaytopics.bind(this);
        this.showtopic=this.showtopic.bind(this);
        this.onSubmittopic=this.onSubmittopic.bind(this);
        this.handleInputChange=this.handleInputChange.bind(this);
        this.onviewSessionClick=this.onviewSessionClick.bind(this);
        this.adding_repo_to_teachers=this.adding_repo_to_teachers.bind(this);
    }

    componentDidMount() {

        const id =sessionStorage.getItem('schoolId')

        /*axios.get(repositaryclustercreationAPI)
            .then(response => {
                this.setState({  allclusters: response.data});
                console.log(response.data)

            })
            .catch(function (error) {
                console.log(error);


            })*/

        axios.get(repositaryclustercreationAPI+'?sid='+id)
            .then(response => {
                this.setState({  allclusters: response.data});
                console.log(response.data)

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

    displaytopics(id){

        axios.get(repositarytopiccreationAPI+'?id='+id)
            .then(response => {
                this.setState({  showalltopic: response.data});
                console.log(response.data)

            })
            .catch(function (error) {
                console.log(error);


            })

    }


    async onSubmit(e){
        e.preventDefault();
        this.name=this.state.cluster;
        this.teachers_array=this.state.teachers_id
        const myArray = this.teachers_array.split(',');
        console.log(myArray)

        let no= 0;

        await axios.post(repositaryclustercreationAPI, {
            clustername: this.name,
            schoolid:sessionStorage.getItem('schoolId'),
            teachersid: this.state.teachers_id,

        })
            .then(function (response) {
                console.log(response);
                no = response.data.id
                //window.location.reload();

            })


       await myArray.forEach(function(item) {
            console.log(item);
            alert(item+'   '+no)
             try {
                 axios.put(DisplayTeachersAPI + item+'/', {
                     clusterIds: no
                 }).then(function (response) {
                     //console.log(response);
                     alert('success')
                     //window.location.reload();

                 })
             }catch (e) {

             }
        })

        //window.location.reload();

    }

    adding_repo_to_teachers(item,no){

        alert(item+no)
       /* try {
            axios.put(DisplayTeachersAPI + item+'/', {
                details: this.state.paragraph
            }).then(function (response) {
                //console.log(response);
                alert('Successfully Updated. Proceed with Topic Map Genaration.')
                window.location.reload();

            })
        }catch (e) {

        }*/


    }

    onSubmittopic(id){
       // alert(this.state.cid_)
        //e.preventDefault();
        this.name=this.state.topic;
        axios.post(repositarytopiccreationAPI, {
            clusterid: id,
            schoolid:1234,
            topicname:this.name

        })
            .then(function (response) {
                console.log(response);
                window.location.reload();

            })


    }
    onSubmitsession(id1,id2){
        alert(id1+"hhh"+id2)
        //e.preventDefault();
        this.name=this.state.session;
        axios.post(repositarysessioncreationAPI, {
            clusterid: id1,
            schoolid:1234,
            sessionname:this.name,
            topicid:id2

        })
            .then(function (response) {
                console.log(response);
                window.location.reload();

            })


    }
    showtopic(id){
        //alert(id+this.state.cid_)
        this.setState({checkid: id})

        if(this.state.showtopic ){
            this.setState({showtopic: false})
        }else{
            this.setState({showtopic: true})

        }

        this.displaytopics(id);

    }
    displaysessions(id1,id2){

        axios.get(repositarysessioncreationAPI+'?cid='+id1+'&tid='+id2)
            .then(response => {
                this.setState({showallsessions: response.data});
                console.log(response.data)

            })
            .catch(function (error) {
                console.log(error);


            })



    }

    onviewSessionClick(id1,id2){
        //alert('displaying'+id)
        this.setState({checkidsession: id2})

        if(this.state.showsession ){
            this.setState({showsession: false})
        }else{
            this.setState({showsession: true})

        }

        this.displaysessions(id1,id2);

    }

    render() {
        const {allclusters}=this.state;
        return (
            <div  className="full_view_school"><br/><br/>
                <div className="school_view">
                    <h4 className="text-center text-secondary">School/Institute ID: {sessionStorage.getItem('schoolId')} </h4>

                    <div>
                        <h6 className="text-left text-primary border-danger"></h6>
                        {allclusters.map((l1cat) => (
                            <div className="col-md-16">
                                <div className="card text-center font-weight-bold">
                                    <div className="card-header text-black">
                                        <div className="" align="center">
                                            <div className="">
                                                {l1cat.id}&nbsp;&nbsp;<br/>
                                                {l1cat.clustername}<Clusterusers cid={l1cat.id}/>

                                            </div>
                                            {/*<Link to={"/scoreboard/?y="+l1cat.clustername+"&cid="+l1cat.id} id="bt4" style={{  textDecoration: 'none' }}>
                                                Score Board
                                            </Link>*/}
                                            <div className="form-group text-left border-dark" >
                                                <div className="form-group text-left">
                                                    <br/><br/>
                                                    <Button id="bt1" variant="info" onClick={() => this.showtopic(l1cat.id)}>
                                                        View Topics
                                                    </Button>

                                                    {
                                                        (this.state.showtopic && l1cat.id === this.state.checkid)
                                                            ? <div className=" col-md-16">

                                                                <div className="topic">
                                                                    <div className="text-left text-primary border-danger"> Clusters' Topics</div> <br/>

                                                                    {this.state.showalltopic.map((l2cat) => (
                                                                        <div className="col-md-16">
                                                                            <div className="card text-center font-weight-bold">
                                                                                <div className="card-header text-black">
                                                                                    <div className="row"><br/>{l2cat.id}{l2cat.topicname}&nbsp;&nbsp;<br/>
                                                                                    </div>
                                                                                    <br/><br/>
                                                                                    <button id="bt1" variant="primary" onClick={() => this.onviewSessionClick(l1cat.id, l2cat.id)}> View Sessions</button>

                                                                                    {//starting sessions
                                                                                        (this.state.showsession && l2cat.id === this.state.checkidsession)
                                                                                            ? <div className= " col-md-16">

                                                                                                <div className="session">
                                                                                                    <div className="text-left text-primary border-danger"> Topics' Sessions </div>

                                                                                                    {this.state.showallsessions.map((l3cat) => (
                                                                                                        <div className="col-md-16">
                                                                                                            <div className="card text-center font-weight-bold">
                                                                                                                <div className="ind_session">
                                                                                                                <div className="card-header text-black">
                                                                                                                    {l3cat.id}{l3cat.sessionname}&nbsp;&nbsp;<br/><br/>
                                                                                                                    <Link to={"/cluster"+"/?k="+l3cat.id+'&n='+l2cat.topicname+"&y="+l1cat.clustername+"&x="+l1cat.id+"&tid="+l2cat.id} id="bt4" style={{  textDecoration: 'none' }}>
                                                                                                                        Navigate to Page
                                                                                                                    </Link>&nbsp;&nbsp;
                                                                                                                    <Link to={"/scoreboard"+"/?k="+l3cat.id+'&n='+l2cat.topicname+"&y="+l1cat.clustername+"&cid="+l1cat.id+"&tid="+l2cat.id} id="bt4" style={{  textDecoration: 'none' }}>
                                                                                                                        Score Board
                                                                                                                    </Link>
                                                                                                                </div></div></div>

                                                                                                        <br/></div>
                                                                                                    ))}<br/>


                                                                                                </div>

                                                                                                <Form className="formclass" onSubmit={() => this.onSubmitsession(l1cat.id,l2cat.id)} >
                                                                                                    <Form.Group>
                                                                                                        <Form.Label>Add a Session </Form.Label>
                                                                                                        <Form.Control type="text"
                                                                                                                      placeholder="Type Session name"
                                                                                                                      onChange={this.handleInputChange}
                                                                                                                      value={this.state.session}
                                                                                                                      name="session"

                                                                                                        />
                                                                                                        <Form.Control type="hidden"
                                                                                                                      placeholder="Type Topic name"
                                                                                                                      onChange={this.handleInputChange}
                                                                                                                      value={l2cat.id}
                                                                                                                      name="cid1_"

                                                                                                        />
                                                                                                        <Form.Control type="hidden"
                                                                                                                      placeholder="Type Topic name"
                                                                                                                      onChange={this.handleInputChange}
                                                                                                                      value={l1cat.id}
                                                                                                                      name="cid2_"

                                                                                                        />
                                                                                                        <br/><br/>
                                                                                                        <button id="btnSubmit" className="btn btn-primary" type="submit">
                                                                                                            Add a Session
                                                                                                        </button>
                                                                                                    </Form.Group>
                                                                                                </Form>

                                                                                            </div>
                                                                                            : null
                                                                                    }<br/><br/>



                                                                                </div></div>

                                                                       <br/> </div>
                                                                    ))}<br/>


                                                                </div>

                                                                <Form className="formclass" onSubmit={() => this.onSubmittopic(l1cat.id)} >
                                                                    <Form.Group>
                                                                        <Form.Label>Add a topic </Form.Label>
                                                                        <Form.Control type="text"
                                                                                      placeholder="Type Topic name"
                                                                                      onChange={this.handleInputChange}
                                                                                      value={this.state.topic}
                                                                                      name="topic"

                                                                        />
                                                                        <Form.Control type="hidden"
                                                                                      placeholder="Type Topic name"
                                                                                      onChange={this.handleInputChange}
                                                                                      value={l1cat.id}
                                                                                      name="cid_"

                                                                        />
                                                                        <br/><br/>
                                                                        <button id="btnSubmit" className="btn btn-primary" type="submit">
                                                                            Add a topic
                                                                        </button>
                                                                        <br/><br/>
                                                                    </Form.Group>
                                                                </Form>

                                                            </div>
                                                            : null
                                                    }



                                                </div>

                                            </div>
                                            <br/>
                                        </div>
                                    </div></div>

                            <br/></div>
                        ))}<br/><br/>

                    </div>
                    <div className="form-group text-left">
                        <Form className="formclass" onSubmit={this.onSubmit} >
                            <Form.Group>
                                <Form.Label>Create a Cluster</Form.Label>
                                <Form.Control type="text"
                                              placeholder="Type Cluster name"
                                              onChange={this.handleInputChange}
                                              value={this.state.cluster}
                                              name="cluster"

                                />
                                <br/>
                                <Form.Control type="text"
                                              placeholder="Add Teachers ID Separated with Comma"
                                              onChange={this.handleInputChange}
                                              value={this.state.teachers_id}
                                              name="teachers_id"

                                />
                                <br/><br/>
                                <button id="btnSubmit" className="btn btn-primary" type="submit">
                                    Create Cluster
                                </button>
                            </Form.Group>
                        </Form>

                    </div>



                </div><br/>

            </div>
        );
    }
}

export default SchoolRepository;
