import React, {Component} from 'react';
import {DisplayStudentsAPI, knowledgebaseAPI, myclassmatesAPI} from "../configs/config";
import axios from "axios";
import "./classmates.css";

class Classmates extends Component {

    constructor(props) {
        super(props);

        this.state = {
            studentList: [],
            myclassmates:{},
            classlist:[],
            classlistf:[],
            valueforaddclassmates:null


        }

        this.onviewClick = this.onviewClick.bind(this);
        this.onaddfriendClick = this.onaddfriendClick.bind(this);
        this.retrieveclassmates = this.retrieveclassmates.bind(this);
    }

    componentDidMount() {
        axios.get(DisplayStudentsAPI)
            .then(response => {
                this.setState({ studentList: response.data});
                console.log(response.data)

            })
            .catch(function (error) {
                console.log(error);


            })

        axios.get(myclassmatesAPI+'?mid='+sessionStorage.getItem("studentId"))
            .then(response => {
                this.setState({ myclassmates: response.data});
                console.log('classmates')
                console.log(response.data)

                const val =this.state.myclassmates[0].allids;
                this.setState({ valueforaddclassmates: this.state.myclassmates[0].id});
                console.log('classmates1')
                console.log(val)

                const numbersArr = val.split(',');
                //alert('output'+numbersArr[1])
                this.setState({ classlist: numbersArr});

            }).then(

            this.retrieveclassmates

          ).catch(function (error) {
                console.log(error);

            })

       // alert(this.state.classlist)

    }

    retrieveclassmates(){

        let i=0;
        const cl =this.state.classlist

        while (i<=cl.length) {
            i=i+1;
            //alert(DisplayStudentsAPI + cl[i]+cl.length)
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

    render() {

        const {studentList}=this.state;
        const {classlistf}=this.state;

        return (
            <div>
                <div align="center"></div>
                <div className="maindis">

                    <div className="middle">
                        <br/>
                        <h5>
                            Classmates Requests
                        </h5>

                    </div>

                    <div className="left">
                        <br/>
                    <h5> Add Classmates</h5>
                    <br/><br/>

                    {studentList.map((l1cat) => (
                        <div className="">
                            <div className="card text-center font-weight-bold">
                                <div className="card-header text-black">
                                    <div className="row">

                                        <div className="col-3">
                                            <img id="userimage" src={l1cat.image} alt="Avatar"/>
                                        </div>
                                        {l1cat.id}&nbsp;&nbsp;{l1cat.name}

                                </div>
                                    <td>
                                        <button id="bt9" onClick={() => this.onaddfriendClick(l1cat.id)}>Send Classmate Request</button>&nbsp;
                                        <button id="bt9"  onClick={() => this.onviewClick(l1cat.id)}> View Profile </button>
                                    </td>

                                    </div>

                            </div>

                        </div>
                    ))}<br/>

                    </div>
                    {/*<p id="tipbox">Tip: Delete and Update All Level Categories are allowed only for CONSULTANT users. </p>*/}
                    <div className="right">
                        <br/>
                        <h5> My Classmates</h5><br/>

                    {classlistf.map((l1cat) => (
                        <div className="">
                            <div className="card text-center font-weight-bold">
                                <div className="card-header text-black">
                                    <div className="row">

                                        <div className="col-3">
                                            <img id="userimage" src={l1cat.image} alt="Avatar"/>
                                        </div>
                                        {l1cat.name}&nbsp;&nbsp;
                                        <button id="bt3"  onClick={() => this.onviewClick(l1cat.id)}> View Profile </button>
                                        </div>
                                </div></div>

                        </div>
                    ))}<br/>

                    </div>

                </div>


            </div>
        );
    }

    onaddfriendClick(id) {

        axios.put(myclassmatesAPI+this.state.valueforaddclassmates+'/', {
            cid: id

        }).then(function (response) {

            alert('Successfully Added a  Classmate!')
            //window.location.reload();


        })
    }

    onviewClick(id) {
        alert('You Have Click View Classmates Profile '+id)
    }
}

export default Classmates;
