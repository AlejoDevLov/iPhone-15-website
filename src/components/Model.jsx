import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import { ModelView } from "./ModelView";
import { useRef, useState } from "react";
import { yellowImg } from "../utils";
import * as THREE from "three";

export const Model = () => {

    const [setsize, setSetsize] = useState("small");

    const [Model, setModel] = useState({
        title: "iPhone 15 Pro in Natural Titanium",
        color: ["#8F8A81", "#ffe7b9", "#6f6c64"],
        img: yellowImg
    });

    // camera control for the model view
    const cameraControlSmall = useRef();
    const cameraControlLarge = useRef();

    const smallModel = useRef(new THREE.Group());
    const largeModel = useRef(new THREE.Group());

    useGSAP( () => {
        gsap.to("#heading", { opacity: 1, y: 0 });
    },[]);

  return (
    <section className="common-padding">
        <div className="screen-max-width">
            <h1 id="heading" className="section-heading">Take a closer look.</h1>

            <div className="flex flex-col items-center mt-5">
                <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
                    <ModelView />
                </div>
            </div>
        </div>
    </section>
  )
}
