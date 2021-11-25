import React, {Component} from 'react';
import "./style_know_2.css"
import RepositaryKnowldegebase from "./knowledgebaseTem/Repositary_knowldegebase";
import {AddknowledgeModel} from "./Model/AddknowledgeModel";
import {AddknowledgeTemplateModel} from "./Model/AddknowledgeTemplateModel";
import home from "../../Images/Icons_navigation/home.png";
import {Link} from "react-router-dom";
import s2 from "../../Images/usersimages/i0.jpg"
import PropTypes from "prop-types";

class KnowledgeBaseTmp extends Component {

    static get propTypes() {
        return {
            id: PropTypes.string,

        }
    }

    constructor(props) {
        super(props)
        this.state = {
            knowldegebase:'uncheck',
            addModalShow:false,
            addModalShowTemplate:false,
            knowTem:[{
                clusterid:100,
                topicid:1,
                sessionid:5,
                tname:'ICT, Cluster id-100,Topic id-1, sessionid-5'
            },{
                clusterid:200,
                topicid:12,
                sessionid:55,
                tname:'Computing History  - Cluster id-100,Topic id-1, sessionid-5'
            },
                {
                    clusterid:500,
                    topicid:10,
                    sessionid:59,
                    tname:'Programming is easy  - Cluster id-100,Topic id-1, sessionid-5'
                }
            ]
        }
        this.LoadKnowledgebase=this.LoadKnowledgebase.bind(this);

    }

    LoadKnowledgebase(){

    }

    render() {
        let addModalClose=()=>this.setState({addModalShow:false})
        let addModalCloseTemplate=()=>this.setState({addModalShowTemplate:false})
        return (
            <div className="knowb">

                <br/><h5 align='center'>My KnowledgeBase</h5> <br/>

                <div className="col-lg-3 cta-btn-container text-center align-content-center">

                    <img  src={s2}  alt="Avatar"/>

                    {/*<button className="btn-amber" onClick={()=>this.setState({addModalShow:true})}>Add External Knowldegebase</button><br/><br/>*/}


                </div>




            </div>
        );
    }
}

export default KnowledgeBaseTmp;
