import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import { ModelView } from "./ModelView";
import { useEffect, useRef, useState } from "react";
import { yellowImg } from "../utils";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "../constants";
import { animationWithGsap } from "../utils/animations";

export const Model = () => {

    const [size, setSize] = useState("small");

    const [model, setModel] = useState({
        title: "iPhone 15 Pro in Natural Titanium",
        color: ["#8F8A81", "#ffe7b9", "#6f6c64"],
        img: yellowImg
    });

    // camera control for the model view
    const cameraControlSmallModel = useRef();
    const cameraControlLargeModel = useRef();

    const smallModel = useRef(new THREE.Group());
    const largeModel = useRef(new THREE.Group());

    const [smallModelRotation, setSmallModelRotation] = useState(0);
    const [largeModelRotation, setLargeModelRotation] = useState(0);

    const tl = gsap.timeline();

    useEffect( () => {
        if (size === "large") {
            const params = {
                timeline: tl,
                rotationRef: smallModel,
                rotationState: smallModelRotation,
                firstTarget: "#view1",
                secondTarget: "#view2",
                animationProps: {
                    transform: `translateX(-100%)`,
                    duration: 1.5,
                }
            }
            animationWithGsap(params);
        }

        if (size === "small") {
            const params = {
                timeline: tl,
                rotationRef: largeModel,
                rotationState: largeModelRotation,
                firstTarget: "#view2",
                secondTarget: "#view1",
                animationProps: {
                    transform: `translateX(0%)`,
                    duration: 1.5,
                }
            }
            animationWithGsap(params);
        }
    }, [size]);

    useGSAP( () => {
        gsap.to("#heading", { opacity: 1, y: 0 });
    },[]);

  return (
    <section className="common-padding">
        <div className="screen-max-width">
            <h1 id="heading" className="section-heading">Take a closer look.</h1>

            <div className="flex flex-col items-center mt-5">
                <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
                    
                    <ModelView 
                        model={model}
                        index={1}
                        gsapType="view1"
                        groupRef={smallModel}
                        cameraRef={cameraControlSmallModel}
                        setRotation={setSmallModelRotation}
                        size={size}
                    />

                    <ModelView 
                        model={model}
                        index={2}
                        gsapType="view2"
                        groupRef={largeModel}
                        cameraRef={cameraControlLargeModel}
                        setRotation={setLargeModelRotation}
                        size={size}
                    />

                    <Canvas 
                        className="w-full h-full"
                        style={{ inset: 0 , position: "fixed", overflow: "hidden"}}
                        eventSource={document.getElementById("root")}>
                        <View.Port/>
                    </Canvas>

                </div>

                <div>
                    <p className="text-center font-light text-sm mb-5">{model.title}</p>
                    
                    <div className="flex-center">
                        <ul className="color-container">
                            { models.map( (model, index) => (
                                <li 
                                    key={index} 
                                    className="w-6 h-6 rounded-full mx-2 cursor-pointer"
                                    style={{ backgroundColor: model.color[0] }}
                                    onClick={ () => {
                                        setModel(model) 
                                        }}>
                                </li>
                            ))}
                        </ul>

                        <button className="size-btn-container">
                            { sizes.map( ({ label, value }) => (
                                <span 
                                    key={label} 
                                    className="size-btn"
                                    style={{ 
                                        backgroundColor: value === size ? "#FFF" : "transparent", 
                                        color: value === size ? "#000" : "#FFF" }}
                                    onClick={ () => setSize(value) }>
                                    { label }
                                </span>
                            ))}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
