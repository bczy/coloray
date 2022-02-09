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

  private easeInOutQuad (t: number, b: number, c: number, d: number) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
}
  private animate(): void {
    this.step++;
    this.camera.position.z = Math.min(
      this.easeInOutQuad(this.step, 0, 150, 750),
      15
    );
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
    sphereLayer.addFromJson(
      this.scene,
      '/assets/spheres.json',
      new SphereGeometry(1.75, 4, 4)
    );

    this.sceneLayers.push(sphereLayer);
    
    const extraSphereLayers = new Array<SphericalShapeGroup>();

    extraSphereLayers.push(
      new SphericalShapeGroup(
        this.scene,
        { x: 0.0, y: -0.01, z: 0 },
        new BoxGeometry(4, 4, 4),
        7.5,
        15,
        undefined,
        [
          'rgb(130, 230, 194)',
          'rgb(242, 188, 224)',
          'rgb(104, 143, 244)',
          'rgb(8, 199, 247)',
          'rgb(3, 233, 248)',
        ],
        undefined,
        { x: 0, y: 90, z: 0 }
      ),
    );

    extraSphereLayers.push(
      new SphericalShapeGroup(
        this.scene,
        { x: 0.01, y: 0.0, z: 0 },
        new SphereGeometry(1, 5, 5),
        5,
        12,
        0.875,
        ['rgb(104, 143, 244)']
      )
    );

    extraSphereLayers.push(
      new SphericalShapeGroup(
        this.scene,
        { x: 0, y: 0.0, z: 0.01 },
        new SphereGeometry(1, 6, 6),
        0.025,
        1,
        undefined,
        ['rgb(104, 143, 244)']
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
