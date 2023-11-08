import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import "./style/Personalize.css";
import { CustomizationProvider } from "./contexts/Customization";
import ExperienceForty from "./customizer/ExperienceForty";
import Configurator40 from "./customizer/Configurator40";


function PersonalizeForty() {
  const canvasRef = useRef();

  return (
    <CustomizationProvider>
      <div className="personalize-app">
        <Canvas dpr={[1, 2]} gl={{ preserveDrawingBuffer: true }} ref={canvasRef}>
          <color attach="background" args={["#EFF0F1"]} />
          <fog attach="fog" args={["#EFF0F1", 10, 20]} />
          <ExperienceForty />
        </Canvas>
        <Configurator40 canvasRef={canvasRef}/>
      </div>
    </CustomizationProvider>
  );
}

export default PersonalizeForty;
