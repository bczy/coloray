import { BufferGeometry, Mesh, MeshBasicMaterial } from 'three';

export type WireframedShapeData = {
  color?: number | string;
  position?: number[];
  rotationSpeed?: number;
  scale?: number;
  initialScale?: number;
};

export class WireframeShape {
  private mesh: Mesh;
  private scaleFactor: number;
  private rotationSpeed: { x: number; y: number; z: number } = {
    x: 0,
    y: 0,
    z: 0,
  };
  constructor(
    private geometry: BufferGeometry,
    {
      position,
      scale = 0,
      color,
      initialScale = 0,
    }: WireframedShapeData
  ) {
    const material = new MeshBasicMaterial({ color });
    this.mesh = new Mesh(this.geometry);
    material.wireframe = true;
    this.mesh.material = material;

    this.scaleFactor = scale;
    this.rotationSpeed = this.rotationSpeed;
    this.mesh.position.x = position[0];
    this.mesh.position.y = position[1];
    this.mesh.position.z = position[2];

    if (initialScale) {
      this.mesh.scale.x = initialScale | 0.375;
      this.mesh.scale.y = initialScale | 0.375;
      this.mesh.scale.z = initialScale | 0.375;
    }
  }

  public getMesh(): Mesh {
    return this.mesh;
  }

  public getGeometry(): BufferGeometry {
    return this.geometry;
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
