import { BufferGeometry } from 'three';
import { ShapeGroup } from './ShapeGroup';
import { WireframedShapeProps } from './WireframedShape';

export class SphericalShapeGroup extends ShapeGroup {
  constructor(
    scene,
    rotationSpeed = { x: 0, y: 0.1, z: 0 },
    geometry: BufferGeometry,
    radius: number,
    steps = 27,
    initialScale = 0.5,
    colorPatterns = undefined
  ) {
    super(scene, rotationSpeed);
    const shapProps = new Array<WireframedShapeProps>();
    for (let i = 0; i < steps; i++) {
      const ipi2 = i * Math.PI * 2;
      const position = [];
      position[0] = radius * Math.cos(ipi2 / steps);
      position[1] = radius * Math.sin(ipi2 / steps);
      position[2] = 0;
      const m = (i % 4 - 2) * 0.01;
      const rotation = {x: m, y: m, z: 0};
      let wireframedShapeProps: WireframedShapeProps = {
        position,
        initialScale,
        rotation
      };
      wireframedShapeProps.color = colorPatterns
        ? colorPatterns[i % colorPatterns.length]
        : 0xccc000;
      shapProps.push(wireframedShapeProps);
    }
    shapProps.forEach((sceneObjectProperties) => {
      this.initWireFrameShape(sceneObjectProperties, scene, geometry);
    });
  }
}
