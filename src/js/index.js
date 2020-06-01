// CSS
import main from "../scss/main.scss";

import * as THREE from 'three';

const OrbitControls = require('three-orbit-controls')(THREE);
const STLLoader = require('three-stl-loader')(THREE);

const scene = new THREE.Scene();

const initRenderer = () => {
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    return renderer;
};

const initLight = (position) => {
    const light = new THREE.DirectionalLight(0xcccccc, 2);

    light.position.set(position.x, position.y, position.z);

    return light;
};

const initSphere = () => {
    const starsGeometry = new THREE.SphereGeometry(8, 32, 32);
    const starsMaterial = new THREE.MeshBasicMaterial();

    starsMaterial.map = new THREE.TextureLoader().load('assets/textures/sphere.jpg');
    starsMaterial.side = THREE.BackSide;

    return new THREE.Mesh(starsGeometry, starsMaterial);
};

const initCamera = () => {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 3;

    return camera;
};

const renderer = initRenderer();
const camera = initCamera();
const light1 = initLight({ x: 5, y: 3, z: 5});
const light2 = initLight({ x: -5, y: 3, z: -5});
const sphere = initSphere();
const controls = new OrbitControls(camera, renderer.domElement);

scene.add(light1);
scene.add(light2);
scene.add(sphere);

controls.update();

const animate = () => {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);

    controls.update();
};

const getBoard = (size, position, rotation) => {
    const geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
    const material = new THREE.MeshPhongMaterial();

    material.map = new THREE.TextureLoader().load('assets/textures/diffuse.jpg');
    // material.bumpMap = new THREE.TextureLoader().load('assets/textures/bump.jpg');     
    // material.bumpScale = 0.015;

    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.x = position.x;
    mesh.position.y = position.y;
    mesh.position.z = position.z;

    mesh.rotation.x = rotation.x;
    mesh.rotation.y = rotation.y;
    mesh.rotation.z = rotation.z;

    return mesh;
};

const addMeshes = (scene) => {
    // Left
    scene.add(getBoard(
        { x: 0.05, y: 2, z: 2 },
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 }
    ));
    
    // Right
    scene.add(getBoard(
        { x: 0.05, y: 2, z: 2 },
        { x: 2, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 }
    ));

    // Top
    scene.add(getBoard(
        { x: 0.05, y: 2, z: 2 },
        { x: 1, y: 1, z: 0 },
        { x: 0, y: 0, z: Math.PI / 2 }
    ));
    
    // Bottom
    scene.add(getBoard(
        { x: 0.05, y: 2, z: 2 },
        { x: 1, y: -1, z: 0 },
        { x: 0, y: 0, z: Math.PI / 2 }
    ));

    // Rear
    scene.add(getBoard(
        { x: 0.05, y: 2, z: 2 },
        { x: 1, y: 0, z: -1 },
        { x: 0, y: Math.PI / 2, z: 0 }
    ));

    // Front
    scene.add(getBoard(
        { x: 0.05, y: 2, z: 2 },
        { x: 1, y: 0, z: 1 },
        { x: 0, y: Math.PI / 2, z: 0 }
    ));
};

const loader = new STLLoader();
loader.load('assets/objects/knob.stl', function ( geometry ) {

    let meshMaterial = new THREE.MeshPhongMaterial( { opacity: geometry.alpha, vertexColors: true } );

    let mesh = new THREE.Mesh( geometry, meshMaterial );

    mesh.position.set(0.2, 0, 1.09);
    mesh.rotation.set( - Math.PI / 2, Math.PI / 2, 0 );
    mesh.scale.set(0.003, 0.003, 0.003);

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    scene.add(mesh);
});




addMeshes(scene);
animate();

