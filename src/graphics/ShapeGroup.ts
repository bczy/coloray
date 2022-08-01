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
  private wiredFramedShapes = new Array<WireframeShape>();
  private rotationSpeed: VectorThree;

  public group = new Group();

  constructor({ rotationSpeed, wireframedShapes, geometry }: ShapeGroupData) {
    this.rotationSpeed = rotationSpeed;

    wireframedShapes.forEach((wireframedShapeData: WireframedShapeData) => {
      const wiredFramedShape = new WireframeShape(
        geometry,
        wireframedShapeData
      );
      this.group.add(wiredFramedShape.getMesh());
    });
  }

  public animate(step: number) {
    this.group.rotation.x += this.rotationSpeed.x;
    this.group.rotation.y += this.rotationSpeed.y;
    this.wiredFramedShapes.forEach((wiredFramedShape) =>
      wiredFramedShape.animate(step)
    );
  }
}
