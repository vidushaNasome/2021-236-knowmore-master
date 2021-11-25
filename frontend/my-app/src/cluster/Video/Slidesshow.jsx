import React, {Component} from 'react';
import qs from "query-string";
import "./slideshow.css";
import {Button} from "react-bootstrap";
import axios from "axios";
import {
    dispalydatafile,
    displayAPI,
    genaratekeyframes_text_API,
    genaratekeyframesAPI,
    knowledgebasePostParaAPI,
    videosAPI
} from "../../configs/config";
import ReactPlayer from "react-player";
import {deleteframes, teachervideo} from "../../configs/config2";
import {FaArrowAltCircleLeft, FaTimesCircle} from "react-icons/fa";

/*Maleesha Coding video cluster*/

class Slidesshow extends Component {
    constructor(props) {
        super(props);

        this.state={
            sessionid:qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).k,
            sessionname:'',
            topicname:qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).n,
            clustername:qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).y,
            video:qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).video,
            videoid:qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).mid,
            frames:[],
            video_object:'',
            video_det:'',
            frame_text:'',
            summerization:'',
            file:'',
            v_unique_id:''
        }

        this.genarateslideshow = this.genarateslideshow.bind(this);
        this.genaratefile = this.genaratefile.bind(this);
        this.add_startup=this.add_startup.bind(this);
        this.deleteframe=this.deleteframe.bind(this);



    }

    componentDidMount() {
        //retrieve teacher upload video data

        axios.get(teachervideo + this.state.videoid+'/')
            .then(response => {
                console.log('Retrieve data')
                let str1 = response.data.vname;
                console.log('printing string cdm'+ str1)
                str1 = str1.slice(0, -4);
                console.log(str1)

                this.setState({
                    video_det: response.data,
                })

                this.setState({
                    video_det_path: str1,
                })

            })
            .catch(function (error) {
                console.log(error);


            })


        //display key frames
        axios.get(videosAPI + '?sid='+this.state.sessionid+'&stuid='+sessionStorage.getItem('studentId'))
            .then(response => {

                console.log('Retrieve data')
                console.log(response)
                console.log(response.data)

                if(response.data.length == 0){
                    alert('Register for summerization!')
                    this.add_startup()
                }

                if(response.data[0].imageslist != ''){

                    const object = JSON.parse(response.data[0].imageslist);

                    const array = Object.keys(object).map(function(k) {
                        return object[k];
                    });

                    console.log('aaa')
                    console.log(array)


                    this.setState({
                        video_object: array,
                    })

                    this.setState({
                        file: response.data[0].text_have,
                    })
                }


                this.setState({
                    v_unique_id: response.data[0].id,
                })
                console.log('unique............')
                console.log(this.state.v_unique_id)


            })
            .catch(function (error) {
                console.log(error);


            })


    }

    add_startup(){
        //Addning initially
        const formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('sessionid', this.state.sessionid);
        formData.append("vname", this.state.video_det_path+'.mp4');
        formData.append("studentid", sessionStorage.getItem('studentId'));
        formData.append("videoid", this.state.videoid);

        axios.post(videosAPI, formData, {})
            .then(res => {
                console.log(res)
                console.log(res.data);
                alert('You are ready for Summarization!')
                window.location.reload()

            }).catch((err) => {
            console.log(err)
        })

    }

    async genarateslideshow(){

        alert('Wait a moment............Key frames are being extracted!')

        console.log(this.state.video_det)

        let str = this.state.video_det.vname;
        console.log('printing string'+ str)
        str = str.slice(0, -4);
        console.log(str)

        await  axios.get(genaratekeyframesAPI+'?ssid='+'session_'+this.state.sessionid+'&videoname='+str+'&stuid='+sessionStorage.getItem('studentId'))
            .then(response => {
                console.log('keyframes genarated')
                console.log(response.data.msg)
                this.setState({
                    frames: response.data.msg,
                })
            })
            .catch(function (error) {
                console.log(error);


            })

        alert('Successfully Extracted. Now Updating Extracted Key Frames.................')

        const im_list = JSON.stringify(this.state.frames);

        alert(videosAPI + this.state.v_unique_id+'/')

        try {
            axios.put(videosAPI + this.state.v_unique_id+'/', {
                imageslist: im_list
            }).then(function (response) {
                //console.log(response);
                alert('Successful! You Can View Key Frames')
                window.location.reload();

            })

        }catch (e) {

        }



    }
    async genaratefile(){

        alert('You are Summerized File genarration in Processing.................')

        let str = this.state.video_det.vname;
        console.log('printing string'+ str)
        str = str.slice(0, -4);
        console.log(str)

        await  axios.get(genaratekeyframes_text_API+'?ssid='+this.state.sessionid+'&videoname='+str+'&userid='+sessionStorage.getItem('studentId'))
            .then(response => {
                console.log('text')
                console.log(response.data.msg)
                this.setState({
                    frame_text: response.data.msg,
                })
            })
            .catch(function (error) {
                console.log(error);


            })


        const text_list = JSON.stringify(this.state.frame_text);

        {/*keyframestext: text_list, Ensure no more than 4000 charactors*/}

        try {
            axios.put(videosAPI +  this.state.v_unique_id+'/', {
                keyframestext: 'added view in file',
                text_have:'true'
            }).then(function (response) {
                //console.log(response);
                alert('Successful. You Can View the Summarized text!')
                window.location.reload();

            })
        }catch (e) {

        }

    }

    deleteframe(id){
        //alert(id)

        axios.get(deleteframes+'?sesid='+this.state.sessionid+'&userid='+sessionStorage.getItem('studentId')+'&deleteframe='+id)
            .then(response => {
                /*this.setState({
                    frame_text: response.data.msg,
                })*/
                alert('Success');
                window.location.reload()
            })
            .catch(function (error) {
                console.log(error);
                alert('Error')


            })
    }



    render() {
        const {sessionid} = this.state;
        const {video_object} = this.state;

        return (
            <div>

                <br/>
                <br/>
                <div className="displayshow">
                    <h3>
                        Video Displayed
                    </h3>

                    Session ID: &nbsp;{this.state.sessionid}<br/>
                    Topic Name: &nbsp;{this.state.topicname}<br/>
                    Cluster Name: &nbsp;{this.state.clustername}<br/><br/>

                    <ReactPlayer controls={true} url={this.state.video} />

                    <br/>
                    <Button id="btnSubmit" className="button5" onClick={this.genarateslideshow}>
                        Genarate Key Frames Summary
                    </Button>
                    <Button id="btnSubmit" className="button5" onClick={this.genaratefile}>
                        Genarate Text File
                    </Button>
                </div>

                <div className="vertical_view">

                    <br/>
                    <h2 className="w3-center">Automatic Slideshow</h2>
                    <br/>

                    {this.state.file !== '' & this.state.file != null?
                        <div>
                            <button className="button5"><a href={ dispalydatafile+'session_'+this.state.sessionid+'/data_'+sessionStorage.getItem('studentId')+'.txt'} download>Click to Open Text Summerization as Text File</a></button>
                            <button className="button5"><a href={ dispalydatafile+'session_'+this.state.sessionid+'/data1_'+sessionStorage.getItem('studentId')+'.html'} download>Click to Open Text Summerization as HTML File</a></button>
                        </div>
                        :null
                    }

                    <row>

                        {console.log(video_object)}
                        {console.log(video_object.length)}

                        <ul>{Array.from(Array(video_object.length), (e, i) => {
                            return <li key={i}>
                                <tr>
                                    Slide ID: {i} <br/>
                                    <Button id="bt1" variant="info" onClick={() => this.deleteframe(video_object[i])}>
                                        <FaTimesCircle color="red"  fontSize="1.5em"/> Delete this Frame
                                    </Button>

                                    <img id="imagedis"  src={displayAPI+'/session_'+sessionid+'/save/'+sessionStorage.getItem('studentId')+'/session_'+sessionid+'/'+this.state.video_det_path+'/'+video_object[i]} alt="Avatar"/>
                                    <br/>
                                </tr>
                            </li>
                        })}</ul>

                    </row>

                </div>

            </div>
        );
    }
}

export default Slidesshow;