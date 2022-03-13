import { BufferGeometry, Group, Mesh } from 'three';
import { WireframeShape, WireframedShapeData } from './WireframedShape';

type VectorThree = {
  x: number;
  y: number;
  z: number;
};

export type ShapeGroupData = {
  rotationSpeed: VectorThree;
  wireframedShapes: Array<WireframedShapeData>;
  geometry: BufferGeometry;
};
export class ShapeGroup {
  private group = new Group();
  private wiredFramedShapes = new Array<WireframeShape>();
  private rotationSpeed: VectorThree;

  constructor({ rotationSpeed, wireframedShapes, geometry }: ShapeGroupData) {
    this.rotationSpeed = rotationSpeed;

    wireframedShapes.forEach((wireframedShapeData: WireframedShapeData) => {
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
