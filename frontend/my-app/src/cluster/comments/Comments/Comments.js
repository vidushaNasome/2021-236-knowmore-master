import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";
import '../com_stl.css';
import axios from "axios";

import {
    FaThumbsUp,
    FaRegThumbsDown,
    FaThumbsDown,
    FaRegThumbsUp,
    FaAd,
    FaArrowLeft,
    FaArrowCircleRight,
    FaArrowRight,
    FaShare,
    FaRegHeart,
    FaRegAngry,
    FaRegSadCry,
    FaRemoveFormat,
    FaHeart,
    FaSadCry,
    FaAngry
} from 'react-icons/fa';
import Badge from "../../badgeCetificate/Badge";
import {Link} from "react-router-dom";
import {
    addsessioncommentsAPI,
    commentsAPI,
    knowledgebasePostParaAPI,
    userreactionAPI,
    videosAPI
} from "../../../configs/config";
import PropTypes from "prop-types";
import "./Comments.css";
import {f_s_angry_count, f_s_cry_count, f_s_heart_count, f_s_like_count} from "../../../configs/config2"


class Comments extends Component {

    static get propTypes() {
        return {
            session_id: PropTypes.number,
            session_name: PropTypes.string,
            session_topic: PropTypes.string,
            session_cluster: PropTypes.string,
            tid:PropTypes.number,
            cid:PropTypes.number,

        }
    }
    constructor(props) {
       
        super(props);

        this.state= {
            userid:'',
            clusterid:'',
            sessionid:'',
            topicid:'',
            comments:'',
            commentsdata:'',
            ReactionLike:0,
            ReactionHeart:0,
            ReactionCry:0,
            ReactionAngry:0,
            ReactionNone:0,
            checkreactions:0,
            reaction_table_id:'',
            heart_count:0,
            angry_count:0,
            like_count:0,
            cry_count:0
        }

        this.handleInputChange=this.handleInputChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

        this.like=this.like.bind(this);
        this.delete_like=this.delete_like.bind(this);
        this.heart=this.heart.bind(this);
        this.heart_delete=this.heart_delete.bind(this);
        this.cry=this.cry.bind(this);
        this.cry_delete=this.cry_delete.bind(this);
        this.angry=this.angry.bind(this);
        this.angry_delete=this.angry_delete.bind(this);

        this.retrieve_reactions_count=this.retrieve_reactions_count.bind(this);

        this.retrievecomments=this.retrievecomments.bind(this);
        this.retrievereactions=this.retrievereactions.bind(this);

        this.func_put_reactions=this.func_put_reactions.bind(this);
        this.func_post_reactions=this.func_post_reactions.bind(this);


        }

        componentDidMount() {

        const x = this.retrievecomments();
        this.retrievereactions();
        this.retrieve_reactions_count();

        }

        retrieve_reactions_count(){

        //Heart Count
            axios.get(f_s_heart_count+'?ssid='+this.props.session_id)
                .then(response => {
                    this.setState({heart_count: response.data.msg})

                })
                .catch(function (error) {
                    console.log(error);
                })

        //Angry Count
        axios.get(f_s_angry_count+'?ssid='+this.props.session_id)
            .then(response => {
                this.setState({angry_count: response.data.msg})

            })
            .catch(function (error) {
                console.log(error);
            })

        //like Count
        axios.get(f_s_like_count+'?ssid='+this.props.session_id)
            .then(response => {
                this.setState({like_count: response.data.msg})

            })
            .catch(function (error) {
                console.log(error);
            })

        //Cry Count
        axios.get(f_s_cry_count+'?ssid='+this.props.session_id)
            .then(response => {
                this.setState({cry_count: response.data.msg})

            })
            .catch(function (error) {
                console.log(error);
            })


        }

