import React, {Component} from 'react';
import {Arrow, Group, Layer, Line, Rect, Stage, Star, Text} from "react-konva"
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import "./shapesStyles.css";
import Konva from "konva";
import {Button} from "react-bootstrap";


const squreno = 1;

//const INITIAL_STATE = generateShapes();

class Displayshapes extends Component {
    //item;

    static get propTypes() {
        return {
            level1: PropTypes.array,
            level2: PropTypes.array,
            relationship: PropTypes.array,
            sessiontopic:PropTypes.string,
            sessionname:PropTypes.string

        }
    }


    constructor(props) {
        super(props);

        this.state={
            level1:this.props.level1,
            level2:this.props.level2,
            stars_l1:[],
            stars_l2:[],
            relationship:this.props.relationship,
            relationdisplay:[],
            s_1:[],
            mainstars:{},
            mainrelationships:[],
            relationdisplay_main:[],

        }
        //alert(this.state.relationship)
        console.log(this.state.relationship)

        this.generateShapes_l1=this.generateShapes_l1.bind(this);
        this.generateShapes_l2=this.generateShapes_l2.bind(this);
        this.generateShapes_relationship=this.generateShapes_relationship.bind(this);
        this.genaratetopicandsession=this.genaratetopicandsession.bind(this);
        this.genaratetopicandsessionrelationship=this.genaratetopicandsessionrelationship.bind(this);


    }

    componentDidMount() {

        this.generateShapes_l1();
        this.generateShapes_l2();
        this.generateShapes_relationship();
        this.genaratetopicandsession();

    }

    genaratetopicandsession(){

            const x = {
                id:7,
                x:(0.5*window.innerWidth),
                y:(0.4*window.innerWidth),
                name:this.props.sessionssession,
                rotation: Math.random() * 180,
                isDragging: false,
            }

            this.setState({mainstars:  x})



    }
    genaratetopicandsessionrelationship(){

        //alert('inside main relationships')

        console.log('Main Relationships')
        console.log(this.state.mainrelationships)

        this.state.mainrelationships.forEach(function(item) {
            console.log('display item')
            console.log(item);

            const x = {
                id:2,
                x1:(650),
                y1:(100),

                x2:(item.x1),
                y2:(item.y1),

                relation:item.relation,
                //rotation: Math.random() * 180,
                isDragging: false,
            }

            //this.setState({s_1:{ "bye": 1 }});

            this.setState(prevState => ({
                relationdisplay_main: [...prevState.relationdisplay_main, x]
            }))

        }.bind(this));

        console.log(this.state.relationdisplay_main)





    }

    async generateShapes_l1() {

        await this.state.level1.forEach(function(item) {
            console.log(item);

            const x = {
                id:1,
                x:(item.x*window.innerWidth),
                y:(item.y*window.innerWidth),
                name:item.name,
                rotation: Math.random() * 180,
                isDragging: false,
            }

            this.setState(prevState => ({
                stars_l1: [...prevState.stars_l1, x]
            }))


        }.bind(this));

        this.state.level1.forEach(function(item) {

            const yy={
                x1:(item.x*window.innerWidth),
                y1:(item.y*window.innerWidth),
            }
            //alert('in x')
            this.setState(prevState => ({
                mainrelationships: [...prevState.mainrelationships, yy]
            }))

            console.log('main relationships')

            console.log(this.state.mainrelationships)





        }.bind(this));

        this.genaratetopicandsessionrelationship();



    }

    generateShapes_l2() {

        this.state.level2.forEach(function(item) {
            console.log(item);

            const x = {
                id:2,
                x:(item.x*window.innerWidth),
                y:(item.y*window.innerWidth),
                name:item.name,
                rotation: Math.random() * 180,
                isDragging: false,
            }

            //this.setState({s_1:{ "bye": 1 }});

            this.setState(prevState => ({
                stars_l2: [...prevState.stars_l2, x]
            }))
        }.bind(this));

    }
    generateShapes_relationship() {

        console.log('Here display the relationships')
        console.log(this.state.relationship)

        this.state.relationship.forEach(function(item) {
            console.log(item);

            const x = {
                id:2,
                x1:(item.val1_x*window.innerWidth),
                y1:(item.val1_y*window.innerWidth),

                x2:(item.val2_x*window.innerWidth),
                y2:(item.val2_y*window.innerWidth),

                relation:item.relation,
                //rotation: Math.random() * 180,
                isDragging: false,
            }

            //this.setState({s_1:{ "bye": 1 }});

            this.setState(prevState => ({
                relationdisplay: [...prevState.relationdisplay, x]
            }))
        }.bind(this));

    }

    hovermethod(){
        alert('hello world')
    }

