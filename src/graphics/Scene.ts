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

import { ShapeGroup } from './ShapeGroup';

import { SphericalShapeGroup } from './SphericalShapeGroup';
import { onWindowResize } from './Window';

export class Scene {
    private step = 0;
    private scene = new ThreeScene();
    private renderer = new WebGLRenderer();
    private sceneLayers = new Array<ShapeGroup>();
    private camera = new PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1
    );
    private composer: EffectComposer;

    private animate(): void {
        this.step++;
        this.sceneLayers.forEach((layer: ShapeGroup) => {
            layer.animate(this.step);
        });
        this.composer.render();
        requestAnimationFrame(() => this.animate());
    }

    constructor() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.camera.position.z = 15;

        this.composer = new EffectComposer(this.renderer);
        this.composer.addPass(new RenderPass(this.scene, this.camera));
        this.composer.addPass(new UnrealBloomPass({ x: 256, y: 256 }, 2));
        this.composer.addPass(new FilmPass(0.5, 2.5, 1024, false));
        this.composer.addPass(new GlitchPass(32));

        const sphereGeom = new SphereGeometry(undefined, 6, 6);
        const boxGeom = new BoxGeometry(4, 4, 4);
        const sphereLayer = new ShapeGroup(this.scene, {
            x: -0.01,
            y: 0,
            z: 0.01,
        });
        sphereLayer.addFromJson(this.scene, '/assets/spheres.json', sphereGeom);

        this.sceneLayers.push(sphereLayer);

        const extraSphereLayers = new Array<SphericalShapeGroup>();
        extraSphereLayers.push(
            new SphericalShapeGroup(
                this.scene,
                { x: 0.0, y: -0.01, z: 0 },
                boxGeom,
                7.5,
                18
            )
        );
        
        extraSphereLayers.push(
            new SphericalShapeGroup(
                this.scene,
                { x: -0.01, y: 0.0, z: 0 },
                sphereGeom,
                5,
                undefined,
                [0x643a6d, 0x954a71, 0xbd616f, 0xd8816b, 0xe7a76d, 0xe4ab69, 0xdfb066, 0xdab463, 0xce954f, 0xc07641, 0xaf5837, 0x9b3930].map(i => i / 4)
            )
        );

        extraSphereLayers.push(
            new SphericalShapeGroup(
                this.scene,
                { x: 0, y: 0.0, z: 0.01 },
                sphereGeom,
                1,
                8
            )
        );
        this.sceneLayers.push(...extraSphereLayers);

        document.body.appendChild(this.renderer.domElement);
        window.addEventListener('resize', () =>
            onWindowResize(this.camera, this.renderer)
        );
        this.animate();
    }
}
