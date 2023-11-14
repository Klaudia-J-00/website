import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import "./style/Personalize.css";
import { CustomizationProvider } from "./contexts/Customization";
import ExperienceHundred from "./customizer/ExperienceHundred";
import Configurator100 from "./customizer/Configurator100";

const PersonalizeHundred = () => {
    const canvasRef = useRef();

    return(
        <CustomizationProvider>
      <div className="personalize-app">
        <Canvas
          dpr={[1, 2]}
          gl={{ preserveDrawingBuffer: true }}
          ref={canvasRef}
        >
          <color attach="background" args={["#EFF0F1"]} />
          <fog attach="fog" args={["#EFF0F1", 10, 20]} />
          <ExperienceHundred />
        </Canvas>
        <Configurator100 canvasRef={canvasRef} />
      </div>
    </CustomizationProvider>
    )
}
export default PersonalizeHundred;