        retrievereactions(){
            //by session

            //by session user
          
            axios.get(userreactionAPI+'?sessid='+this.props.session_id+'&userid='+sessionStorage.getItem('studentId'))
                .then(response => {

                    console.log(response.data[0])


                    if(response.data[0].reactions==='Heart'){
                        this.setState({ReactionHeart:1})
                        this.setState({reaction_table_id:response.data[0].id})
                    }else if(response.data[0].reactions==='Like'){
                        this.setState({ReactionLike:1})
                        this.setState({reaction_table_id:response.data[0].id})
                    }else if(response.data[0].reactions==='Cry'){
                        this.setState({ReactionCry:1})
                        this.setState({reaction_table_id:response.data[0].id})
                    }else if(response.data[0].reactions==='Angry'){
                        this.setState({ReactionAngry:1})
                        this.setState({reaction_table_id:response.data[0].id})
                    }else if(response.data[0].reactions==='None'){
                        this.setState({ReactionNone:1})//for none reactions edit
                        this.setState({reaction_table_id:response.data[0].id})
                    }else{
                        //checkreactions
                        this.setState({checkreactions:1})
                        this.setState({reaction_table_id:response.data[0].id})
                    }


                })
                .catch(function (error) {
                    console.log(error);
                    this.setState({checkreactions:1})


                }.bind(this)
                )
        }

        retrievecomments(){

            axios.get(addsessioncommentsAPI+'?sessid='+this.props.session_id)
                .then(response => {
                    this.setState({commentsdata: response.data})
                    console.log(this.state.videodata)

                })
                .catch(function (error) {
                    console.log(error);


                })

            return 2;



        }

        handleInputChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault();