    render() {
        const {mainstar} =this.state;
        console.log(mainstar)
        return (
            <div className="canvas">

                <br/>

                {this.props.sessiontopic}

                <Stage width={window.innerWidth} height={1500}>
                    <Layer>
                        <Group>

                            <Text
                                text={'Starting Point'}
                                x={950}
                                y={50}
                                fill="#D88312"
                                fontSize={12}
                                fontStyle=""

                            />
                            <Star
                                key={12}
                                id={11}
                                x={950}
                                y={50}
                                numPoints={5}
                                innerRadius={20}
                                outerRadius={20}
                                fill="#000066"
                                opacity={0.4}
                                rotation={Math.random() * 180}
                                shadowColor="black"
                                shadowBlur={10}
                                shadowOpacity={0.6}
                            />
                            <Text
                                text={'Subject (Second Starting Point)'}
                                x={950}
                                y={100}
                                fill="#330000"
                                fontSize={12}

                            />
                            <Star
                                key={1}
                                id={1}
                                x={950}
                                y={100}
                                numPoints={5}
                                innerRadius={20}
                                outerRadius={20}
                                fill="#00ff00"
                                opacity={0.4}
                                rotation={1}
                                shadowColor="black"
                                shadowBlur={10}
                                shadowOpacity={0.6}
                            />

                            <Text
                                text={'Object (Ending Point)'}
                                x={950}
                                y={150}
                                fill="#330000"
                                fontSize={12}
                                fontStyle=""

                            />
                            <Star
                                key={2}
                                id={2}
                                x={950}
                                y={150}
                                numPoints={5}
                                innerRadius={20}
                                outerRadius={20}
                                fill="#cc0099"
                                opacity={0.4}
                                rotation={1}
                                shadowColor="black"
                                shadowBlur={10}
                                shadowOpacity={0.6}
                            />



                        </Group>
                                <Group
                                    draggable
                                >
                                    <Text
                                        text={this.props.sessionssession}
                                        x={650}
                                        y={100}
                                        fill="black"
                                        fontSize={14}
                                        fontStyle="bold"

                                    />
                                    <Star
                                        key={12}
                                        id={11}
                                        x={650}
                                        y={100}
                                        numPoints={5}
                                        innerRadius={40}
                                        outerRadius={40}
                                        stroke={'black'}
                                        strokeWidth={2}
                                        fill="#000066"
                                        opacity={0.4}
                                        rotation={Math.random() * 180}
                                        shadowColor="black"
                                        shadowBlur={10}
                                        shadowOpacity={0.6}
                                        listening={this.hovermethod}
                                        onMouseEnter={e => {
                                            // style stage container:
                                            const container = e.target.getStage().container();
                                            container.style.cursor = "pointer";
                                        }}
                                        onMouseLeave={e => {
                                            const container = e.target.getStage().container();
                                            container.style.cursor = "default";
                                        }}


                                    />
                                </Group>




                        {this.state.stars_l1.map(
                            (star) => (
                                <Group
                                    draggable
                                >
                                    <Text
                                        text={star.name}
                                        x={star.x-25}
                                        y={star.y}
                                        fill="#07540b"
                                        fontSize={14}
                                        fontStyle="bold"

                                    />
                                    <Star
                                        key={star.id}
                                        id={star.id}
                                        x={star.x}
                                        y={star.y}
                                        numPoints={5}
                                        innerRadius={35}
                                        outerRadius={35}
                                        fill="#00ff00"
                                        opacity={0.4}
                                        rotation={star.rotation}
                                        shadowColor="black"
                                        shadowBlur={10}
                                        shadowOpacity={0.6}
                                        stroke={'black'}
                                        strokeWidth={2}
                                    />
                                </Group>


                            ))}

                        {/*
                        Level 1 Nodes
                        <Text text="Try to drag Concepts for you better understanding \n " />
                         */}


                        {this.state.stars_l2.map(
                            (star) => (
                                <Group
                                    draggable
                                >
                                    <Text
                                        text={star.name}
                                        x={star.x-25}
                                        y={star.y}
                                        fill="#a85d0c"
                                        fontSize={14}
                                        fontStyle="bold"

                                    />
                                    <Star
                                        key={star.id}
                                        id={star.id}
                                        x={star.x}
                                        y={star.y}
                                        numPoints={5}
                                        innerRadius={35}
                                        outerRadius={35}
                                        fill="#cc0099"
                                        opacity={0.4}
                                        rotation={star.rotation}
                                        shadowColor="black"
                                        shadowBlur={10}
                                        shadowOpacity={0.6}
                                        stroke={'black'}
                                        strokeWidth={2}
                                    />
                                </Group>


                            ))}

                        {/*
                            Relationships Connector
                        */}

                        {this.state.relationdisplay.map(

                            (rel) => (
                                <Group
                                    draggable={true}
                                >
                                    <Text
                                        text={rel.relation}
                                        x={((rel.x2)+(rel.x1))/2}
                                        y={((rel.y2)+(rel.y1))/2}
                                        fill="#1723a3"
                                        fontSize={12}
                                        fontStyle="bold"

                                    />
                                    <Line
                                        key="ddd"
                                        points={[rel.x1, rel.y1, rel.x2,rel.y2]}
                                        stroke="black"
                                        opacity={0.3}
                                        tension={1}
                                        strokeWidth={1}

                                    />


                                </Group>


                            ))}

                        {this.state.relationdisplay_main.map(

                            (rel) => (
                                <Group
                                    draggable={true}
                                >
                                    <Line
                                        key="ddd"
                                        points={[rel.x1, rel.y1, rel.x2,rel.y2]}
                                        stroke="black"
                                        opacity={0.3}
                                        tension={1}
                                        strokeWidth={1}

                                    />


                                </Group>


                            ))}






                    </Layer>
                </Stage>
            </div>
        );
    }
}

export default Displayshapes;
