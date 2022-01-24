import {
    Scene as ThreeScene,
    PerspectiveCamera,
    WebGLRenderer,
    BoxGeometry,
    SphereGeometry,
} from 'three';

import { EffectComposer } from '../postprocessing/EffectComposer';
import { RenderPass } from '../postprocessing/RenderPass';
import { GlitchPass } from '../postprocessing/GlitchPass';
import { FilmPass } from '../postprocessing/FilmPass';
import { UnrealBloomPass } from '../postprocessing/UnrealBloomPass';

import { Layer } from '../graphics/Layer';

export class Scene {
    private step: 0;
    private scene = new ThreeScene();
    private renderer = new WebGLRenderer();
    private sceneLayers = new Array<Layer>();
    private camera = new PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1
    );
    private composer: EffectComposer;

    private animate(): void {
        this.step++;
        this.sceneLayers.forEach((layer: Layer) => {
            layer.animate(this.step);
        });
        this.composer.render();
        requestAnimationFrame(() =>
            this.animate()
        );
    }

    constructor() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.camera.position.z = 10;
        this.composer = new EffectComposer(this.renderer);
        this.composer.addPass(new RenderPass(this.scene, this.camera));
        this.composer.addPass(new UnrealBloomPass({ x: 256, y: 256 }, 2));
        this.composer.addPass(new FilmPass(0.5, 2.5, 1024, false));
        this.composer.addPass(new GlitchPass(32));

        const sphereLayer = new Layer(this.scene, { x: -0.01, y: 0, z: 0.01 });
        sphereLayer.addFromJson(
            this.scene,
            '/assets/spheres.json',
            new SphereGeometry(undefined, 6, 6)
        );
        const cubeLayer = new Layer(this.scene, { x: 0.0, y: 0.01, z: 0.01 });
        cubeLayer.addFromJson(
            this.scene,
            '/assets/cubes.json',
            new BoxGeometry(5, 5, 5)
        );

        this.sceneLayers.push(sphereLayer, cubeLayer);
        document.body.appendChild(this.renderer.domElement);
        this.animate();
    }
}

