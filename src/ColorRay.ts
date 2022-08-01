import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';

import { EffectComposer } from './postprocessing/EffectComposer';
import { RenderPass } from './postprocessing/RenderPass';
import { GlitchPass } from './postprocessing/GlitchPass';
import { FilmPass } from './postprocessing/FilmPass';
import { UnrealBloomPass } from './postprocessing/UnrealBloomPass';

import { ShapeGroup } from './graphics/ShapeGroup';

import { cube } from './data/cube';

export class ColorRay {
  private step = 0;
  private scene = new Scene();
  private shapeGroups = new Array<ShapeGroup>();
  
  public renderer = new WebGLRenderer();
  private composer: EffectComposer;
  
  public camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1);

  constructor() {
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.composer.addPass(new UnrealBloomPass({ x: 256, y: 256 }, 2));
    this.composer.addPass(new FilmPass(0.5, 2.5, 1024, false));
    this.composer.addPass(new GlitchPass(32));
    
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    
    this.camera.position.z = 11.125;
    const shapeGroup = new ShapeGroup(cube);
    this.scene.add(shapeGroup.group);
    
    this.animate();
  }

  private easeInOutQuad(t: number, b: number, c: number, d: number) {
    if ((t /= d / 2) < 1){ 
      return (c / 2) * t * t + b;
    }
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
}
