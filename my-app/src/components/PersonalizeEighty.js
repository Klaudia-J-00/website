import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import "./style/Personalize.css";
import { CustomizationProvider } from "./contexts/Customization";
import ExperienceEighty from "./customizer/ExperienceEighty";
import Configurator80 from "./customizer/Configurator80";

const PersonalizeEighty = () => {
    const canvasRef = useRef();

  return (
    <CustomizationProvider>
      <div className="personalize-app">
        <Canvas
          dpr={[1, 2]}
          gl={{ preserveDrawingBuffer: true }}
          ref={canvasRef}
        >
          <color attach="background" args={["#EFF0F1"]} />
          <fog attach="fog" args={["#EFF0F1", 10, 20]} />
          <ExperienceEighty />
        </Canvas>
        <Configurator80 canvasRef={canvasRef} />
      </div>
    </CustomizationProvider>
  );
};
export default PersonalizeEighty;
