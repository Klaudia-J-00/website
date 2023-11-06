import React from "react";
import { Canvas } from "@react-three/fiber";
import "./style/Personalize.css";
import { CustomizationProvider } from "./contexts/Customization";
import Experience from "./customizer/Experience";
import Configurator from "./customizer/Configurator";


function PersonalizeNumpad() {
  return (
    <CustomizationProvider>
      <div className="personalize-app">
        <Canvas dpr={[1, 2]}>
          <color attach="background" args={["#EFF0F1"]} />
          <fog attach="fog" args={["#EFF0F1", 10, 20]} />
          <Experience />
        </Canvas>
        <Configurator />
      </div>
    </CustomizationProvider>
  );
}

export default PersonalizeNumpad;
