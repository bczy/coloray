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

  private easeLinear (t: number, b: number, c: number, d: number) {
    return c * t / (d +b );
  }

  private animate(): void {
    this.step++;
    this.camera.position.z = Math.min(this.easeLinear(this.step, 0, 10, 1000), 15);
    this.sceneLayers.forEach((layer: ShapeGroup) => {
      layer.animate(this.step);
    });
    this.composer.render();
    requestAnimationFrame(() => this.animate());
  }

  constructor() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.camera.position.z = 11.125;

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.composer.addPass(new UnrealBloomPass({ x: 256, y: 256 }, 2));
    this.composer.addPass(new FilmPass(0.5, 2.5, 1024, false));
    this.composer.addPass(new GlitchPass(32));

    const sphereLayer = new ShapeGroup(this.scene, {
      x: -0.01,
      y: 0,
      z: 0.01,
    });
    sphereLayer.addFromJson(this.scene, '/assets/spheres.json', new SphereGeometry(1.75, 4, 4));
    
    this.sceneLayers.push(sphereLayer);
    
    const extraSphereLayers = new Array<SphericalShapeGroup>();
    extraSphereLayers.push(
      new SphericalShapeGroup(
        this.scene,
        { x: 0.0, y: -0.01, z: 0 },
        new BoxGeometry(4, 4, 4),
        7.5,
        16,undefined,
        [
          0x00fF00,
          0x00bb00,
          0x006600,
          0x002200,
        ]
        )
        );
        
    extraSphereLayers.push(
      new SphericalShapeGroup(
        this.scene,
        { x: -0.01, y: 0.0, z: 0 },
        new SphereGeometry(1, 6, 6),
        5,
        16,
        0.875,
        [
          0x004433,
        ].map((i) => i / 4)
      )
    );

    extraSphereLayers.push(
      new SphericalShapeGroup(
        this.scene,
        { x: 0, y: 0.0, z: 0.01 },
        new SphereGeometry(1, 6, 6),
        0.025,
        2
      )
    );
    this.sceneLayers.push(...extraSphereLayers, sphereLayer);

    document.body.appendChild(this.renderer.domElement);
    window.addEventListener('resize', () =>
      onWindowResize(this.camera, this.renderer)
    );
    this.animate();
  }
}
