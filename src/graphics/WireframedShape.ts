import { BufferGeometry, Mesh, MeshBasicMaterial, Scene } from 'three';

export type WireframedShapeProps = {
  color?: number | string;
  position?: number[];
  rotation?: { x: number; y: number; z: number };
  rotationSpeed?: number;
  scale?: number;
  initialScale?: number;
};

export class WireframeShape {
  private mesh: Mesh;
  private rotationSpeed: { x: number; y: number; z: number } = {
    x: 0,
    y: 0,
    z: 0,
  };
  private scaleFactor: number;

  constructor(
    private parent: Scene,
    private geometry: BufferGeometry,
    {
      position,
      scale = 0,
      rotation,
      color,
      initialScale = 0,
    }: WireframedShapeProps
  ) {
    const material = new MeshBasicMaterial({ color });
    this.mesh = new Mesh(this.geometry);
    material.wireframe = true;
    this.mesh.material = material;

    this.scaleFactor = scale;
    this.rotationSpeed = rotation || this.rotationSpeed;
    this.mesh.position.x = position[0];
    this.mesh.position.y = position[1];
    this.mesh.position.z = position[2];
    if (initialScale) {
      this.mesh.scale.x = initialScale;
      this.mesh.scale.y = initialScale;
      this.mesh.scale.z = initialScale;
    } else {
      this.mesh.scale.x = 0.375;
      this.mesh.scale.y = 0.375;
      this.mesh.scale.z = 0.375;
    }

    this.parent.add(this.mesh);
  }

  public getWireframedMesh(): Mesh {
    return this.mesh;
  }

  public animate(step: number): void {
    this.mesh.rotation.x += this.rotationSpeed.x;
    this.mesh.rotation.y += this.rotationSpeed.y;
    if (this.scaleFactor !== 0) {
      this.mesh.scale.setX(Math.cos(step * 0.01) * this.scaleFactor * 0.5);
      this.mesh.scale.setY(Math.cos(step * 0.01) * this.scaleFactor * 0.5);
      this.mesh.scale.setZ(Math.cos(step * 0.01) * this.scaleFactor * 0.5);
    }
  }
}
