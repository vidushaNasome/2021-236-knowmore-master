import React, {Component} from 'react';
import axios from "axios";
import {
    commentsAPI,
    DisplayStudentsAPI,
    knowledgebasePostParaAPI, mostactive_modeloutput_API, mostactiveAPI,
    repositaryclustercreationAPI
} from "../../../configs/config";
import {FaHeart, FaRegThumbsUp, FaShare, FaThumbsUp, FaUserFriends} from "react-icons/fa";
import qs from "query-string";
import {Button, Card, Form} from "react-bootstrap";
import Badge from "../../badgeCetificate/Badge";
import {Link} from "react-router-dom";
import not from "../../../Images/Icons_navigation/not.png";
//import * as cluster from "cluster";
import Comments from "../Comments/Comments";
import "./scoreboard.css";
import imagegold from '../../images/gold cup.jpg'

//mosatctiveform
//mostactive changes
//interaction..
class MostInteractive extends Component {

    constructor(props) {
        super(props);

        this.state={
            classmates:{},
            valueforaddclassmates:{},
            classlist:[],
            classlistf:[],
            display:false,
            cid:qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).cid,
            //userid:1234,
            tid:qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).tid,
            userid:'',
            clusterid:'',
            sessionid:qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).k,
            topicid:'',
            Knowledgebase:null,
            AdditionalLinks:'',
            //AdditionalLinksCount:null,
            //Comments:'',
            //CommentsCount:null,
            //ReactionsLike:1,
            //ReactionsLove:null,
            //ReactionsCry:null,
            NoOfPosts:'',
            Reactions:'',
            Replies:'',
            Marks:'',
            displayuserswithimages:[],
            cal_inter:false,
            update_inter:false,

        }

        this.retrieveclassmates = this.retrieveclassmates.bind(this);
        this.hideclassmates = this.hideclassmates.bind(this);
        this.handleInputChange=this.handleInputChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.like=this.like.bind(this);
        //this.retrieveuserdetails = this.retrieveuserdetails.bind(this);
        this.retrieveactivestatus=this.retrieveactivestatus.bind(this);
        this.detailsactive=this.detailsactive.bind(this);
        this.putmethodforactivestatus=this.putmethodforactivestatus.bind(this);
        this.onSubmitUpdateInteractions=this.onSubmitUpdateInteractions.bind(this);
        this.retrivemostActive=this.retrivemostActive.bind(this);
        this.getusermethod=this.getusermethod.bind(this);
        this.showinter_det=this.showinter_det.bind(this);
        this.showinter_cal_act=this.showinter_cal_act.bind(this);

    }


    componentDidMount() {

        //alert(repositaryclustercreationAPI+this.props.cid)

        axios.get( repositaryclustercreationAPI+this.state.cid)
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

        this.retrivemostActive()

    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = (e,id) => {
        e.preventDefault();

        try {

            axios.post(commentsAPI, {
                userid:id,
                clusterid:this.state.cid,
                sessionid:this.state.sessionid,
                topicid:this.state.tid,
                //Comments: this.state.Comments,
                AdditionalLinks: this.state.AdditionalLinks,
                Knowledgebase: this.state.Knowledgebase,
                // AdditionalLinksCount: this.state.AdditionalLinksCount,
                //CommentsCount: this.state.CommentsCount,
                //ReactionsLike: this.state.ReactionsLike,
                NoOfPosts: this.state.NoOfPosts,
                Reactions: this.state.Reactions,
                Replies: this.state.Replies,
                Marks: this.state.Marks,
                mostactiveforcluster:'',


            })
                .then(response=>{
                    console.log(response);
                    alert('Successfully Added Interaction details. Proceed with the score.')
                    window.location.reload();

                })

        }catch (e) {

            console.log(e)

        }


    }

    like() {
        //alert('Like disp')
        this.setState({ReactionsLike: 0})


    }
    async showinter_det(id){
        // alert('det'+id)

        //retrieving the data to update
        await axios.get(mostactive_modeloutput_API + id)
            .then(response => {
                console.log(response)
                //variables
                this.setState({NoOfPosts: response.data.NoOfPosts}) //NoOfPosts
                this.setState({Reactions: response.data.Reactions})//Reactions
                this.setState({AdditionalLinks: response.data.AdditionalLinks}) //AdditionalLinks
                this.setState({Replies: response.data.Replies})//Replies
                this.setState({Knowledgebase: response.data.Knowledgebase})//Knowledgebase
                this.setState({Marks: response.data.Marks})//Marks

            }).then(

            ).catch(function (error) {
                console.log(error);

            })

        if(this.state.update_inter){
            this.setState({ update_inter: false})
            this.setState({cal_inter: true})
        }else{
            this.setState({ update_inter: true})
            this.setState({cal_inter: false})
            //this.setState({addeddetloading: false})

        }

    }
    showinter_cal_act(id){
        alert('cal'+id)
        if(this.state.cal_inter){
            this.setState({cal_inter: false})
            this.setState({ update_inter: true})
        }else{
            this.setState({cal_inter: true})
            this.setState({update_inter: false})
            //this.setState({addeddetloading: false})
        }

    }

    async retrivemostActive() {

        await axios.get(mostactiveAPI + '?clusterid=' + this.state.cid)
            .then(response => {

                const object = JSON.parse(response.data.mostactive);

                this.setState({mostactiveforcluster: object});

            }).then(

            ).catch(function (error) {
                console.log(error);

            })

        //alert(this.state.mostactiveforcluster)

        if(this.state.mostactiveforcluster != null && this.state.mostactiveforcluster != undefined){
            this.state.mostactiveforcluster.forEach(function(item) {
                console.log('display item')
                console.log(item);

                this.getusermethod(item);

            }.bind(this));

        }



    }

    getusermethod(j){

        console.log('get jj method')
        axios.get( DisplayStudentsAPI+j.fields.userid)
            .then(response =>{

                const mostactiveuser= {
                    Name:response.data.name,
                    Activevalue:j.fields.MostActive,
                    image:response.data.image,
                    id:response.data.id
                }

                console.log(this.state.displayuserswithimages)

                this.setState(prevState => ({
                    displayuserswithimages: [...prevState.displayuserswithimages, mostactiveuser]
                }))


            }).then(

        ).catch(function (error) {
            console.log(error);

        })

    }

    detailsactive = async (cl) => {

    }


    async retrieveactivestatus(sid) {

        let returnstate='';

        console.log(commentsAPI+'?stid='+sid+'&ssid='+this.state.cid)

        await axios.get(commentsAPI+'?stid='+sid+'&ssid='+this.state.cid )
            .then(response => {
                returnstate=response.data[0]
                //console.log('returnstate')
                // console.log(returnstate[0])



            })
            .catch(function (error) {
                console.log(error);
            })

        return returnstate




    }

    retrieveclassmates = async (cl) =>  {
        //alert('hello')
        this.setState({
            display: true
        })

        let i=-1;

        console.log('display classmates')
        console.log(cl)



        this.setState({classlistf:[]})

        while (i<=cl.length) {
            i=i+1
            let yy=''

            const response = await axios.get(DisplayStudentsAPI + cl[i])

            console.log('aaaaaaa')
            console.log(response)

            //alert('after calling 1')

            console.log('displaying outputs')

            let ac =  await this.retrieveactivestatus(response.data.id)
            console.log('ooo'+ac)

            const act={
                userdata:response.data,
                activestatusdata:ac

            }

            console.log(act)

            this.setState({
                classlistf: this.state.classlistf.concat(act)
            })


        }

    }



    hideclassmates(){
        //alert('xx')
        this.setState({
            display: false
        })
    }

    putmethodforactivestatus(k){

        //alert('You Click Active Status.')

        try {
            axios.put(commentsAPI + k+'/', {

            }).then(function (response) {
                //console.log(response);
                alert('Successfully Calculated Values!')
                window.location.reload();

            })
        }catch (e) {

        }

    }

    onSubmitUpdateInteractions(e,id){
        //alert('interaction')
        e.preventDefault()

        alert(mostactive_modeloutput_API + id+'/')

        try {
            axios.put(mostactive_modeloutput_API + id+'/', {
                // details: this.state.paragraph
                NoOfPosts: this.state.NoOfPosts ,//NoOfPosts
                Reactions: this.state.Reactions,
                AdditionalLinks: this.state.AdditionalLinks,
                Replies: this.state.Replies,
                Knowledgebase: this.state.Knowledgebase


            }).then(function (response) {
                //console.log(response);
                alert('Successfully Updated. Proceed with the score.')
                // window.location.reload();

            })
        }catch (e) {
            console.log(e)
        }
    }



    render() {
        const {classlist} = this.state
        const {displayuserswithimages} = this.state

        //console.log('most active')
        //console.log({mostactiveforcluster})

        return (
            <div>

                <br/>

                <br/>
                <h1>
                    Score Board
                    <br/>
                    <br/>
                </h1>

                <div classname="mostactive_3" align="center">
                    {/* //starting displaying most active students*/}
                    <h4> Most Interactive Students On Session ID: {this.state.sessionid}</h4>
                    {
                        <div>
                            {console.log('most active students..........')}
                            {console.log(displayuserswithimages)}
                            {(displayuserswithimages != undefined && displayuserswithimages != null )
                                ?
                                <div>
                                    <tr>
                                        {this.state.displayuserswithimages.map((variable) => (

                                            <td> <div>
                                                <Card className="card-style">
                                                    <Card.Body>
                                                        <Card.Title>Congratulations ✨</Card.Title>
                                                        {console.log(variable.Name)}
                                                        <Link to={"/viewprofile/"+variable.id} style={{  textDecoration: 'none' }}>
                                                            <img id="userimage_scoreboard" src={variable.image} alt="Avatar"/> &nbsp; &nbsp;
                                                        </Link>

                                                        <br/>
                                                        <h4>{variable.Name} </h4><br/>
                                                        <h3>{variable.Activevalue}</h3>

                                                        {
                                                            (variable.id == sessionStorage.getItem('studentId'))
                                                                ?
                                                                <tr>
                                                                    <Link to="/xxx" id="nn" style={{  textDecoration: 'none' }}>
                                                                        <FaHeart color="white" color="white" fontSize="2.0em"/>
                                                                    </Link>
                                                                    <Link to="/xxx" id="nn" style={{  textDecoration: 'none' }}>
                                                                        <FaShare color="white" color="white" fontSize="2.0em"/>
                                                                    </Link>
                                                                </tr>

                                                                : <div>
                                                                    <br/>
                                                                </div>
                                                        }

                                                    </Card.Body>
                                                </Card>

                                                <br/>


                                            </div></td>

                                        ))}
                                    </tr></div>:
                                null
                            }
                        </div>}

                    {/*//****ending displaying most active students*/}
                    <br/>
                    <br/>

                </div>
                {<button id="bt_show"  onClick={() => this.retrieveclassmates(classlist)}> <FaUserFriends/> </button>}

                <div>
                    {
                        (this.state.display)
                            ?
                            <div className="">{this.state.classlistf.map((l1cat) => (
                                <div className="">
                                    <div className="card text-center">
                                        <div className="card-header">
                                            <div className="row">
                                                <div className="class_show_users">
                                                    {/*Calculated active status for all users for the cluster displays here*/}
                                                    {
                                                        ((l1cat.activestatusdata != null) && (l1cat.activestatusdata != ""))
                                                            ? <div>
                                                                <img id="userimage_cluster" src={l1cat.userdata.image} alt="Avatar"/>&nbsp;
                                                                {l1cat.userdata.name}&nbsp;

                                                                <h2>Most Interactive student Status: {l1cat.activestatusdata.MostActive}</h2>
                                                                <button id="bt5"  onClick={() => this.onviewClick(l1cat.userdata.id)}> View Profile </button>

                                                                <div>
                                                                    {console.log('printing......')}
                                                                    {console.log(l1cat)}
                                                                    <br/><br/>
                                                                    <div>
                                                                        {
                                                                            console.log(l1cat.userdata.id+'xxxxxxxxxxxxxx'+sessionStorage.getItem('studentId'))
                                                                        }
                                                                        {
                                                                            /*Calculated active status for the current login user for the cluster displays here*/
                                                                            (l1cat.userdata.id == sessionStorage.getItem('studentId'))
                                                                                ?
                                                                                <div>

                                                                                    <Button id="btnSubmit" variant="info" onClick={()=>this.showinter_det(l1cat.activestatusdata.id)}>
                                                                                        Update Interaction Details
                                                                                    </Button> &nbsp; &nbsp;

                                                                                    <Button id="btnSubmit" variant="info" onClick={()=>this.showinter_cal_act(l1cat.activestatusdata.id)}>
                                                                                        Calculate Interactivity Score
                                                                                    </Button>

                                                                                    {this.state.update_inter?

                                                                                        <div className="updateinteractiondetails">
                                                                                            <br/>
                                                                                            <h6>Update Interaction Details</h6><br/>
                                                                                            <div align="center">
                                                                                                <div className="form1" >

                                                                                                    <Form className="formclass" onSubmit={(e)=> this.onSubmitUpdateInteractions(e,l1cat.activestatusdata.id)} >

                                                                                                        <div className="detdisplay">

                                                                                                            StudentID: {l1cat.userdata.id}
                                                                                                            <br/>
                                                                                                            <br/>

                                                                                                            {<Form.Group>
                                                                                                                <h1> Interaction Details </h1>
                                                                                                                {/* <Form.Label>Number Of Posts</Form.Label> */}
                                                                                                                <input
                                                                                                                    type="number"
                                                                                                                    placeholder="Number Of Posts"
                                                                                                                    onChange={this.handleInputChange}
                                                                                                                    value={this.state.NoOfPosts}
                                                                                                                    //value={2}
                                                                                                                    name="NoOfPosts"

                                                                                                                />
                                                                                                            </Form.Group>}
                                                                                                            <br/>

                                                                                                            {<Form.Group>
                                                                                                                {/* <Form.Label>Reactions</Form.Label> */}
                                                                                                                <input
                                                                                                                    type="number"
                                                                                                                    placeholder="Reactions"
                                                                                                                    onChange={this.handleInputChange}
                                                                                                                    value={this.state.Reactions}
                                                                                                                    name="Reactions"
                                                                                                                />
                                                                                                            </Form.Group>}
                                                                                                            <br/>

                                                                                                            {<Form.Group>
                                                                                                                {/*<Form.Label>AdditionalLinks</Form.Label> */}
                                                                                                                <input
                                                                                                                    type="number"
                                                                                                                    placeholder="AdditionalLinks"
                                                                                                                    onChange={this.handleInputChange}
                                                                                                                    value={this.state.AdditionalLinks}
                                                                                                                    name="AdditionalLinks"

                                                                                                                />
                                                                                                            </Form.Group>}
                                                                                                            <br/>

                                                                                                            {<Form.Group>
                                                                                                                {/* <Form.Label>Replies</Form.Label> */}
                                                                                                                <input
                                                                                                                    type="number"
                                                                                                                    placeholder="Replies"
                                                                                                                    onChange={this.handleInputChange}
                                                                                                                    value={this.state.Replies}
                                                                                                                    name="Replies"
                                                                                                                />
                                                                                                            </Form.Group>}
                                                                                                            <br/>

                                                                                                            {<Form.Group>
                                                                                                                {/* <Form.Label>Knowledgebase</Form.Label> */}
                                                                                                                <input
                                                                                                                    type="number"
                                                                                                                    placeholder="Knowledgebase"
                                                                                                                    onChange={this.handleInputChange}
                                                                                                                    value={this.state.Knowledgebase}
                                                                                                                    name="Knowledgebase"
                                                                                                                />
                                                                                                            </Form.Group>}

                                                                                                            <br/>

                                                                                                            {<Form.Group>
                                                                                                                {/* <Form.Label>Knowledgebase</Form.Label> */}
                                                                                                                <input
                                                                                                                    type="number"
                                                                                                                    placeholder="Marks"
                                                                                                                    onChange={this.handleInputChange}
                                                                                                                    value={this.state.Marks}
                                                                                                                    name="Marks"
                                                                                                                />
                                                                                                            </Form.Group>}

                                                                                                            <br/>


                                                                                                            {/*<div className="row">
                                                                                                { //Check if message failed
                                                                                                    (this.state.ReactionsLike===1)
                                                                                                        ? <Button onClick={this.like} value={{ color: "red", className: "global-class-name" }}>

                                                                                                            <FaRegThumbsUp />
                                                                                                        </Button>
                                                                                                        : <Button onClick={this.like}>

                                                                                                            <FaThumbsUp/>
                                                                                                        </Button>
                                                                                                }
                                                                                            </div> */}

                                                                                                            <br/>

                                                                                                            {/*calling the Badge.js class (inside badgeCetificte folder) and "helloworld" in the Badge.js is displayed here
                                                                                            <Badge/>
                                                                                            */}

                                                                                                            {/*linking to the newly created Badge.js file. by clicking the image ico here it load to the Badge.js
                        class*/}
                                                                                                            {/*
                                                                                            <Link to="/badge" id="nn" style={{  textDecoration: 'none' }}>
                                                                                                <img src={not} className="mr-3" alt=""/>
                                                                                            </Link>
                                                                                            */}


                                                                                                            <Button id="btnSubmit" variant="primary" type="submit">
                                                                                                                Update Interaction Details
                                                                                                            </Button>
                                                                                                            <br/>
                                                                                                            <br/>


                                                                                                        </div>


                                                                                                    </Form>
                                                                                                </div>



                                                                                            </div>



                                                                                        </div>

                                                                                        :null}

                                                                                    {this.state.cal_inter ?

                                                                                        <div className="calculatetheactivity">
                                                                                            <br/>
                                                                                            <h6>Calculate Ineractivity Score</h6><br/>

                                                                                            <Button id="btnSubmit" variant="primary" onClick={()=>this.putmethodforactivestatus(l1cat.activestatusdata.id)}>
                                                                                                Calculate Active Status
                                                                                            </Button>

                                                                                        </div>

                                                                                        :null}

                                                                                </div>
                                                                                : null
                                                                        }
                                                                    </div>



                                                                </div>

                                                            </div>
                                                            : <div>
                                                                { /*Not Calculated active status for the current login user for the cluster displays here*/
                                                                    ((l1cat.userdata.id == sessionStorage.getItem('studentId'))&& (sessionStorage.getItem('studentId')!=null))
                                                                        ?
                                                                        <div className="addInteraction">
                                                                            <br/><br/>
                                                                            <div>
                                                                                <h5>Not Calculated - Add Interaction Details</h5>
                                                                                <div className="">

                                                                                    <Form className="formclass1" onSubmit={(e)=> this.onSubmit(e,l1cat.userdata.id)} >

                                                                                        <div className="">

                                                                                            StudentID: {l1cat.userdata.id}
                                                                                            <br/>
                                                                                            <br/>

                                                                                            {<Form.Group>
                                                                                                {/* <Form.Label>Comments</Form.Label> */}
                                                                                                <input
                                                                                                    type="number"
                                                                                                    placeholder="Number Of Posts"
                                                                                                    onChange={this.handleInputChange}
                                                                                                    value={this.state.NoOfPosts}
                                                                                                    name="NoOfPosts"

                                                                                                />
                                                                                            </Form.Group>}
                                                                                            <br/>

                                                                                            {<Form.Group>
                                                                                                {/* <Form.Label>CommentsCount</Form.Label> */}
                                                                                                <input
                                                                                                    type="number"
                                                                                                    placeholder="Reactions"
                                                                                                    onChange={this.handleInputChange}
                                                                                                    value={this.state.Reactions}
                                                                                                    name="Reactions"
                                                                                                />
                                                                                            </Form.Group>}
                                                                                            <br/>

                                                                                            {<Form.Group>
                                                                                                {/* <Form.Label>AdditionalLinks</Form.Label> */}
                                                                                                <input
                                                                                                    type="number"
                                                                                                    placeholder="AdditionalLinks"
                                                                                                    onChange={this.handleInputChange}
                                                                                                    value={this.state.AdditionalLinks}
                                                                                                    name="AdditionalLinks"

                                                                                                />
                                                                                            </Form.Group>}
                                                                                            <br/>

                                                                                            {<Form.Group>
                                                                                                {/*<Form.Label>AdditionalLinksCount</Form.Label> */}
                                                                                                <input
                                                                                                    type="number"
                                                                                                    placeholder="Replies"
                                                                                                    onChange={this.handleInputChange}
                                                                                                    value={this.state.Replies}
                                                                                                    name="Replies"
                                                                                                />
                                                                                            </Form.Group>}
                                                                                            <br/>

                                                                                            {<Form.Group>
                                                                                                {/*<Form.Label>Knowledgebase</Form.Label> */}
                                                                                                <input
                                                                                                    type="number"
                                                                                                    placeholder="Knowledgebase"
                                                                                                    onChange={this.handleInputChange}
                                                                                                    value={this.state.Knowledgebase}
                                                                                                    name="Knowledgebase"
                                                                                                />
                                                                                            </Form.Group>}

                                                                                            <br/>

                                                                                            {<Form.Group>
                                                                                                {/* <Form.Label>Knowledgebase</Form.Label> */}
                                                                                                <input
                                                                                                    type="number"
                                                                                                    placeholder="Marks"
                                                                                                    onChange={this.handleInputChange}
                                                                                                    value={this.state.Marks}
                                                                                                    name="Marks"
                                                                                                />
                                                                                            </Form.Group>}

                                                                                            <br/>


                                                                                            {/* <div className="row">
                                                                                { //Check if message failed
                                                                                    (this.state.ReactionsLike===1)
                                                                                        ? <Button onClick={this.like} value={{ color: "red", className: "global-class-name" }}>

                                                                                            <FaRegThumbsUp />
                                                                                        </Button>
                                                                                        : <Button onClick={this.like}>

                                                                                            <FaThumbsUp/>
                                                                                        </Button>
                                                                                }
                                                                            </div> */}
                                                                                            <br/>

                                                                                            {/*calling the Badge.js class (inside badgeCetificte folder) and "helloworld" in the Badge.js is displayed here
                                                                            <Badge/>
                                                                            */}


                                                                                            {/*linking to the newly created Badge.js file. by clicking the image ico here it load to the Badge.js class

                                                                            <Link to="/badge" id="nn" style={{  textDecoration: 'none' }}>
                                                                                <img src={not} className="mr-3" alt=""/>
                                                                            </Link>
                                                                            */}


                                                                                            <Button id="btnSubmit" variant="primary" type="submit">
                                                                                                Save Interaction Details
                                                                                            </Button>
                                                                                            <br/>
                                                                                            <br/>

                                                                                        </div>


                                                                                    </Form>


                                                                                </div></div> </div>
                                                                        : <div>

                                                                            <img id="userimage_cluster" src={l1cat.userdata.image} alt="Avatar"/>&nbsp;
                                                                            {l1cat.userdata.name}&nbsp;

                                                                            <h2>Most Interactive student Status: 00.00</h2>
                                                                            <button id="bt5"  onClick={() => this.onviewClick(l1cat.userdata.id)}> View Profile </button>

                                                                        </div>
                                                                }


                                                            </div>
                                                    }

                                                    {console.log('display licat')}
                                                    {console.log(l1cat)}


                                                    {/* now add active status form */}

                                                    {/* <div>


                                                        //retrieve userdetails
                                                        useid
                                                        clusterid
                                                        sessionid
                                                        topicid
                                                        active status



                                                    </div> */}

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

export default MostInteractive;

