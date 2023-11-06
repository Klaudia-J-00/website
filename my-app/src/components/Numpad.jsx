/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.14 public/models/numpad.gltf 
*/

import React from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { useCustomization } from './contexts/Customization';

const Numpad = (props) => {
  const { nodes, materials } = useGLTF("/models/numpad.gltf");
  const { baseColor, insideBaseColor, keyColor, keyOtherColor } = useCustomization();

  const plasticTextureProps = useTexture({
    aoMap: "/textures/scuffed-plastic-ao.png",
    roughnessMap: "/textures/Plastic_001_ROUGH.jpg",
    metalnessMap: "/textures/scuffed-plastic-metal.png",
  })

  return (
    <group {...props} dispose={null}>
      <group position={[0, 0.014, 0]} scale={[1.044, 1, 1.503]}>
        <mesh geometry={nodes.Plane023.geometry}  >
          <meshStandardMaterial {...plasticTextureProps} color={baseColor.color}/>  
        </mesh>
        <mesh geometry={nodes.Plane023_1.geometry} >
          <meshStandardMaterial {...plasticTextureProps}  color={insideBaseColor.color}/>  
          </mesh>
      </group>
      <mesh geometry={nodes.Keys1.geometry} material={materials.Keys1} position={[-0.684, 0.342, -0.633]} scale={0.215} >
      <meshStandardMaterial  {...plasticTextureProps}  color={keyColor.color}/>  
        </mesh>
      <mesh geometry={nodes.Keys2.geometry} material={materials.Keys2} position={[-0.684, 0.342, -0.633]} scale={0.215} > 
      <meshStandardMaterial {...plasticTextureProps}  color={keyOtherColor.color}/>  
      </mesh>
      <mesh geometry={nodes.Text.geometry} material={materials.text} position={[0.635, 0.706, -1.154]} scale={0.118} />
    </group>
  )
}
export default Numpad

useGLTF.preload('/numpad.gltf')
