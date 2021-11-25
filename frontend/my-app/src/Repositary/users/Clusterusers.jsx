import React, {Component} from 'react';
import "./cluserusers.css";
import axios from "axios";
import {DisplayStudentsAPI, myclassmatesAPI, repositaryclustercreationAPI} from "../../configs/config";
import PropTypes from "prop-types";
import ComponentHeading from "../../knowledgebase/knowledge/components/ComponentHeading";
import {Form} from "react-bootstrap";
import {FaUserFriends} from "react-icons/fa"

class Clusterusers extends Component {

    static get propTypes() {
        return {
            cid: PropTypes.number,

        }
    }

    constructor(props) {
        super(props);

        this.state={
            classmates:{},
            valueforaddclassmates:{},
            classlist:[],
            classlistf:[],
            display:false,
        }

        this.retrieveclassmates = this.retrieveclassmates.bind(this);
        this.hideclassmates = this.hideclassmates.bind(this);
    }

    componentDidMount() {

        //alert(repositaryclustercreationAPI+this.props.cid)

        axios.get( repositaryclustercreationAPI+this.props.cid)
            .then(response => {
                this.setState({ classmates: response.data});
                console.log('classmates - cluster')
                console.log(response.data)

                const val =response.data.allids;
                console.log(val)

                this.setState({ valueforaddclassmates: response.data.id});

                const numbersArr = val.split(',');

                this.setState({ classlist: numbersArr});

                console.log(this.state.classlist)

            }).then(


        ).catch(function (error) {
            console.log(error);

        })

        console.log('classmates100')
        console.log(this.state.classlist)


    }

    retrieveclassmates(cl){
        //alert('hello')

        this.setState({
            display: true
        })

        let i=-1;

        console.log('display classmates')
        console.log(cl)

        this.setState({classlistf:[]})

        while (i<=cl.length) {
            i=i+1;

            axios.get(DisplayStudentsAPI + cl[i])
                .then(response => {

                    this.setState({
                        classlistf: this.state.classlistf.concat(response.data)
                    })


                })
                .catch(function (error) {
                    console.log(error);


                })

        }

    }

    hideclassmates(){
        //alert('xx')
        this.setState({
            display: false
        })
    }


    render() {

        const {classlist} = this.state
        return (
            <div className="users_all_view" align="center">
                <br/>
                <br/>
                {<button id="bt_show"  onClick={() => this.retrieveclassmates(classlist)}> <FaUserFriends/> </button>}

                <div className="" align="center">
                    {
                        (this.state.display)
                            ?
                            <div className="myclassmates">{this.state.classlistf.map((l1cat) => (
                                    <div className="">
                                        <div className="card text-center">
                                            <div className="card-header">
                                                <div className="row">
                                                    <div className="class_show_users">
                                                        <img id="userimage_cluster" src={l1cat.image} alt="Avatar"/>&nbsp;
                                                        {l1cat.name}&nbsp;
                                                        <button id="bt5"  onClick={() => this.onviewClick(l1cat.id)}> View Profile </button>
                                                    </div>

                                                </div>
                                            </div></div><br/>

                                    </div>

                            ))}
                                {<button id="bt5"  onClick={() => this.hideclassmates()}> Hide </button>}

                            </div>
                            : null
                    }
                </div>

                <br/>



                <br/>

            </div>
        );
    }
}

export default Clusterusers;
