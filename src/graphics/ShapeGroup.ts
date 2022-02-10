import { BufferGeometry, Scene, Group } from 'three';
import { WireframeShape, WireframedShapeProps } from './WireframedShape';

export class ShapeGroup {
  private group = new Group();
  private wiredFramedShapes = new Array<WireframeShape>();
  constructor(scene: Scene, private rotationSpeed = { x: 0, y: 0, z: 0 }, initialRotation = { x: 0, y: 0, z: 0 }) {
    this.group.rotation.x = initialRotation.x;
    this.group.rotation.y = initialRotation.y;
    this.group.rotation.z = initialRotation.z;
    scene.add(this.group);
  }

  public async addFromJson(
    scene: Scene,
    jsonPath: string,
    geometry: BufferGeometry
  ): Promise<void> {
    const rawJson = await fetch(jsonPath);
    const { sceneObjectsProperties, rotation } = await rawJson.json();
    if (rotation) {
      this.rotationSpeed = rotation;
    }
    sceneObjectsProperties.forEach(
      (sceneObjectProperties: WireframedShapeProps) => {
        this.initWireFrameShape(sceneObjectProperties, scene, geometry);
      }
    );
  }

  protected initWireFrameShape(
    wireframedShapeProps: WireframedShapeProps,
    scene: Scene,
    geometry: BufferGeometry
  ) {
    const basicMesh = new WireframeShape(scene, geometry, wireframedShapeProps);
    this.group.add(basicMesh.getWireframedMesh());
    this.wiredFramedShapes.push(basicMesh);
  }
  public animate(step: number) {
    this.group.rotation.x += this.rotationSpeed.x;
    this.group.rotation.y += this.rotationSpeed.y;
    this.wiredFramedShapes.forEach((wiredFramedShape) =>
      wiredFramedShape.animate(step)
    );
  }
}
