import './Hero.css';
import * as THREE from 'three';
import gsap from 'gsap';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Nav } from 'react-bootstrap';

function Hero(props) {

  //scene
  const scene = new THREE.Scene()
  const background_color = 0xf8f9fA
  scene.background = new THREE.Color(background_color)
  scene.fog = new THREE.Fog(background_color, 20, 100)

  //loading keyboard
  var loaded_gltf
  const loader = new GLTFLoader();
  loader.load(props.gltfPath, function(gltf) {
    gltf.scene.rotation.x = 0.9;
    gltf.scene.rotation.y = 0.4;
    gltf.scene.rotation.z = 0.1;
    gltf.scene.position.set(3.5,-0.8,0)
    loaded_gltf = gltf.scene
    scene.add( loaded_gltf );
  }, undefined, function ( error ) {
    console.error( error );
  } )

  //sizes 
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  // Add lights
  var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.61 );
  hemiLight.position.set( 0, 50, 0 );
  // Add hemisphere light to scene   
  scene.add( hemiLight );

  var dirLight = new THREE.DirectionalLight( 0xffffff, 0.54 );
  dirLight.position.set( -8, 12, 8 );
  dirLight.castShadow = true;
  dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
  // Add directional Light to scene    
  scene.add( dirLight );

  //Camera 
  const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
  //fov (field of view), aspect ratio, clipping points (miejsce w ktorym "wchodzimy" w sphere i w ktorym oddalamy sie tak, ze go nie widac)
  camera.position.z = 10
  scene.add(camera)

  //render scene on screen 
  const canvas = document.querySelector('.webgl')
  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true})
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(2) //gladsze piksele na brzegach
  renderer.render(scene, camera)


  //resize with window 
  window.addEventListener('resize', () => {
    //update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    //update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
  })

  //animate 
  document.addEventListener('mousemove', onDocumentMouseMove)
  document.addEventListener('mouseout', onDocumentMouseOut)
  let mouseX = 0, mouseY = 0;

  function onDocumentMouseMove(event) {
    mouseX = (event.movementX * 0.5) || event.mozMovementX || event.webkitMovementX || 0;
    mouseY = (event.movementY * 0.5) || event.mozMovementY || event.webkitMovementY || 0;
  }

  function onDocumentMouseOut(event){
    mouseX = 0 
    mouseY = 0 
  }

  const loop = () => {
    if (mouseX || mouseY){
      camera.position.x += ( mouseX - camera.position.x ) * 0.001;
      camera.position.y += ( - mouseY - camera.position.y ) * 0.001;
      camera.position.z += ( - mouseY - camera.position.x ) * 0.0003;
    }
    camera.lookAt( scene.position );
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop)
  }
  loop()

  //timeline
  const tl = gsap.timeline({default: { duration: 15 } })
  tl.fromTo("div.root", {y: "-100%"}, {y: "0%"}) //animacja pojawienia się paska nawigacyjnego i hero

  return (
    <div className='Hero-Container'>
      <div className="Hero">
          <h1>Stwórz Swoją<br></br>Klawiaturę</h1>
          <div className='container'>
              <div className='row Hero-info'>
              Witaj na stronie naszego sklepu, gdzie znajdziesz najwyższej jakości klawiatury, 
              które możesz spersonalizować według swoich upodobań i potrzeb. 
              Nasze produkty są stworzone z myślą o najbardziej wymagających klientach, którzy 
              oczekują nie tylko wysokiej jakości, ale również unikalnego designu.
              Nie czekaj i już teraz zacznij projektować swoją własną klawiaturę, 
              która będzie wyróżniać Cię spośród innych użytkowników.
              </div>
              <div className='row Hero-button p-5'>
                <Nav.Link href="/about" className="btn">dowiedz się więcej</Nav.Link>
              </div>
          </div>
      </div>
    </div>
  );
}

export default Hero;
