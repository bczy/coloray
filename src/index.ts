import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    BoxGeometry,
    MeshBasicMaterial,
    BufferGeometry,
    SphereGeometry,
} from 'three';

import { EffectComposer } from './postprocessing/EffectComposer';
import { RenderPass } from './postprocessing/RenderPass';
import { GlitchPass } from './postprocessing/GlitchPass';
import { FilmPass } from './postprocessing/FilmPass';
import { SMAAPass } from './postprocessing/SMAAPass';

import { SceneObjectProps, SceneObject } from './SceneObject';

function onWindowResize(camera: PerspectiveCamera, renderer: WebGLRenderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function initScene() {
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
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const glitchPass = new GlitchPass(32);
    composer.addPass(glitchPass);

    const filmPass = new FilmPass(0.75, 2.5, 2.5, false);
    composer.addPass(filmPass);

    const smaaPass = new SMAAPass(
        window.innerWidth * renderer.getPixelRatio(),
        window.innerHeight * renderer.getPixelRatio()
    );
    composer.addPass(smaaPass);

    return { camera, composer, scene };
}

function createMaterial(color: number) {
    const material = new MeshBasicMaterial({ color });
    material.wireframe = true;
    return material;
}

async function initSceneObjects(
    scene,
    jsonPath: string,
    geometry: BufferGeometry
) {
    const { sceneObjects } = await (await fetch(jsonPath)).json();
    return sceneObjects.map(
        (sceneObject: {
            color?: number;
            position?: Array<number>;
            scale?: number;
            rotation?: number;
        }) => {
            const material = createMaterial(sceneObject.color);
            return SceneObject(scene, sceneObject, { geometry, material });
        }
    );
}

async function initCubes(scene: Scene) {
    const geometry = new BoxGeometry();
    return await initSceneObjects(scene, '/assets/cubes.json', geometry);
}
async function initSpheres(scene: Scene) {
    const geometry = new SphereGeometry(undefined, 16, 16);
    return await initSceneObjects(scene, '/assets/spheres.json', geometry);
}

function animate(
    scene: Scene,
    camera: PerspectiveCamera,
    composer: EffectComposer,
    sceneObjects: Array<SceneObjectProps>,
    step = 0
): void {
    step++;
    sceneObjects.forEach((cube: SceneObjectProps) => {
        cube.rotate(step);
    });
    composer.render(scene, camera);
    requestAnimationFrame(() =>
        animate(scene, camera, composer, sceneObjects, step)
    );
}

async function init() {
    document.body.style.margin = '0';
    const { camera, composer, scene } = initScene();

    const gameObjects = [];
    const cubes = await initCubes(scene);
    const spheres = await initSpheres(scene);
    gameObjects.push(...cubes, ...spheres);

    window.addEventListener(
        'resize',
        () => onWindowResize(camera, composer),
        false
    );
    animate(scene, camera, composer, gameObjects, 0);
}

init();
