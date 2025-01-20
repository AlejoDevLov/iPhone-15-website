import { Html, OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import { Iphone, Lights, Loader } from "./";
import { Suspense } from "react";
import * as THREE from "three";


export const ModelView = ( props ) => {

    const { model ,index ,gsapType ,groupRef ,cameraRef ,setRotation ,size } = props;

  return (
    <View
        index={index}
        id={gsapType}
        className={`w-full h-full absolute
            ${ index === 2 ? "right-[-100%]" : "" }`}
    >

        <ambientLight intensity={0.5} />

        <PerspectiveCamera makeDefault position={[0, 0, 4]} />

        <Lights />

        <OrbitControls
            ref={cameraRef}
            makeDefault
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.5}
            target={new THREE.Vector3(0, 0, 0)}
            onEnd={ () => setRotation( cameraRef.current.getAzimuthalAngle() ) }
        />

        <group 
            ref={groupRef} 
            name={`${index} == 1 ? "small" : "large"`} 
            position={[0, 0, 0]} 
            >

                <Suspense fallback={ <Loader /> }>

                    <Iphone
                        scale={index === 1 ? [15,15,15] : [17,17,17]}
                        item={model}
                        size={size}
                    />

                </Suspense>
        
        </group>


    </View>
  )
}
