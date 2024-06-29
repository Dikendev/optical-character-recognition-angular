import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { GreetingsComponent } from './greetings/greetings.component';
import { AnalyticComponent } from '../analytic/analytic.component';
import { FeatureComponent } from './feature/feature.component';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ButtonComponent,
    GreetingsComponent,
    AnalyticComponent,
    FeatureComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  renderer!: THREE.WebGLRenderer;

  title = 'Home Page';

  explanationTitle = 'Mas como é feita essa análise?';

  explanationText =
    'Para cada vaga, são pré-definidas palavras-chave que são utilizadas para verificar se estão presentes nos currículos, selecionando-os nessa primeira etapa';

  textTitle =
    'As empresas estão cada vez mais optando por utilizar automação para agilizar processos e automatizar, resultando em uma pré-seleção de currículos feita por essa tecnologia.';

  text =
    'Este sistema utiliza Optical Character Recognition (OCR), uma tecnologia que possibilita o reconhecimento de caracteres a partir de arquivos de imagem.';

  howItWorksText =
    'Aqui você pode simular e testar se o seu curriculo passaria por essa etapa.';

  lgpdText =
    'Em conformidade com a Lei Geral de Proteção de Dados (LGPD), não coletamos nem armazenamos dados pessoais sensíveis, garantindo assim a proteção e privacidade das informações dos nossos usuários.';

  helpText =
    'Como  vivem? Onde comem? O que fazem?, clique nos pontos vermelhos para saber mais.';

  firstPoint =
    'OCR é uma tecnologia que possibilita o reconhecimento de caracteres a partir de arquivos de imagem.';

  secondPoint =
    'OCR também é usando para leitura de placas de veículos (em sistemas de pedágio ou estacionamento)';

  thirdPoint =
    'O Tesseract é um dos OCR mais populares e é mantido pelo Google. Ele é de código aberto e suporta mais de 100 idiomas.';

  fourthPoint =
    'O OCR funciona analisando a imagem de um texto, identificando os padrões de luz e escuridão, e comparando-os com um banco de dados de caracteres conhecidos.';

  constructor() {}

  ngOnInit(): void {
    this.initThree();
  }

  initThree() {
    const width = 600; // Adjust the width and height as needed
    const height = 600;
    const canvas = document.getElementById('canvas');
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 2; // Position the camera so the image is visible

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0xffffff, 1);

    canvas?.appendChild(renderer.domElement);

    const orbitControls = new OrbitControls(camera, renderer.domElement);

    orbitControls.maxAzimuthAngle = Math.PI / 8; // Horizontal rotation limit
    orbitControls.minAzimuthAngle = -Math.PI / 8;
    orbitControls.maxPolarAngle = Math.PI / 2 + Math.PI / 8; // Vertical rotation limit
    orbitControls.minPolarAngle = Math.PI / 2 - Math.PI / 8;
    orbitControls.enableZoom = false; // Disable zooming

    // Load image texture
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('./../../assets/images/ai.jpeg'); // Replace with your image path

    // Create plane to display the image
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const plane = new THREE.Mesh(geometry, material);

    const group = new THREE.Group();

    group.add(plane);
    scene.add(group);
    // Points of interest
    const pointsOfInterest = [
      { x: -0.5, y: 0.5, description: this.firstPoint },
      { x: 0.5, y: -0.5, description: this.secondPoint },
      { x: 0.2, y: 0.4, description: this.thirdPoint },
      { x: 0.1, y: -0.2, description: this.fourthPoint },
    ];

    // Add red spheres at points of interest
    const sphereGeometry = new THREE.SphereGeometry(0.04, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    pointsOfInterest.forEach((poi) => {
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.set(poi.x, poi.y, 0);
      plane.add(sphere);
    });

    // Tooltips
    const tooltip = document.createElement('div');
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = 'white';
    tooltip.style.padding = '5px';
    tooltip.style.border = '1px solid black';
    tooltip.style.display = 'none';
    document.body.appendChild(tooltip);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);

      if (intersects.length > 0) {
        const intersect = intersects[0];
        const point = intersect.point;
        let found = false;

        for (const poi of pointsOfInterest) {
          if (
            Math.abs(point.x - poi.x) < 0.1 &&
            Math.abs(point.y - poi.y) < 0.1
          ) {
            tooltip.innerHTML = poi.description;
            tooltip.style.left = event.clientX + 'px';
            tooltip.style.top = event.clientY + 'px';
            tooltip.style.display = 'block';
            found = true;
            break;
          }
        }

        if (!found) {
          tooltip.style.display = 'none';
        }
      } else {
        tooltip.style.display = 'none';
      }
    };

    window.addEventListener('click', onMouseClick);

    const animate = () => {
      requestAnimationFrame(animate);

      // Add rotation animation to the plane
      // Calculate the rotation angle using a sine function for smooth oscillation
      const time = Date.now() * 0.002; // Get the current time in seconds
      const angle = Math.sin(time) * 0.1; // Adjust the multiplier for the desired rotation range

      // Apply the rotation angle to the plane
      group.rotation.x = angle;
      group.rotation.y = angle;

      renderer.render(scene, camera);
      orbitControls.update();
    };

    animate();
  }
}
