import {
    MeshReflectorMaterial,
    PresentationControls,
    Stage,
  } from "@react-three/drei";
 import Numpad from "../Numpad";
 import Forty from "../Forty";
  
  const Experience = () => {
    return (
      <>
        <PresentationControls
          speed={1.5}
          global
          polar={[-0.1, Math.PI / 4]}
          rotation={[Math.PI / 8, Math.PI / 4, 0]}
        >
          <Stage environment="city" intensity={0.6} castShadow={false}>
            /* <Numpad/> */
          </Stage>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position-y={-0.35}>
            <planeGeometry args={[170, 170]}/>
            <MeshReflectorMaterial
              blur={[300, 100]}
              roughness={1}
              color="#8a8888"
              metalness={0.5}
            />
          </mesh>
        </PresentationControls>
      </>
    );
  };
  
  export default Experience;
  