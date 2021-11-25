import React, {Component} from 'react';
import axios from "axios";
import {
    commentsAPI,
    DisplayStudentsAPI,
    knowledgebasePostParaAPI, mostactive_modeloutput_API, mostactiveAPI,
    repositaryclustercreationAPI
} from "../../../configs/config";
import {
    FaArrowAltCircleDown,
    FaArrowAltCircleLeft,
    FaHeart,
    FaRegThumbsUp,
    FaShare, FaSyncAlt,
    FaThumbsUp,
    FaUserFriends
} from "react-icons/fa";
import qs from "query-string";
import {Button, Card, Form} from "react-bootstrap";
import {Badge} from "../../badgeCetificate/Badge";
import {Link} from "react-router-dom";
import not from "../../../Images/Icons_navigation/not.png";
//import * as cluster from "cluster";
import Comments from "../Comments/Comments";
import "./scoreboard.css";
import imagegold from '../../images/gold cup.jpg'
import {
    f_s_heart_count,
    model_additionallinks,
    model_comments,
    model_reaction, model_sharing_kb,
    model_videoview
} from "../../../configs/config2";
import {AddknowledgeModel} from "../../../knowledgebase/knowledge/Model/AddknowledgeModel";
//scoreboard file
//scoreboard component..
//scoreboard user.
class Scoreboard extends Component {

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
            displayuserswithimages:[],
            cal_inter:false,
            update_inter:false,
            Reactions:0,
            Additionallinks:0,
            Comments:0,
            Sharing:0,
            VideoView:0,
            addModalShow:false,

        }
        //#Reactions, Additionallinks, Comments, Sharing, VideoView

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
        this.model_retrieve=this.model_retrieve.bind(this);
        this.share_newsfeed=this.share_newsfeed.bind(this);

    }


    componentDidMount() {
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

        this.retrivemostActive();

        this.model_retrieve();

    }

    model_retrieve(){
        //Retriving all the data

        //Reactions -- 1
       // alert(model_reaction+'?ssid='+this.state.sessionid+'&userid='+sessionStorage.getItem('studentId'))
        axios.get(model_reaction+'?ssid='+this.state.sessionid+'&userid='+sessionStorage.getItem('studentId'))
            .then(response => {
                this.setState({Reactions: response.data.reactions})

            })
            .catch(function (error) {
                console.log(error);
            })
        //Comments --2
        axios.get(model_comments+'?ssid='+this.state.sessionid+'&userid='+sessionStorage.getItem('studentId'))
            .then(response => {
                this.setState({Comments: response.data.comments})

            })
            .catch(function (error) {
                console.log(error);
            })

        //Additional Links --3
        axios.get(model_additionallinks+'?ssid='+this.state.sessionid+'&userid='+sessionStorage.getItem('studentId'))
            .then(response => {
                this.setState({Additionallinks: response.data.additionallinks})

            })
            .catch(function (error) {
                console.log(error);
            })

        //knowledgebase // knowledgebase --4
        //alert(model_sharing_kb+'?ssid='+this.state.sessionid+'&userid='+sessionStorage.getItem('studentId'))
        axios.get(model_sharing_kb+'?ssid='+this.state.sessionid+'&userid='+sessionStorage.getItem('studentId'))
            .then(response => {
                this.setState({Sharing: response.data.knowledgebase})
                //alert(this.state.sharing)

            })
            .catch(function (error) {
                console.log(error);
            })

        //video view --5
        axios.get(model_videoview+'?ssid='+this.state.sessionid+'&userid='+sessionStorage.getItem('studentId'))
            .then(response => {
                this.setState({VideoView: response.data.videoview})

            })
            .catch(function (error) {
                console.log(error);
            })



    }

    handleInputChange(event) {
        /*this.setState({
            [event.target.name]: event.target.value
        })*/
    }

    onSubmit = (e,id) => {
        e.preventDefault();

        try {
            //Reactions, Additionallinks, Comments, Sharing, VideoView

            axios.post(commentsAPI, {
                userid:id,
                clusterid:this.state.cid,
                sessionid:this.state.sessionid,
                topicid:this.state.tid,
                Reactions: this.state.Reactions,
                Additionallinks: this.state.Additionallinks,
                Comments: this.state.Comments,
                Sharing: this.state.Sharing,
                VideoView: this.state.VideoView,
                Citations: 0,
                mostactiveforcluster:'',


            })
                .then(response=>{
                    console.log(response);
                    //alert('Successfully Added Interaction details. Proceed with the score.')
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
                //Reactions, Additionallinks, Comments, Sharing, VideoView
                ////this.setState({Reactions: response.data.Reactions}) //NoOfPosts
                ////this.setState({Additionallinks: response.data.Additionallinks})//Reactions
                ////this.setState({ Comments: response.data. Comments}) //AdditionalLinks
                ////this.setState({ Sharing: response.data. Sharing})//Replies
                ////this.setState({VideoView: response.data.VideoView})//Knowledgebase
                //this.setState({Marks: response.data.Marks})//Marks

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
       // alert('cal'+id)
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

        //alert(mostactiveAPI + '?sessionid=' + this.state.sessionid)
        await axios.get(mostactiveAPI + '?sessionid=' + this.state.sessionid)
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

        await axios.get(commentsAPI+'?stid='+sid+'&ssid='+this.state.sessionid )
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

        e.preventDefault()
        try {
            axios.put(mostactive_modeloutput_API + id+'/', {
                // details: this.state.paragraph
                //Reactions, Additionallinks, Comments, Sharing, VideoView
                Reactions: this.state.Reactions ,
                Additionallinks: this.state. Additionallinks,
                Comments: this.state.Comments,
                Sharing: this.state.Sharing,
                VideoView: this.state.VideoView


            }).then(function (response) {
                //console.log(response);
               // alert('Successfully Updated. Proceed with the score.')
               window.location.reload();

            })
        }catch (e) {
            console.log(e)
        }
    }
    share_newsfeed(id){
        //alert('you clicked share in newsfeed')
        this.setState({addModalShow:true})


    }



    render() {
        const {classlist} = this.state
        const {displayuserswithimages} = this.state

        let addModalClose=()=>this.setState({addModalShow:false})

        //console.log('most active')
        //console.log({mostactiveforcluster})

        return (
            <div>

                <br/>

                <br/>
                <h1 id="heading_1">Score Board</h1>
                <h4 id="heading_2"> Session ID: {this.state.sessionid}  </h4>

                <div classname="mostactive_3" align="center">
                    {/* //starting displaying most active students*/}

                    <div>
                        <h4>User Engagement Based Test Marks Prediction: Highest Scores</h4>
                        <br/>
                        <h6> For Session ID: {this.state.sessionid}</h6>
                        {
                            <div>
                                {console.log('most active students..........')}
                                {console.log(displayuserswithimages)}
                                {(displayuserswithimages != undefined && displayuserswithimages != null )
                                    ?
                                    <div>
                                        {console.log('...Most Interactive...1')}
                                        <tr>
                                            {this.state.displayuserswithimages.map((variable) => (

                                                <td> <div>
                                                    {console.log('...Most Interactive...2')}
                                                    <Card className="card-style">
                                                        <Card.Body>
                                                            <Card.Title></Card.Title>
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
                                                                    <div>
                                                                        <Button id="nn" style={{  textDecoration: 'none' }} onClick={() => this.share_newsfeed(variable.id)}>
                                                                            <FaShare color="white" color="yellow" fontSize="1.0em"/>
                                                                        </Button>
                                                                        <Badge
                                                                            show={this.state.addModalShow}
                                                                            onHide={addModalClose}
                                                                            studentid={variable.id}
                                                                            sessionid={this.state.sessionid}
                                                                            marks={variable.Activevalue}
                                                                        />
                                                                    </div>

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


                    </div>

                    {/*//****ending displaying most active students*/}
                <br/>
                <br/>

                </div>


                {<button id="bt_show"  onClick={() => this.retrieveclassmates(classlist)}> <FaUserFriends/> </button>}

                <div>
                    {

                        (this.state.display)
                            ?
                            <div className="main_cards">
                                <br/>
                                {this.state.classlistf.map((l1cat) => (
                                <div className="" align="center">
                                    <div className="card text-center display-one-card">
                                        <div className="card-header">
                                            <div className="">
                                                <div className="class_show_users" align="center">
                                                    {/*Calculated active status for all users for the cluster displays here*/}
                                                    {
                                                        ((l1cat.activestatusdata != null) && (l1cat.activestatusdata != ""))
                                                         ? <div>
                                                                <img id="userimage_cluster" src={l1cat.userdata.image} alt="Avatar"/>&nbsp;
                                                                {l1cat.userdata.name}&nbsp;

                                                                <h2>Exam Score Prediction: {l1cat.activestatusdata.MostActive}</h2>
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
                                                                                        Update Interaction
                                                                                    </Button> &nbsp; &nbsp;

                                                                                    <Button id="btnSubmit" variant="info" onClick={()=>this.showinter_cal_act(l1cat.activestatusdata.id)}>
                                                                                        Predict My Exam Score
                                                                                    </Button> &nbsp; &nbsp;


                                                                                    {this.state.update_inter?

                                                                                        <div className="updateinteractiondetails">
                                                                                            <br/>
                                                                                            <div align="center">
                                                                                                <div className="form1" >

                                                                                                    <Form className="formclass" onSubmit={(e)=> this.onSubmitUpdateInteractions(e,l1cat.activestatusdata.id)} >

                                                                                                        <div className="detdisplay">

                                                                                                            StudentID: {l1cat.userdata.id} &nbsp; &nbsp;
                                                                                                            <Button id="btnSubmit" variant="info" onClick={this.model_retrieve}>
                                                                                                            <FaSyncAlt   color="lightyellow" background="white" fontSize="1.0em"/>
                                                                                                          </Button>

                                                                                                            <br/>
                                                                                                            <br/>



                                                                                                            {<Form.Group>
                                                                                                                <h3> Update Interaction Details </h3>

                                                                                                                { /*Reactions, Additionallinks, Comments, Sharing, VideoView*/}
                                                                                                                <p> Reaction Type: Cry, Angry, Like, Heart</p>
                                                                                                                <input
                                                                                                                    type="number"
                                                                                                                    placeholder="Reactions"
                                                                                                                    onChange={this.handleInputChange}
                                                                                                                    value={this.state.Reactions}
                                                                                                                    //value={2}
                                                                                                                    name="Reactions"
                                                                                                                    readonly

                                                                                                                />
                                                                                                            </Form.Group>}
                                                                                                            <br/>

                                                                                                            {<Form.Group>
                                                                                                                {/* <Form.Label>Reactions</Form.Label> */}
                                                                                                                <p> Additional Links Count</p>
                                                                                                                <input
                                                                                                                    type="number"
                                                                                                                    placeholder="Additionallinks"
                                                                                                                    onChange={this.handleInputChange}
                                                                                                                    value={this.state.Additionallinks}
                                                                                                                    name="Additionallinks"
                                                                                                                    readonly
                                                                                                                />
                                                                                                            </Form.Group>}
                                                                                                            <br/>

                                                                                                            {<Form.Group>

                                                                                                                <p> Comments Count</p>

                                                                                                                <input
                                                                                                                    type="number"
                                                                                                                    placeholder="Comments"
                                                                                                                    onChange={this.handleInputChange}
                                                                                                                    value={this.state.Comments}
                                                                                                                    name="Comments"
                                                                                                                    readonly

                                                                                                                />
                                                                                                            </Form.Group>}
                                                                                                            <br/>

                                                                                                            {<Form.Group>

                                                                                                                <p> Knowledgebase Sharing </p>

                                                                                                                <input
                                                                                                                    type="number"
                                                                                                                    placeholder="Sharing"
                                                                                                                    onChange={this.handleInputChange}
                                                                                                                    value={this.state.Sharing}
                                                                                                                    name="Sharing"
                                                                                                                    readonly
                                                                                                                />
                                                                                                            </Form.Group>}
                                                                                                            <br/>

                                                                                                            {<Form.Group>
                                                                                                                {/* <Form.Label>Knowledgebase</Form.Label> */}
                                                                                                                <p> Video View Status</p>
                                                                                                                <input
                                                                                                                    type="number"
                                                                                                                    placeholder="VideoView"
                                                                                                                    onChange={this.handleInputChange}
                                                                                                                    value={this.state.VideoView}
                                                                                                                    name="VideoView"
                                                                                                                    readonly
                                                                                                                />
                                                                                                            </Form.Group>}

                                                                                                            <br/>

                                                                                                            <br/>

                                                                                                            <br/>


                                                                                                            <Button id="btnSubmit" variant="primary" type="submit">
                                                                                                                Update Interaction Details and Predict My Exam Score
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
                                                                                            <Button id="btnSubmit" variant="primary" onClick={()=>this.putmethodforactivestatus(l1cat.activestatusdata.id)}>
                                                                                                Calculate Exam Score Prediction
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
                                                                <div align="center" className="addInteraction">
                                                                    <br/><br/>
                                                                <div>
                                                                    <h5>Not Calculated Exam Score Prediction - Add Interaction Details</h5>
                                                                    <div className="">

                                                                    <Form className="formclass1" onSubmit={(e)=> this.onSubmit(e,l1cat.userdata.id)} >

                                                                        <div className="">

                                                                            StudentID: {l1cat.userdata.id}
                                                                            <br/>
                                                                            <br/>
                                                                            {/*Reactions, Additionallinks, Comments, Sharing, VideoView*/}
                                                                            {<Form.Group>
                                                                                <p> Reaction Type: Cry, Angry, Like, Heart</p>

                                                                                <input
                                                                                    type="number"
                                                                                    placeholder="Reactions"
                                                                                    onChange={this.handleInputChange}
                                                                                    value={this.state.Reactions}
                                                                                    name="Reactions"
                                                                                    readonly

                                                                                />
                                                                            </Form.Group>}
                                                                            <br/>

                                                                            {<Form.Group>
                                                                                <p> Additional Links Count</p>
                                                                                <input
                                                                                    type="number"
                                                                                    placeholder="Additionallinks"
                                                                                    onChange={this.handleInputChange}
                                                                                    value={this.state.Additionallinks}
                                                                                    name="Additionallinks"
                                                                                    readonly
                                                                                />
                                                                            </Form.Group>}
                                                                            <br/>

                                                                            {<Form.Group>

                                                                                <p> Comments Count</p>

                                                                                <input
                                                                                    type="number"
                                                                                    placeholder="Comments"
                                                                                    onChange={this.handleInputChange}
                                                                                    value={this.state.Comments}
                                                                                    name="Comments"
                                                                                    readonly

                                                                                />
                                                                            </Form.Group>}
                                                                            <br/>

                                                                            {<Form.Group>

                                                                                <p> Knowledgebase Score and Sharing</p>

                                                                                <input
                                                                                    type="number"
                                                                                    placeholder="Sharing"
                                                                                    onChange={this.handleInputChange}
                                                                                    value={this.state.Sharing}
                                                                                    name="Sharing"
                                                                                    readonly
                                                                                />
                                                                            </Form.Group>}
                                                                            <br/>

                                                                            {<Form.Group>

                                                                                <p> Video View Status</p>

                                                                                <input
                                                                                    type="number"
                                                                                    placeholder="VideoView"
                                                                                    onChange={this.handleInputChange}
                                                                                    value={this.state.VideoView}
                                                                                    name="VideoView"
                                                                                    readonly
                                                                                />
                                                                            </Form.Group>}

                                                                            <br/>

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

                                                                    <h2>Exam Score Prediction: 00.00</h2>
                                                                    <button id="bt5"  onClick={() => this.onviewClick(l1cat.userdata.id)}> View Profile </button>

                                                                  </div>
                                                                        }


                                                      </div>
                                                      }

                                                    {console.log('display licat')}
                                                    {console.log(l1cat)}




                                                </div>


                                                </div>
                                        </div></div><br/>

                                </div>

                            ))}
                                <div> <h7 id="color_red"> Calculate the Exam Score Predictions for Session {this.state.sessionid}.
                                    If the score is low please engage more and gain the Required Knowledge. <span id="color_red">&#42;</span> </h7> <br/> </div>
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

export default Scoreboard;