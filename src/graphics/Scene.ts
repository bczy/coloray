import { Scene as ThreeScene, PerspectiveCamera, WebGLRenderer } from 'three';

import { EffectComposer } from '../postprocessing/EffectComposer';
import { RenderPass } from '../postprocessing/RenderPass';
import { GlitchPass } from '../postprocessing/GlitchPass';
import { FilmPass } from '../postprocessing/FilmPass';
import { UnrealBloomPass } from '../postprocessing/UnrealBloomPass';

import { ShapeGroup } from './ShapeGroup';

import { onWindowResize } from './Window';
import { shapeGroups } from '../data/shapeGroups';

export class Scene {
  private step = 0;
  private scene = new ThreeScene();
  private renderer = new WebGLRenderer();
  private shapeGroups :Array<ShapeGroup>;
  private camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1
  );
  private composer: EffectComposer;

  private easeInOutQuad(t: number, b: number, c: number, d: number) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
    return (-c / 2) * (--t * (t - 2) - 1) + b;
  }

  private animate(): void {
    this.step++;
    this.camera.position.z = Math.min(
      this.easeInOutQuad(this.step, 0, 150, 750),
      15
    );
    this.shapeGroups.forEach((shapeGroup: ShapeGroup) => {
      shapeGroup.animate(this.step);
    });
    this.composer.render();
    requestAnimationFrame(() => this.animate());
  }

  constructor() {
    document.body.appendChild(this.renderer.domElement);
    window.addEventListener('resize', () =>
      onWindowResize(this.camera, this.renderer)
    );

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.camera.position.z = 11.125;

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.composer.addPass(new UnrealBloomPass({ x: 256, y: 256 }, 2));
    this.composer.addPass(new FilmPass(0.5, 2.5, 1024, false));
    this.composer.addPass(new GlitchPass(32));

    this.shapeGroups = shapeGroups;
    this.shapeGroups.forEach((shapeGroup) =>
      shapeGroup.getMeshes().forEach((mesh) => this.scene.add(mesh))
    );

    this.animate();
  }
}
