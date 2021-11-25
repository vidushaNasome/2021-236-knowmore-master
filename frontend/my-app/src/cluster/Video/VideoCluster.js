import React, {Component} from 'react';
import {Link} from "react-router-dom";
import qs from "query-string";
import PropTypes from "prop-types";
import {Form} from "react-bootstrap";
import axios from "axios";
import {knowledgebasePostParaAPI, repositaryclustercreationAPI, userreactionAPI, videosAPI} from "../../configs/config";
import ReactPlayer from "react-player";
import logo from '../../Images/video_images/learn-learning.gif'
import {model_videoview, teachervideo, video_fullview} from "../../configs/config2";

/*Maleesha Coding video cluster*/

class VideoCluster extends Component {

    static get propTypes() {
        return {
            session_id: PropTypes.number,
            session_name: PropTypes.string,
            session_topic: PropTypes.string,
            session_cluster: PropTypes.string,
            tid: PropTypes.number,
            cid: PropTypes.number,

        }
    }

    constructor(props) {
        super(props);

        this.player = React.createRef();

        this.state = {
            name: "",
            video: "",
            sessionid: this.props.session_id,
            topicname: this.props.tid,
            clustername: this.props.cid,
            tid: this.props.tid,
            cid: this.props.cid,
            selectedFile: '',
            videodata: '',
            vid_xx:'',
            markedEndTime:'',
            VideoView:-1
        }

        this.onSubmit = this.onSubmit.bind(this);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputChange1 = this.handleInputChange1.bind(this);

        this.preloadVideo=this.preloadVideo.bind(this);
        //this.format=this.format.bind(this);

        this.laodvideodet=this.laodvideodet.bind(this);
        this.findwatchedvideo=this.findwatchedvideo.bind(this);
    }

    componentDidMount() {
        //alert(videosAPI+'?sid='+this.state.sessionid)

        console.log('video --1')
        console.log(this.state.videodata)

        this.laodvideodet();

        if(this.state.videodata !== undefined && this.state.videodata !== ''){
            this.findwatchedvideo();
        }

    }
    async laodvideodet(){

        await axios.get(teachervideo + '?sid=' + this.state.sessionid)
            .then(response => {
                this.setState({videodata: response.data[0]})
                console.log('display video')
                console.log(this.state.videodata)

            })
            .catch(function (error) {
                console.log(error);


            })

        if(this.state.videodata !== undefined && this.state.videodata !== ''){
            await this.preloadVideo()
        }


    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleInputChange1(event) {
        this.setState({
            selectedFile: event.target.files[0],
        })

        console.log(this.state.selectedFile)
    }

    onSubmit(e) {
        e.preventDefault();
        alert('showing')

        const formData = new FormData();

        // Update the formData object
        console.log(this.state.selectedFile)
        alert(this.state.sessionid + this.state.cid + this.state.tid)

        alert(this.props.session_cluster + this.props.session_topic)
        formData.append('name', this.state.name);
        formData.append('clusterid', this.state.cid);
        formData.append('sessionid', this.state.sessionid);
        formData.append('topicid', this.state.tid);
        formData.append("video", this.state.selectedFile);
        formData.append("vname", this.state.selectedFile.name);

        axios.post(teachervideo, formData, {})
            .then(res => {
                console.log(res)
                console.log(res.data);
                alert('Successfully Uploaded Video')
                window.location.reload()

            }).catch((err) => {
            console.log(err)
        })

        // Details of the uploaded file
        console.log(this.state.selectedFile);


    }

    async preloadVideo(){
        //console.log("inside a")
        fetch(this.state.videodata.video)
            .then(re => re.blob())
            .then(blob => URL.createObjectURL(blob))
            .then(url => {
                //console.log("inside b")
                //console.log(url)
                this.setState({ vid_xx: url });
            })
            .catch(err => {
                console.log(err);
            });
    }

    async findwatchedvideo(){
        //video view --5
        await axios.get(model_videoview+'?ssid='+this.state.sessionid+'&userid='+sessionStorage.getItem('studentId'))
            .then(response => {
                this.setState({VideoView: response.data.videoview})
                console.log('display video view1')
                console.log(this.state.VideoView)
            })
            .catch(function (error) {
                console.log(error);
            })

        console.log('display video view2')
        console.log(this.state.VideoView)


    }
    gettime(){
        console.log(this.player)
        alert('Good Work! \n You have successfully watched the complete Video 👏👏👏')
        const timeEnd = this.player.getCurrentTime();
        this.setState({markedEndTime: timeEnd});
        //add this as a model entity for video view

        if(this.state.VideoView!==-1){

        }else{
            /*Post method for adding video data*/

            axios.post(video_fullview, {
                clusterid:this.props.cid,
                sessionid:this.props.session_id,
                topicid:this.props.tid,
                userid:sessionStorage.getItem('studentId'),
                fullvideo:1

            })
                .then(response=>{
                    console.log(response);
                    window.location.reload();
                })

        }

    }

    ref = player => {
        this.player = player
    }

    render() {
        const {videodata} = this.state;
        return (
            <div className="VideoCluster">
                <br/><br/>
                <div align="center"></div>
                {console.log('videodata null checking')}
                {console.log(this.state.videodata)}
                {
                    (this.state.videodata !== undefined)
                        ? <div>
                            <div>
                                <h4> Displaying Uploaded Video</h4><br/><br/>
                                Video ID: {videodata.id}<br/>
                                Details: {videodata.name}<br/><br/>

                                <ReactPlayer
                                    url={this.state.vid_xx}
                                    controls={true}
                                    ref={this.ref}
                                    onEnded={this.gettime.bind(this)}

                                />

                                <br/>

                                <Link
                                    to={"/slidesshow" + "/?k=" + this.state.sessionid + '&n=' + this.state.topicname + "&y=" + this.state.clustername + "&mid=" + videodata.id + "&video=" + videodata.video}
                                    id="bt4" style={{textDecoration: 'none'}}>
                                    View Slide Show
                                </Link>

                                {console.log(videodata.video)}


                            </div>

                        </div>
                        : null
                }

                {sessionStorage.getItem('teacherId')!== null & this.state.videodata === undefined ?

                    <div>
                        <div>
                            <Form className="categoryclass" onSubmit={this.onSubmit}>
                                <Form.Group>
                                    <Form.Label>Add a Session </Form.Label>
                                    <Form.Control type="text"
                                                  placeholder="Type Session name"
                                                  onChange={this.handleInputChange}
                                                  value={this.state.name}
                                                  name="name"

                                    />

                                    <br/><br/>
                                    <input type="file" className="form-control" name="upload_file"
                                           onChange={this.handleInputChange1}/>
                                    <button id="btnSubmit" variant="primary" type="submit">
                                        Save
                                    </button>
                                </Form.Group>
                            </Form>


                        </div>
                    </div>

                    :null
                }
                {sessionStorage.getItem('studentId')!== null & this.state.videodata === undefined ?

                    <div>
                        <div align="center">
                            <img src={logo} alt="loading..." />
                            <h6> Video Not Yet Uploaded!</h6>
                        </div>

                    </div>

                    :null


                    }


            </div>
        );
    }
}

export default VideoCluster;
