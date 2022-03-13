import { ShapeGroup } from './ShapeGroup';
import { WireframedShapeData } from './WireframedShape';

export class SphericalShapeGroup extends ShapeGroup {
  constructor({
    radius,
    shapeData,
    geometry,
    steps = 27,
    initialScale = 0.5,
    colorPatterns = undefined,
    z = 0,
    initialRotation = { x: 0, y: 0, z: 0 },
  }) {
    super({ geometry, shapeData, initialRotation });

    const shapProps = new Array<WireframedShapeData>();
    for (let i = 0; i < steps; i++) {
      const position = [];
      const ipi2 = i * Math.PI * 2;
      position[0] = radius * Math.cos(ipi2 / steps);
      position[1] = radius * Math.sin(ipi2 / steps);
      position[2] = z;

      let wireframedShapeProps: WireframedShapeData = {
        position,
        initialScale
      };
      wireframedShapeProps.color = colorPatterns
        ? colorPatterns[i % colorPatterns.length]
        : 0xccc000;

      shapProps.push(wireframedShapeProps);
    }
  }
}
