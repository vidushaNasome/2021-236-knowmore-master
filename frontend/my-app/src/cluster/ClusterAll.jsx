import React, {Component} from 'react';
import "./style.css"
import axios from "axios";
import {
    DisplayStudentsAPI,
    DisplayTeachersAPI,
    knowledgebasePostParaAPI,
    repositaryclustercreationAPI
} from "../configs/config";
import {allcluters} from "../configs/config2";
import {Link} from "react-router-dom";
import StudentRepository from "../Repositary/StudentRepository";
import {Button} from "react-bootstrap";
import {FaArrowAltCircleLeft, FaHome, FaInfo, FaJoint} from "react-icons/fa";

class ClusterAll extends Component {

    constructor(props) {
        super(props);

        this.state={
            allclusters:'',
            mycluster:'',
            finalclusters:'',

        }

        this.join_to_cluster=this.join_to_cluster.bind(this);
        this.showinfo=this.showinfo.bind(this);
        this.clusterloadingmethods=this.clusterloadingmethods.bind(this);
    }

    componentDidMount() {
        this.clusterloadingmethods();

    }

    async clusterloadingmethods(){
        let mc='';
        let array_clusters_id='';


        await axios.get(allcluters)
            .then(response => {
                this.setState({allclusters: response.data});
                //console.log('allclusters')
                //console.log(this.state.allclusters)
            })
            .catch(function (error) {
                //console.log(error);


            })

        await axios.get(DisplayStudentsAPI+sessionStorage.getItem('studentId'))
            .then(response => {
                mc =response.data.clusterIds
                array_clusters_id = mc.split(',');
                this.setState({  mycluster: array_clusters_id});

            })
            .catch(function (error) {
                //console.log(error);


            })

        //Manage a final Array without joined ones!

        //all arrays
        await this.state.allclusters.forEach(function(cluster) {
            //console.log(cluster);
            //my cluster

            let check = 'no';

            if (this.state.mycluster != ''){
                this.state.mycluster.forEach(function(mycluster) {
                    // console.log(cluster);

                    const check_existence_finalarray = this.state.finalclusters.includes(cluster)
                    const check_existence_myarray = this.state.mycluster.includes(cluster.id.toString())

                    if(check_existence_finalarray || check_existence_myarray){
                        check= 'yes'
                    }

                    if(check === 'no'){

                        console.log('mayarray')
                        console.log(this.state.mycluster)
                        console.log( check_existence_myarray)
                        console.log('final array')
                        console.log( check_existence_finalarray)

                        if((mycluster!==cluster.id && !check_existence_finalarray) && !check_existence_myarray){
                            console.log('adding   '+ cluster.id)
                            this.setState(prevState => ({
                                finalclusters: [...prevState.finalclusters, cluster]
                            }))

                        }else{

                        }

                    }


                }.bind(this));

            }




        }.bind(this));

        //console.log('myclsuters')
        //console.log(this.state.finalclusters)

    }


    join_to_cluster(id){
        //alert('adding to clusters')

        //Update User

        try {
            axios.put(DisplayStudentsAPI + sessionStorage.getItem('studentId')+'/', {
                clusterIds: id
            }).then(function (response) {
                //console.log(response);
                //alert('success')
                //window.location.reload();

            })
        }catch (e) {

        }

        //Update Repository

        try {
            axios.put(repositaryclustercreationAPI + id+'/', {
                allids: sessionStorage.getItem('studentId')
            }).then(function (response) {
                //console.log(response);
                alert('Successfully Added To ')
                window.location.reload();

            })
        }catch (e) {

        }

        //reload Page

    }
    showinfo(id){
        alert('show info')

    }

    render() {
        return (
            <div>
                <br/>
                <div className="clusterHeading"> <h2> Clusters </h2> </div>

                <div>

                    {
                        (this.state.finalclusters !== '')
                            ?
                            <div>

                                {this.state.finalclusters.map((cluster)=>(
                                   <div>
                                       <div className="">
                                           <div className="card text-center font-weight-bold">
                                               <div className="custer_session">
                                                   <div className="card-header text-black">
                                                       <br/>
                                                       {cluster.id}
                                                       {cluster.clustername}&nbsp;&nbsp;
                                                       <br/>
                                                       Created by --- &nbsp;&nbsp; School ID: {cluster.schoolid} <br/>
                                                       Admins --- &nbsp;&nbsp; Teachers: {cluster.schoolid}
                                                   </div>
                                                   <br/>
                                                   <div>
                                                       <tr>
                                                           <td>
                                                               <div>
                                                                   <Button id="bt1" variant="info" onClick={() => this.join_to_cluster(cluster.id)}>
                                                                       <FaArrowAltCircleLeft color="yellow"  fontSize="1.0em"/> Request To Join
                                                                   </Button>
                                                               </div>

                                                           </td>
                                                           <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                                           <td>
                                                               <Button id="bt1" variant="info" onClick={() => this.showinfo()}>
                                                                   <FaInfo color="yellow"  fontSize="1.0em"/> Check More Info
                                                               </Button>
                                                           </td>
                                                           <td>&nbsp;&nbsp;</td>
                                                           <td> </td>
                                                       </tr>

                                                   </div>

                                               </div></div><br/>

                                       </div>
                                   </div>
                                ))}
                            </div>
                            :
                            null
                    }



                </div>



            </div>
        );
    }
}

export default ClusterAll;