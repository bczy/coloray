import { BufferGeometry, Scene } from 'three';
import { ShapeGroup } from './ShapeGroup';
import { WireframedShapeProps } from './WireframedShape';

export class SphericalShapeGroup extends ShapeGroup {
  constructor(
    scene: Scene,
    rotationSpeed = { x: 0, y: 0.1, z: 0 },
    geometry: BufferGeometry,
    radius: number,
    steps = 27,
    initialScale = 0.5,
    colorPatterns = undefined,
    z = 0,
    initialRotation = { x: 0, y: 0, z: 0 },
  ) {
    super(scene, rotationSpeed, initialRotation);
    const shapProps = new Array<WireframedShapeProps>();
    for (let i = 0; i < steps; i++) {
      const ipi2 = i * Math.PI * 2;
      const position = [];
      position[0] = radius * Math.cos(ipi2 / steps);
      position[1] = radius * Math.sin(ipi2 / steps);
      position[2] = z;
      const m = (i % 4 - 2) * 0.01;
      const rotation = {x: m, y: m, z: 0};
      let wireframedShapeProps: WireframedShapeProps = {
        position,
        initialScale,
        rotation,
      };
      wireframedShapeProps.color = colorPatterns
        ? colorPatterns[i % colorPatterns.length]
        : 0xccc000;
        if (colorPatterns)
        console.log(colorPatterns[i % colorPatterns.length]);
      shapProps.push(wireframedShapeProps);
    }
    shapProps.forEach((sceneObjectProperties) => {
      this.initWireFrameShape(sceneObjectProperties, scene, geometry);
    });
  }
}
