import React from 'react';
import { render } from 'react-dom';
import {Stage, Layer, Star, Text, Circle, Group} from 'react-konva';
import NavigationBar from "../../../navigation/NavigationBar";
import Konva from "konva";

const squreno=1;

function generateShapes() {
    return [...Array(squreno)].map((_, i) => ({
        id: i.toString(),
        x: 0.1* window.innerWidth,
        y: 0.1 * window.innerHeight,
        //name:i.toString()+'Im a star',
        name:'Computer',
        rotation: Math.random() * 180,
        isDragging: false,
    }));
}

const INITIAL_STATE = generateShapes();
//const [image] = useImage("https://i.stack.imgur.com/7nF5K.png");

function DisplayShapeTwo () {
    const [stars, setStars] = React.useState(INITIAL_STATE);
    const [stars_name, setStars_name] = React.useState(INITIAL_STATE);

    const handleDragStart = (e) => {
        const id = e.target.id();
        setStars(
            stars.map((star) => {
                return {
                    ...star,
                    isDragging: star.id === id,
                };
            })
        );
    };
    const handleDragEnd = (e) => {
        setStars(
            stars.map((star) => {
                return {
                    ...star,
                    isDragging: false,
                };
            })
        );
    };

    return (<div>
        <Stage width={700} height={window.innerHeight}>
            <Layer>

                {/*
                Level 1 Nodes
                <Text text="Try to drag Concepts for you better understanding \n " />
                */}
                <Text text="Level 1 Nodes" />
                {stars.map(
                    (star) => (
                        <Group
                            draggable
                        >
                        <Text
                        text={star.name}
                        x={star.x-12}
                        y={star.y}
                        fill="#ff4dff"
                        />
                        <Star
                            key={star.id}
                            id={star.id}
                            x={star.x}
                            y={star.y}
                            numPoints={5}
                            innerRadius={20}
                            outerRadius={20}
                            fill="BLACK"
                            opacity={0.4}
                            rotation={star.rotation}
                            shadowColor="black"
                            shadowBlur={10}
                            shadowOpacity={0.6}
                    />
                        </Group>


                    ))}



                {/*stars.map((star) => (
                    <Star
                        key={star.id}
                        id={star.id}
                        x={star.x}
                        y={star.y}
                        numPoints={5}
                        innerRadius={20}
                        outerRadius={40}
                        fill="#FFFFFF"
                        opacity={0.8}
                        draggable
                        rotation={star.rotation}
                        shadowColor="black"
                        shadowBlur={10}
                        shadowOpacity={0.6}
                        shadowOffsetX={star.isDragging ? 10 : 5}
                        shadowOffsetY={star.isDragging ? 10 : 5}
                        scaleX={star.isDragging ? 1.2 : 1}
                        scaleY={star.isDragging ? 1.2 : 1}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}

                    />
                ))*/}

            </Layer>
        </Stage>
        </div>

    );
};

export default DisplayShapeTwo;
