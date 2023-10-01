import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import './index.css';
import {doTriangulation} from './utils/Api.js';

const buttonSubmit = document.querySelector('.form__submit');
const form = document.querySelector('.form');
const inputHeight = document.querySelector('.form__input_height');
const inputRadius = document.querySelector('.form__input_radius');
const inputSegments = document.querySelector('.form__input_segments');

let data = {};

function submitData(evt) {
    evt.preventDefault();
    
data.height = inputHeight.value;
data.radius = inputRadius.value;
data.segments = inputSegments.value;
    
    doTriangulation(data)
}

form.addEventListener('submit', submitData)


//Добавляем сцену:
const scene = new THREE.Scene(); 
scene.background = new THREE.Color(0x282c34);

//Добавляем перспективную камеру:
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); 
// const camera = new THREE.OrthographicCamera(-1, 1, 1.5, -1.5, 1, 10);

// camera.position.set(0, 0, 5); // перемещение объекта  (горизонталь, вертикаль, глубина)


//Создаем объект рендера, устанавливаем его размер в соответствии с размером видимой области и добавляем его на страницу
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

// Берем элемент DOM и прикрепляем renderer.domElement к нему
document.body.appendChild( renderer.domElement );


//для движения камеры
// Добавляем управление, устанавливаем как цель тот же DOM элемент
// let controls = new OrbitControls(camera, document.getElementById('threejs'));
// controls.target.set(0, 0, 0);
// controls.rotateSpeed = 0.5;
// controls.update();

//Для создания конуса сначала задаем геометрию:
const geometry = new THREE.ConeGeometry( 5, 20, 10 );  //(радиус, высота,  число граней)

//Задаем матерал
const material = new THREE.MeshBasicMaterial( { color: 0xA9A9A9, } ); //wireframe: true, emissive: 0x111111,

// Теперь нам нужен объект Mesh, который принимает геометрию, и применяет к нему материал:
const cone = new THREE.Mesh( geometry, material );

// cone.scale.x = 0.8;  // изменение размера
// cone.scale.y = 0.8;
// cone.scale.z = 0.8;

scene.add( cone );


// Чем больше значение, тем дальше расположен объект от экрана
camera.position.z = 20;

// // Добавляем освещение, устанавливаем его и добавляем на сцену
// const frontSpot = new THREE.SpotLight(0xeeeece);
// const frontSpot2 = new THREE.SpotLight(0xddddce);

// frontSpot.position.set(1000, 1000, 1000);
// frontSpot2.position.set(-500, -500, -500);

// scene.add(frontSpot);
// scene.add(frontSpot2);

const clock = new THREE.Clock();

const animate = function () {

    const elapsedTime = clock.getElapsedTime();

    requestAnimationFrame(animate);

    // cone.rotation.x += 0.01;  // вращение объекта
    // cone.rotation.y += 0.01;
    // cone.rotation.z += 0.01;

    cone.rotation.z = Math.PI*-0.25;  // quaternion

    // camera.lookAt(new THREE.Vector3(0, 0, 20))

    renderer.render(scene, camera);
}

// const frontSpot = new THREE.SpotLight(0xeeeece);
// frontSpot.position.set(1000, 1000, 1000);
// scene.add(frontSpot);

animate();