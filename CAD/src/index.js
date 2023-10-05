import * as THREE from "three";

import "./index.css";
import { doTriangulation } from "./utils/Api.js";

const buttonSubmit = document.querySelector(".form__submit");
const form = document.querySelector(".form");
const inputHeight = document.querySelector(".form__input_height");
const inputRadius = document.querySelector(".form__input_radius");
const inputSegments = document.querySelector(".form__input_segments");
const heightCone = document.querySelector('.params__height');
const radiusCone = document.querySelector('.params__radius');
const segmentsCone = document.querySelector('.params__segments');

//Добавляем сцену:
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x2A4480);

//Добавляем перспективную камеру:
const camera = new THREE.PerspectiveCamera(
  125,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// // Чем больше z значение, тем дальше расположен объект от экрана
camera.position.set(0, -18, 60); // перемещение объекта  (горизонталь, вертикаль, глубина)

//Создаем объект рендера, устанавливаем его размер в соответствии с размером видимой области и добавляем его на страницу
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Берем элемент DOM и прикрепляем renderer.domElement к нему
document.body.appendChild(renderer.domElement);

let data = {};

function submitData(evt) {
  evt.preventDefault();

  data.height = inputHeight.value;
  data.radius = inputRadius.value;
  data.segments = inputSegments.value;

  doTriangulation(data).then((array) => {
    scene.clear();

    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array(array);
    const arrayLines = [];
    for (let i = 1; i < array.length / 3; i++) {
      arrayLines.push(i);
    }

    for (let i = 0; i < array.length / 3; i++) {
      arrayLines.push(0, i);
    }

    const lines = arrayLines.push(Number(1));

    const indices = arrayLines;

    geometry.setIndex(indices);
    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

    //Задаем матерал
    const material = new THREE.MeshBasicMaterial({ color: 0xfffff }); //wireframe: true, emissive: 0x111111,

    const cone = new THREE.Line(geometry, material);

    scene.add(cone);

    heightCone.textContent = 'Высота конуса: '+inputHeight.value;
    radiusCone.textContent = 'Радиус конуса: '+inputRadius.value;
    segmentsCone.textContent = 'Количекство сегментов: '+inputSegments.value;


    inputHeight.value = "";
    inputRadius.value = "";
    inputSegments.value = "";


  });
}

form.addEventListener("submit", submitData);

const animate = function () {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

animate();
