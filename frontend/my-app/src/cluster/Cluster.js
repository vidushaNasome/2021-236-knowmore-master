import React, {Component} from 'react';
import "./style.css";
import Comments from "./comments/Comments/Comments";
import VideoCluster from "./Video/VideoCluster";
import Other from "./Other/Other";
//import KnowledgeBaseTmp from "../knowledgebase/knowledge/KnowledgeBaseTmp";
import AddKnowledgeBase from "../knowledgebase/knowledge/knowledgebaseTem/AddKnowledgeBase";
import ConceptMap from "../knowledgebase/knowledge/knowledgebaseTem/ConceptMap";
import qs from "query-string";
import axios from "axios";
import {DisplayStudentsAPI, knowledgebasePostParaAPI, repositarysessioncreationAPI, searchAPI} from "../configs/config";
import "./style.css";
import {FaBookmark, FaHeart, FaPenAlt, FaRemoveFormat} from "react-icons/fa"
import Clusterusers from "../Repositary/users/Clusterusers";
import {Button} from "react-bootstrap";
import Dashboard from "./Dashboard";
import {each_bade_count} from "../configs/config3";
import {model_comments} from "../configs/config2";

class Cluster extends Component {

    constructor(props) {
        super(props);

        this.state={
            sessionid:qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).k,
            sessiondet:'',
            topicname:qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).n,
            clustername:qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).y,
            clusterid:qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).x,
            topicid:qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).tid,
            membersince:2021,
            paragraph:'',
            det_id:'',
            paradata:'',
            dataid:'',
            searchretrieve:'',
            badgeCite_count:0,
        }

        //alert(this.state.clusterid)
        this.addToSearchEngine=this.addToSearchEngine.bind(this);


    }

    componentDidMount() {

        axios.get(repositarysessioncreationAPI+this.state.sessionid)
            .then(response => {
                this.setState({ sessiondet: response.data});
                console.log(this.state.sessiondet)

            })
            .catch(function (error) {
                console.log(error);


            })


    }
   async  addToSearchEngine(){
        alert('Book Marking')
      //alert(knowledgebasePostParaAPI+'?sid='+this.state.sessionid+'?ms='+this.state.membersince+'&stid='+sessionStorage.getItem('studentId'))
       await axios.get(knowledgebasePostParaAPI+'?sid='+this.state.sessionid+'&stid='+sessionStorage.getItem('studentId'))
           .then(response => {
               this.setState({paradata: response.data});
               console.log('hello world')
               console.log((this.state.paradata))

               this.setState({paragraph: this.state.paradata[0].details});
               this.setState({det_id: this.state.paradata[0].id});

               this.setState({addedCheck: true})
           })
           .catch(function (error) {
               console.log(error);


           })

       await axios.get(searchAPI+'?sid='+this.state.sessionid+'&stid='+sessionStorage.getItem('studentId')+'&kid='+this.state.det_id)
           .then(response => {
               console.log('DISPLAYING SEARCH API ')
               console.log(response.data)
               this.setState({searchretrieve: response.data});

           })
           .catch(function (error) {
               console.log(error);


           })

       // batch count
       await axios.get(each_bade_count+'?userid='+sessionStorage.getItem('studentId'))
           .then(response => {
               //alert(response.data.badge)
               this.setState({badgeCite_count: response.data.badge})

           })
           .catch(function (error) {
               console.log(error);
           })

       if(this.state.searchretrieve.length===0){
           console.log('inside post')
           await axios.post(searchAPI, {
               name:this.state.paragraph,
               knid:this.state.det_id,
               userid:sessionStorage.getItem('studentId'),
               sessionid:this.state.sessionid,
               clusterid:this.state.clusterid,
               topicid:this.state.topicid,
               membersince:this.state.membersince,
               badgeCite_count:this.state.badgeCite_count,

           })
               .then(response=>{
                   console.log(response);
                   this.setState({ dataid: response.data.id });
                   alert('Successfully Bookmarked!')

               })

           //alert(this.state.dataid)

           axios.put(searchAPI + this.state.dataid+'/', {

           }).then(function (response) {
               //console.log(response);
               alert(response.data.keywordS)
               alert('Successfully summarized and bookmarked!')
               //window.location.reload();

           })

       }

        else {
           console.log('inside put')
           axios.put(searchAPI + this.state.searchretrieve[0].id+'/', {

           }).then(function (response) {
               //console.log(response);
               alert(response.data.keywordS)
               alert('Successfully summarized and bookmarked!')
               //window.location.reload();

           })
       }






    }


    render() {
        return (
            <div>
                <br/>
                    <div className="comments_s" align="left">

                        <FaPenAlt/>Session ID:  &nbsp;{this.state.sessionid}<br/>
                        Session Name: &nbsp; {this.state.sessiondet.sessionname}<br/><br/>
                        Topic: &nbsp;{this.state.topicname}<br/>
                        Cluster: &nbsp;{this.state.clustername}

                        <br/>
                        <br/>

                        <Button  variant="info" onClick={() => this.addToSearchEngine()}>
                            <FaBookmark color="yellow" fontSize="2.0em"/>
                        </Button>

                    </div>

                <div align="right">

                </div>

                <div className="main_s">
                    <div className="rowC">

                        <VideoCluster
                            session_id={this.state.sessionid}
                            session_name={this.state.sessiondet.sessionname}
                            session_topic={this.state.topicname}
                            session_cluster={this.state.clustername}  knid={45}
                            tid={this.state.topicid}
                            cid={this.state.clusterid}

                        />

                        <Comments
                            session_id={this.state.sessionid}
                            session_name={this.state.sessiondet.sessionname}
                            session_topic={this.state.topicname}
                            session_cluster={this.state.clustername}
                            tid={this.state.topicid}
                            cid={this.state.clusterid}
                            knid={45}
                        />


                        <Other
                            session_id={this.state.sessionid}
                            session_name={this.state.sessiondet.sessionname}
                            session_topic={this.state.topicname}
                            session_cluster={this.state.clustername}
                            tid={this.state.topicid}
                            cid={this.state.clusterid}
                            knid={45}/>


                    </div>

                </div>


                {
                    (sessionStorage.getItem('studentId') != null)
                        ?  <div className="full_know">
                            {console.log(sessionStorage.getItem('display school id'))}
                            {console.log(sessionStorage.getItem('schoolId'))}
                            <AddKnowledgeBase
                                session_id={this.state.sessionid}
                                session_name={this.state.sessiondet.sessionname}
                                session_topic={this.state.topicname}
                                session_cluster={this.state.clustername}
                                tid={this.state.topicid}
                                cid={this.state.clusterid}

                                knid={45}/>

                            <ConceptMap
                                knid={45}
                                session_id={this.state.sessionid}
                                session_name={this.state.sessiondet.sessionname}
                                session_topic={this.state.topicname}
                                session_cluster={this.state.clustername}

                            />
                        </div>

                        : null
                }

                {/*teacher*/
                    (sessionStorage.getItem('teacherId') != null)
                        ?  <div className="teacher_s">
                            <AddKnowledgeBase
                                session_id={this.state.sessionid}
                                session_name={this.state.sessiondet.sessionname}
                                session_topic={this.state.topicname}
                                session_cluster={this.state.clustername}
                                tid={this.state.topicid}
                                cid={this.state.clusterid}

                                knid={45}/>
                        <Dashboard/>
                        </div>
                        : null
                }
                {/*school*/
                    (sessionStorage.getItem('schoolId') != null)
                        ?  <div className="shcool_s">
                            <Dashboard/>
                        </div>
                        : null
                }


            </div>
        );
    }
}

export default Cluster;
