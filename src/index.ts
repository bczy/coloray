import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    BoxGeometry,
    MeshBasicMaterial,
} from 'three';

import { Cube } from './Cube';

function createScene() {
    const scene = new Scene();
    const renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const camera = new PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1
    );
    camera.position.z = 5;

    return { camera, renderer, scene };
}

function onWindowResize(camera: PerspectiveCamera, renderer: WebGLRenderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate(
    scene: Scene,
    camera: PerspectiveCamera,
    renderer: WebGLRenderer,
    cubes: any[],
    step = 0
) : void {
    step++;
    cubes.forEach((cube: { rotate: (arg0: number) => any }) =>
        cube.rotate(step)
    );
    renderer.render(scene, camera);
    requestAnimationFrame(() => animate(scene, camera, renderer, cubes, step));
}

async function initCubes(scene: Scene) {
    const geometry = new BoxGeometry();
    const cubesData = await (await fetch('/assets/cubes.json')).json();
    return cubesData.cubes.map(
        (cubeData: {
            color?: number;
            position?: Array<number>;
            scale?: number;
            rotation?: number;
        }) => {
            const material = new MeshBasicMaterial({ color: cubeData.color });
            material.wireframe = true;
            return Cube(scene, cubeData, { geometry, material });
        }
    );
}

async function init() {
    document.body.style.margin = '0';
    const { camera, renderer, scene } = createScene();

    const cubes = await initCubes(scene);

    window.addEventListener(
        'resize',
        () => onWindowResize(camera, renderer),
        false
    );
    animate(scene, camera, renderer, cubes);
}

init();
