import './css/reset.css'
import './css/style.min.css'
import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Debug
// const gui = new dat.GUI()

// Canvas

const canvas = document.querySelector('canvas.webgl')

// Scene

const scene = new THREE.Scene()

/*******************************************************************
 * 
 *                              TEXTURES
 * 
 *******************************************************************/

 const textureLoader = new THREE.TextureLoader()

 
 const imageTexture = textureLoader.load('/img/bg-2.jpg')
 const imageTextureTwo = textureLoader.load('/img/bg-3.jpg')
 const imageTextureThree = textureLoader.load('/img/bg-4.jpg')
 const imageTextureFour = textureLoader.load('/img/bg-5.jpg')
 const imageTextureFive = textureLoader.load('/img/bg-6.jpg')
 const heightTexture = textureLoader.load('/img/height5.png')
 const alphaTexture = textureLoader.load('/img/alpha2.png')
 
 const textureArray = [
    imageTexture,
    imageTextureTwo,
    imageTextureThree,
    imageTextureFour,
    imageTextureFive
 ]

 const showTexture = 0;
 

 
/*******************************************************************
 * 
 *                              OBJECTS
 * 
 *******************************************************************/

/**
 * Material Plane 
 */

// Geometry

 const materialPlaneGeometry = new THREE.PlaneGeometry(5, 3.25, 64, 64)

 // Materials

const  materialPlaneMaterial = new THREE.MeshStandardMaterial({
    color: '#6187e5',
    map: textureArray[0],
    displacementMap: heightTexture,
    displacementScale: 0,
    transparent: true,
    alphaMap: alphaTexture,
    depthTest: false
    
})

// Mesh

const plane = new THREE.Mesh(materialPlaneGeometry, materialPlaneMaterial)

scene.add(plane);


/**
 * Material Plane
 */

/********************************************************************
 * 
 *                              CAMERA
 * 
 ********************************************************************/

/**
 *  Lights
 */

// Point Light

const pointLight = new THREE.PointLight(0xffffff, 2)
pointLight.position.x = 0
pointLight.position.y = 2
pointLight.position.z = 8
scene.add(pointLight);

/**
 * Sizes
 */

 const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 2
scene.add(camera)

// Controls

// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true


/********************************************************************
 * 
 *                              RENDERER
 * 
 ********************************************************************/

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/********************************************************************
 * 
 *                              Pagination
 * 
 ********************************************************************/

const pageControl = document.querySelector('.page-controller')
let currentTexture = 0

// creates and adds the pagination buttons to the DOM

for (let idx = 0; idx < textureArray.length; idx +=1){
    document.querySelector('.page-controller').innerHTML += ' <button class="pagButton" data-idx="' + idx + '"></button>'
}

// Page Timer

// let textureInterval

// textureInterval = setInterval( (e) =>{
//     currentTexture += 1;
//     if (currentTexture == textureArray.length){
//         currentTexture = 0;
//     }
//     updateTexture(currentTexture)
// }, 6000);

// activates the first pagination button

document.querySelector('.page-controller').querySelector('button').classList.add('active');

// event listener to handle the controls and change the texture map

pageControl.addEventListener('click', (e)=> {

    let controlTarget = e.target

    if (controlTarget.hasAttribute('data-idx')){
        currentTexture = Number(controlTarget.dataset.idx)
    }
    console.log(currentTexture)

//    materialPlaneMaterial.map = textureArray[currentTexture]

    updateTexture();
})

function updateTexture() {
    materialPlaneMaterial.map = textureArray[currentTexture]
}


/********************************************************************
 * 
 *                              SCENE ANIMATION
 * 
 ********************************************************************/

// clock used to calculate the elapsed time and allow objects to move in the scene

const clock = new THREE.Clock()

// mouse controls

function mousecontroller(e) {
    mouseX = e.clientX
    mouseY = e.clientY
}

document.addEventListener('mousemove', mousecontroller)

let mouseX = 0
let mouseY = 0


// tick function animates the scene

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    
    // Update controls
    // controls.update()

    // Update the Material Plane

    plane.material.displacementScale = 0 + mouseX * 0.0002
    plane.material.displacementScale = 0 + mouseY * 0.0002
    plane.position.x = 0 - mouseX * 0.00005
    plane.position.y = 0 - mouseY * 0.00005

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()