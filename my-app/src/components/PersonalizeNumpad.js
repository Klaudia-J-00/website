import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import Loading from "../components/LoadingError/Loading";
import "./style/Personalize.css";
import Numpad from "./Numpad";
import { CustomizationProvider, colorsForKeyboard, useCustomization } from "./contexts/Customization";

// function Model() {
//   const gltf = useLoader(GLTFLoader, "/models/numpad.gltf");

//   return (
//     <primitive object={gltf.scene} />
//   );
// }

function PersonalizeNumpad() {
  const { baseColor,
    setBaseColor,
    insideBaseColor,
    setInsideBaseColor,
    keyColor,
    setKeyColor,
    keyOtherColor,
    setKeyOtherColor,
  } = useCustomization();
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
              <CustomizationProvider>
                <Numpad />
              </CustomizationProvider>
            </Stage>
            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[170, 170]} />
              <meshBasicMaterial color="#EFF0F1" />
            </mesh>
          </Canvas>
        </Suspense>
        <div className="configurator">
          <div className="configurator-section">
            <div className="configurator-section-title">
              <h3>Baza klawiatury</h3>
            </div>
            <div className="configurator-section-content">
              { colorsForKeyboard.map((item, index) => (
                <div 
                className={`item ${item.color === baseColor.color ? "item--active" : ""}`} 
                key={index}
                onClick={() => setBaseColor(item)}
                >
                  <div className="item-color" style={{ backgroundColor: item.color }}/>
                <div className="item-label">{item.name}</div>
              </div>
              ))
              
              }
            </div>
          </div>
          <div className="configurator-section">
            <div className="configurator-section-title">
              <h3>Środek bazy klawiatury</h3>
            </div>
            <div className="configurator-section-content">
              { colorsForKeyboard.map((item, index) => (
                <div 
                className={`item ${item.color === insideBaseColor.color ? "item--active" : ""}`} 
                key={index}
                onClick={() => setInsideBaseColor(item)}
                >
                  <div className="item-color" style={{ backgroundColor: item.color }}/>
                <div className="item-label">{item.name}</div>
              </div>
              ))
              
              }
            </div>
          </div>
          <div className="configurator-section">
            <div className="configurator-section-title">
              <h3>Klawisze 1</h3>
            </div>
            <div className="configurator-section-content">
              { colorsForKeyboard.map((item, index) => (
                <div 
                className={`item ${item.color === keyColor.color ? "item--active" : ""}`} 
                key={index}
                onClick={() => setKeyColor(item)}
                >
                  <div className="item-color" style={{ backgroundColor: item.color }}/>
                <div className="item-label">{item.name}</div>
              </div>
              ))
              
              }
            </div>
          </div>
          <div className="configurator-section">
            <div className="configurator-section-title">
              <h3>Klawisze 2</h3>
            </div>
            <div className="configurator-section-content">
              { colorsForKeyboard.map((item, index) => (
                <div 
                className={`item ${item.color === keyOtherColor.color ? "item--active" : ""}`} 
                key={index}
                onClick={() => setKeyOtherColor(item)}
                >
                  <div className="item-color" style={{ backgroundColor: item.color }}/>
                <div className="item-label">{item.name}</div>
              </div>
              ))
              
              }
            </div>
          </div>
        </div>
      </div>
  );
}

export default PersonalizeNumpad;
