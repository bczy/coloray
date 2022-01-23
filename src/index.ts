import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    BoxGeometry,
    SphereGeometry,
} from 'three';

import { EffectComposer } from './postprocessing/EffectComposer';
import { RenderPass } from './postprocessing/RenderPass';
import { GlitchPass } from './postprocessing/GlitchPass';
import { FilmPass } from './postprocessing/FilmPass';
import { UnrealBloomPass } from './postprocessing/UnrealBloomPass';

import { Layer } from './graphics/Layer';

type SceneProps = {
    scene: Scene;
    camera: PerspectiveCamera;
    composer: EffectComposer;
}
function onWindowResize(
    camera: PerspectiveCamera,
    renderer: WebGLRenderer
): void {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function initScene(): SceneProps  {
    const scene = new Scene();
    const renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const camera = new PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1
    );
    camera.position.z = 10;

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

function animate(
    scene: Scene,
    camera: PerspectiveCamera,
    composer: EffectComposer,
    sceneLayers: Array<Layer>,
    step = 0
): void {
    step++;
    sceneLayers.forEach((layer: Layer) => {
        layer.animate(step);
    });
    composer.render(scene);
    requestAnimationFrame(() =>
        animate(scene, camera, composer, sceneLayers, step)
    );
}

async function init() {
    document.body.style.margin = '0';
    const { camera, composer, scene } = initScene();

    const sceneLayers = new Array<Layer>();
    const sphereLayer = new Layer(scene, {x: -0.01, y: 0, z: 0.01});
    await sphereLayer.addFromJson(
        scene,
        '/assets/spheres.json',
        new SphereGeometry(undefined, 6, 6)
    );
    const cubeLayer = new Layer(scene, {x: 0.0, y: 0.01, z: 0.01});
    await cubeLayer.addFromJson(
        scene,
        '/assets/cubes.json',
        new BoxGeometry(5, 5, 5)
    );
    sceneLayers.push(sphereLayer, cubeLayer);

    window.addEventListener(
        'resize',
        () => onWindowResize(camera, composer.renderer),
        false
    );
    animate(scene, camera, composer, sceneLayers, 0);
}

init();
