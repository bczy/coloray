import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    BoxGeometry,
    BufferGeometry,
    SphereGeometry,
} from 'three';

import { EffectComposer } from './postprocessing/EffectComposer';
import { RenderPass } from './postprocessing/RenderPass';
import { GlitchPass } from './postprocessing/GlitchPass';
import { FilmPass } from './postprocessing/FilmPass';
import { SMAAPass } from './postprocessing/SMAAPass';
import { UnrealBloomPass } from './postprocessing/UnrealBloomPass';

import { SceneObjectProps, BasicMesh, BasicMeshProps } from './graphics/BasicMesh';

function onWindowResize(
    camera: PerspectiveCamera,
    renderer: WebGLRenderer
): void {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function initScene(): {
    scene: Scene;
    camera: PerspectiveCamera;
    composer: WebGLRenderer;
} {
    const scene = new Scene();
    const renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const camera = new PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1
    );
    camera.position.z = 7.5;

    const composer = initPostProcess(renderer, scene, camera);

    return { camera, composer, scene };
}

function initPostProcess(
    renderer: WebGLRenderer,
    scene: Scene,
    camera: PerspectiveCamera
): EffectComposer {
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new UnrealBloomPass({x: 256, y: 256}, 2));
    composer.addPass(new FilmPass(0.5, 2.5, 1024, false));
    composer.addPass(new GlitchPass(32));
    return composer;
}

async function initSceneObjects(
    scene,
    jsonPath: string,
    geometry: BufferGeometry
): Promise<Array<typeof BasicMesh>> {
    const { sceneObjects } = await (await fetch(jsonPath)).json();
    return sceneObjects.map(
        (sceneObject: BasicMeshProps) => {
            const { position, scale, rotation, color } = sceneObject;
            const basicMesh = new BasicMesh(scene, geometry, rotation, color, position, scale);
            return basicMesh;
        }
    );
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
        cube.animate(step);
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
    const spheres = await initSceneObjects(
        scene,
        '/assets/spheres.json',
        new SphereGeometry(undefined, 6, 6)
    );
    const cubes = await initSceneObjects(
        scene,
        '/assets/cubes.json',
        new BoxGeometry(5, 5, 5)
    );
    gameObjects.push(...cubes, ...spheres);

    window.addEventListener(
        'resize',
        () => onWindowResize(camera, composer),
        false
    );
    animate(scene, camera, composer, gameObjects, 0);
}

init();
