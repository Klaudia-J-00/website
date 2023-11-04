import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Stage,
} from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import Loading from "../components/LoadingError/Loading";
import "./style/Personalize.css";
import Numpad from "./Numpad";

// function Model() {
//   const gltf = useLoader(GLTFLoader, "/models/numpad.gltf");

//   return (
//     <primitive object={gltf.scene} />
//   );
// }

function PersonalizeNumpad() {
  return (
    <div className="personalize-app">
      <Suspense fallback={<Loading />}>
        <Canvas camera={{ position: [10, 10, 5] }}>
          <color attach="background" args={["#EFF0F1"]} />
          <fog attach="fog" args={["#EFF0F1", 10, 20]} />
          <OrbitControls
            enableZoom
            enableRotate
            minPolarAngle={Math.PI / 10}
            maxPolarAngle={Math.PI / 2.2}
          />
          <Stage environment="city" intensity={0.6} contactShadow={false}>
            <Numpad />
        </Stage>
            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} >
              <planeGeometry args={[170, 170]} />
              <meshBasicMaterial color="#EFF0F1" />
            </mesh>
          
        </Canvas>
      </Suspense>
    </div>
  );
}

export default PersonalizeNumpad;
