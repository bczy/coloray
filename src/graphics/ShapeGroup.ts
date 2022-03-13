import { Group, Mesh } from 'three';
import { WireframeShape, WireframedShapeData } from './WireframedShape';

export type GroupData = {
  wireframedShapesData: Array<WireframedShapeData>;
  rotation: { x: number; y: number; z: number };
};
export class ShapeGroup {
  private group = new Group();
  private wiredFramedShapes = new Array<WireframeShape>();
  private rotationSpeed: any;

  constructor({ initialRotation = { x: 0, y: 0, z: 0 }, shapeData, geometry }) {
    this.group.rotation.x = initialRotation.x;
    this.group.rotation.y = initialRotation.y;
    this.group.rotation.z = initialRotation.z;

    const { wireframedShapesData, rotation } = shapeData;
    if (rotation) {
      this.rotationSpeed = rotation;
    }
    
    wireframedShapesData.forEach((wireframedShapeData: WireframedShapeData) => {
      const wiredFramedShape = new WireframeShape(
        geometry,
        wireframedShapeData
      );
      this.group.add(wiredFramedShape.getMesh());
      this.wiredFramedShapes.push(wiredFramedShape);
    });
  }

  public getMeshes(): Array<Mesh> {
    return this.wiredFramedShapes.map((wiredFramedShape) =>
      wiredFramedShape.getMesh()
    );
  }

  public animate(step: number) {
    this.group.rotation.x += this.rotationSpeed.x;
    this.group.rotation.y += this.rotationSpeed.y;
    this.wiredFramedShapes.forEach((wiredFramedShape) =>
      wiredFramedShape.animate(step)
    );
  }
}