        try {

            axios.post(addsessioncommentsAPI, {
                userid:sessionStorage.getItem('studentId'),
                clusterid:this.props.cid,
                sessionid:this.props.session_id,
                topicid:this.props.tid,
                comments: this.state.comments,
                userimage:sessionStorage.getItem('image'),


            })
                .then(response=>{
                    console.log(response);
                    this.retrievecomments()
                    window.location.reload();

                })

        }catch (e) {

            console.log(e)

        }



    }



    like(type) {
       // alert(type)
        this.setState({ReactionLike: 1})
        this.setState({ReactionHeart: 0})
        this.setState({ReactionCry: 0})
        this.setState({ReactionAngry: 0})

        if(this.state.checkreactions===1){
            //alert('hello post')
            this.func_post_reactions('Like');
        }else{
            //put method
            this.func_put_reactions('Like')
        }


    }

    delete_like(type) {
        //alert(type)
        this.setState({ReactionLike: 0})
        this.func_put_reactions('None')
    }

    heart(type) {
       // alert(type)
        this.setState({ReactionLike: 0})
        this.setState({ReactionHeart: 1})
        this.setState({ReactionCry: 0})
        this.setState({ReactionAngry: 0})

        if(this.state.checkreactions===1){
            this.func_post_reactions('Heart');
        }else{
            //put method
            this.func_put_reactions('Heart')
        }


    }
    heart_delete(type) {
       // alert(type)
        this.setState({ReactionHeart: 0})
        this.func_put_reactions('None')
    }

    cry(type) {
       // alert(type)
        this.setState({ReactionLike: 0})
        this.setState({ReactionHeart: 0})
        this.setState({ReactionCry: 1})
        this.setState({ReactionAngry: 0})

        if(this.state.checkreactions===1){
            this.func_post_reactions('Cry');
        }else{
            //put method
            this.func_put_reactions('Cry')
        }


    }
    cry_delete(type) {
        //alert(type)
        this.setState({ReactionCry: 0})
        this.func_put_reactions('None')
    }

    angry(type) {
        //alert(type)
        this.setState({ReactionLike: 0})
        this.setState({ReactionHeart: 0})
        this.setState({ReactionCry: 0})
        this.setState({ReactionAngry: 1})

        if(this.state.checkreactions===1){
            this.func_post_reactions('Angry');
        }else{
            //put method
            this.func_put_reactions('Angry')
        }


    }
    angry_delete(type) {
       // alert(type)
        this.setState({ReactionAngry: 0})
        this.func_put_reactions('None')
    }

     async func_post_reactions(type){
        //alert('inside post')
        await axios.post(userreactionAPI, {
            clusterid:this.props.cid,
            sessionid:this.props.session_id,
            topicid:this.props.tid,
            userid:sessionStorage.getItem('studentId'),
            reactions:type

        })
            .then(response=>{
                console.log(response);
                //window.location.reload();
            })

       this.retrieve_reactions_count();

    }

     async func_put_reactions(type){
        //alert('inside put')
         await axios.put(userreactionAPI + this.state.reaction_table_id+'/', {
            reactions: type
        }).then(function (response) {
            //console.log(response);
           // window.location.reload();

        })

        this.retrieve_reactions_count();
    }

    render() {
        return (
            <div className="Comments">
                <br/><br/>
                <div align="center"><h5>Comments and Reactions</h5></div>

                <div className="row">

                    {this.state.ReactionLike===0?
                            <div className="btn-react">
                            <Button onClick={()=>{this.like('thumbsup')}} >
                                <FaRegThumbsUp   color="lightyellow" background="white" fontSize="1.0em"/>
                                {this.state.like_count}
                            </Button>
                        </div>
                        :<div className="btn-react">
                            <Button onClick={()=>{this.delete_like('x')}} >
                                <FaThumbsUp  color="lightyellow" enableBackground="white" fontSize="1.0em"/>
                                {this.state.like_count}
                            </Button>
                        </div>

                    }

                    {this.state.ReactionHeart===0?
                        <div className="btn-react">
                            <Button onClick={()=>{this.heart('heart')}} >
                                <FaRegHeart  color="pink" enableBackground="Red" fontSize="1.0em"/>
                                {this.state.heart_count}
                            </Button>
                        </div>
                        :<div className="btn-react">
                            <Button onClick={()=>{this.heart_delete('x')}} >
                                <FaHeart  color="pink" enableBackground="Red" fontSize="1.0em"/>
                                {this.state.heart_count}
                            </Button>
                        </div>

                    }

                    {this.state.ReactionCry===0?
                        <div className="btn-react">
                            <Button onClick={()=>{this.cry('cry')}} >
                                <FaRegSadCry  color="yellow" enableBackground="Yellow" fontSize="1.0em"/>
                                {this.state.cry_count}
                            </Button>
                        </div>
                        :<div className="btn-react">
                            <Button onClick={()=>{this.cry_delete('x')}} >
                                <FaSadCry  color="yellow" enableBackground="Yellow" fontSize="1.0em"/>
                                {this.state.cry_count}
                            </Button>
                        </div>

                    }
                    {this.state.ReactionAngry===0?
                        <div className="btn-react">
                            <Button onClick={()=>{this.angry('angry')}} >
                                <FaRegAngry  color="brown" enableBackground="brown" fontSize="1.0em"/>
                                {this.state.angry_count}
                            </Button>
                        </div>
                        :<div className="btn-react">
                            <Button onClick={()=>{this.angry_delete('x')}} >
                                <FaAngry  color="brown" enableBackground="brown" fontSize="1.0em"/>
                                {this.state.angry_count}
                            </Button>
                        </div>

                    }

                </div>

                <br/>
                <br/>
                <Form className="" onSubmit={this.onSubmit} >

                    <div className="typeComment">
                        <tr>

                            <td>
                                <img id="cm_im" src={sessionStorage.getItem('image')} alt="Avatar"/> &nbsp; &nbsp;
                            </td>

                            <Form.Group>
                            <td><input
                                type="text"
                                placeholder="Type a Comment"
                                onChange={this.handleInputChange}
                                value={this.state.comments}
                                name="comments"

                            /> </td>
                        </Form.Group>

                            <td><Button id="btnSubmit" variant="primary" type="submit">
                            <FaArrowRight/>
                            </Button> </td>

                        </tr>


                    </div>


                </Form>
                {
                    (this.state.commentsdata[0] != null)
                        ?  <div>{this.state.commentsdata.map((l3cat) => (
                            <div className="col-md-16">

                                <tr>

                                    <Link to={"/viewprofile/"+l3cat.userid} style={{  textDecoration: 'none' }}>
                                        <img id="cm_im" src={l3cat.userimage} alt="Avatar"/> &nbsp; &nbsp;
                                    </Link>
                                    <td>{l3cat.comments}&nbsp; &nbsp;</td>
                                    <td>
                                        {
                                            (sessionStorage.getItem('studentId') == l3cat.userid)
                                         ?  <td><Button id="btncommentremove" color="red" variant="primary">
                                            ❌
                                            </Button> </td>
                                            : null
                                        }

                                    </td>
                                </tr>
                                <br/>

                                </div>

                        ))}<br/></div>
                        : null
                }

            </div>
        );
    }
}

export default Comments;
