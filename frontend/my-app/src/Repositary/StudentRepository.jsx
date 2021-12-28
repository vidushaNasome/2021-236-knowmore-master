import React, {Component} from 'react';
import './student.css';
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import {
    DisplayStudentsAPI,
    DisplayStudent_ch,
    repositaryclustercreationAPI,
    repositarysessioncreationAPI,
    repositarytopiccreationAPI
} from "../configs/config";
import {Link} from "react-router-dom";
import not from "../Images/Icons_navigation/not.png";
import {Tooltip} from "@varld/popover";
import Clusterusers from "./users/Clusterusers";
import {authAxios} from "../configs/config";

class StudentRepository extends Component {

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

       // this.onSubmit=this.onSubmit.bind(this);
        this.displaysessions=this.displaysessions.bind(this);
        this.displaytopics=this.displaytopics.bind(this);
        this.showtopic=this.showtopic.bind(this);
       // this.onSubmittopic=this.onSubmittopic.bind(this);
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

        await authAxios.get(DisplayStudent_ch+'?id='+sessionStorage.getItem('studentId'))
            .then(response => {
                console.log('clusters');
                console.log(response.data.clusters)
                mc =response.data.clusters
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

        /*axios.get(repositaryclustercreationAPI+'?sid='+id)
            .then(response => {
                this.setState({  allclusters: response.data});
                console.log(response.data)

            })
            .catch(function (error) {
                console.log(error);


            })*/

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
            <div className="full_view_student"><br/>
                <div id="student">
                    <h2> My Clusters</h2>
                    <h4 className="text-center text-secondary">Student ID: {sessionStorage.getItem('studentId')} </h4>
                    <div>
                        <h6 className="text-left text-primary border-danger"></h6>
                        {allclusters.map((l1cat) => (
                            <div className="col-md-16 border-dark ">
                                <div className="card text-center font-weight-bold">
                                    <div className="card-header text-black">
                                        <div className="" align="center">
                                            <div className="">
                                                {l1cat.id}&nbsp;&nbsp;
                                                {l1cat.clustername}
                                                <br/>
                                                <Clusterusers cid={l1cat.id}/>
                                            </div>
                                            {/*<Link to={"/scoreboard/?y="+l1cat.clustername+"&cid="+l1cat.id} id="bt4" style={{  textDecoration: 'none' }}>
                                                Score Board
                                            </Link>*/}
                                            <div className="form-group text-left border-dark" >
                                                <div className="form-group text-left">
                                                    <br/>
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
                                                                                    <br/>
                                                                                    <button id="bt1" variant="primary" onClick={() => this.onviewSessionClick(l1cat.id, l2cat.id)}> View Sessions</button>

                                                                                    {//starting sessions
                                                                                        (this.state.showsession && l2cat.id === this.state.checkidsession)
                                                                                            ? <div className= " col-md-16">

                                                                                                <div className="session">
                                                                                                    <div className="text-primary border-danger"> Topics' Sessions </div>

                                                                                                    {this.state.showallsessions.map((l3cat) => (
                                                                                                        <div className="">
                                                                                                            <div className="card text-center font-weight-bold">
                                                                                                                <div className="ind_session">
                                                                                                                <div className="card-header text-black">
                                                                                                                        <br/>
                                                                                                                        {l3cat.id}
                                                                                                                        {l3cat.sessionname}&nbsp;&nbsp;
                                                                                                                        <Link to={"/cluster"+"/?k="+l3cat.id+'&n='+l2cat.topicname+"&y="+l1cat.clustername+"&x="+l1cat.id+"&tid="+l2cat.id}  target="_blank" id="bt4" style={{  textDecoration: 'none' }}>
                                                                                                                            Navigate to Page
                                                                                                                        </Link>&nbsp;&nbsp;
                                                                                                                        <Link to={"/scoreboard"+"/?k="+l3cat.id+'&n='+l2cat.topicname+"&y="+l1cat.clustername+"&cid="+l1cat.id+"&tid="+l2cat.id} target="_blank" id="bt4" style={{  textDecoration: 'none' }}>
                                                                                                                            Score Board
                                                                                                                        </Link>
                                                                                                                        <br/>
                                                                                                                    </div>
                                                                                                                    <br/>

                                                                                                                </div></div><br/>

                                                                                                        </div>
                                                                                                    ))}<br/>


                                                                                                </div>

                                                                                                <br/></div>
                                                                                            : null
                                                                                    }<br/>



                                                                                </div></div>

                                                                            <br/></div>
                                                                    ))}<br/>


                                                                </div>

                                                            </div>
                                                            : null
                                                    }



                                                </div>

                                            </div>
                                            <br/>
                                        </div>
                                    </div>
                                </div>

                            <br/><br/></div>
                        ))}<br/><br/>

                    </div>
                    <div className="form-group text-left">
                    </div>



                </div>

                <br/><br/> </div>
        );
    }
}

export default StudentRepository;