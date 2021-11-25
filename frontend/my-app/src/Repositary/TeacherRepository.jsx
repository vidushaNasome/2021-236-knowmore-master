import React, {Component} from 'react';
import './student.css';
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import {
    DisplayStudentsAPI, DisplayTeachersAPI,
    repositaryclustercreationAPI,
    repositarysessioncreationAPI,
    repositarytopiccreationAPI
} from "../configs/config";
import {Link} from "react-router-dom";
import not from "../Images/Icons_navigation/not.png";
import {Tooltip} from "@varld/popover";
import Clusterusers from "./users/Clusterusers";

class TeacherRepository extends Component {

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
            mycluster:''
        }

        //this.onSubmit=this.onSubmit.bind(this);
        this.displaysessions=this.displaysessions.bind(this);
        this.displaytopics=this.displaytopics.bind(this);
        this.showtopic=this.showtopic.bind(this);
        this.onSubmittopic=this.onSubmittopic.bind(this);
        this.handleInputChange=this.handleInputChange.bind(this);
        this.onviewSessionClick=this.onviewSessionClick.bind(this);
        this.myclustermethod=this.myclustermethod.bind(this);
        this.retrieveclusters=this.retrieveclusters.bind(this);
    }

    componentDidMount() {

        //const id =sessionStorage.getItem('schoolId')
        const clusters=this.myclustermethod()
        //alert(clusters)
        console.log(clusters)

    }
    async myclustermethod(){

        let mc='';
        let array_clusters_id='';

        await axios.get(DisplayTeachersAPI+sessionStorage.getItem('teacherId'))
            .then(response => {
                mc =response.data.clusterIds
                array_clusters_id = mc.split(',');
                this.setState({  mycluster: array_clusters_id});

            })
            .catch(function (error) {
                console.log(error);


            })

        if(array_clusters_id !== ''){
            this.retrieveclusters();
        }
        return array_clusters_id

    }

    retrieveclusters(){

        this.state.mycluster.forEach(function(item) {

            axios.get(repositaryclustercreationAPI+item)
                .then(response => {
                    //this.setState({  allclusters: response.data});
                    //console.log(response.data)

                    this.setState(prevState => ({
                        allclusters: [...prevState.allclusters, response.data]
                    }))

                })
                .catch(function (error) {
                    console.log(error);


                })

        }.bind(this));

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


    /*onSubmit(e){
        e.preventDefault();
        this.name=this.state.cluster;
        axios.post(repositaryclustercreationAPI, {
            clustername: this.name,
            schoolid:sessionStorage.getItem('schoolId')

        })
            .then(function (response) {
                console.log(response);
                window.location.reload();

            })


    }*/

    onSubmittopic(id){
        alert(this.state.cid_)
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
            <div className="full_view_teacher"><br/>
                <div className="student">
                    <h2> My Teaching Clusters</h2>
                    <h4 className="text-center text-secondary">Teacher ID: {sessionStorage.getItem('teacherId')} </h4>

                    <div className="teacher_view">
                        <h6 className="text-left text-primary border-danger"></h6>
                        {allclusters.map((l1cat) => (
                            <div className="col-md-16">
                                <div className="card text-center font-weight-bold">
                                    <div className="card-header text-black">
                                        <div className="" align="center">
                                            <div className="">
                                                {l1cat.id}&nbsp;&nbsp;
                                                {l1cat.clustername}<br/>
                                                <Clusterusers cid={l1cat.id}/>
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
                                                                                                        <div className="">
                                                                                                            <div className="card text-center font-weight-bold">
                                                                                                                <div className="ind_session">
                                                                                                                <div className="card-header text-black">
                                                                                                                    {l3cat.id}{l3cat.sessionname}&nbsp;&nbsp;
                                                                                                                    <br/> <br/>
                                                                                                                    <Link to={"/cluster"+"/?k="+l3cat.id+'&n='+l2cat.topicname+"&y="+l1cat.clustername+"&x="+l1cat.id+"&tid="+l2cat.id} id="bt4" style={{  textDecoration: 'none' }}>
                                                                                                                        Navigate to Page
                                                                                                                    </Link>&nbsp;&nbsp;
                                                                                                                    <Link to={"/scoreboard"+"/?k="+l3cat.id+'&n='+l2cat.topicname+"&y="+l1cat.clustername+"&cid="+l1cat.id+"&tid="+l2cat.id} id="bt4" style={{  textDecoration: 'none' }}>
                                                                                                                        Score Board
                                                                                                                    </Link>


                                                                                                                </div>
                                                                                                                </div>
                                                                                                                </div>

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

                                                                        <br/></div>
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

                                <br/> </div>
                        ))}<br/><br/>

                    </div>
                    <div className="form-group text-left">

                    </div>



                </div>

            </div>
        );
    }
}

export default TeacherRepository;