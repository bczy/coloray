import { BufferGeometry, Mesh, MeshBasicMaterial, Scene } from 'three';

export type WireframedShapeProps = {
    color?: number;
    position?: number[];
    rotation?: { x: number; y: number; z: number };
    scale?: number;
};

export class WireframeShape {
    private mesh : Mesh;
    private rotationSpeed: { x: number; y: number; z: number; } = { x : 0, y: 0 , z: 0};
    private scale: number;

    constructor(
        private parent: Scene,
        private geometry: BufferGeometry,
        { position, scale, rotation, color } : WireframedShapeProps,
        initialScale = 0,
    ) {
        this.rotationSpeed = rotation || this.rotationSpeed;
        this.scale = 1;
        this.mesh = new Mesh(geometry),
        this.mesh.position.x = position[0];
        this.mesh.position.y = position[1];
        this.mesh.position.z = position[2];
        if (initialScale) {
            this.mesh.scale.x = initialScale;
            this.mesh.scale.y = initialScale;
            this.mesh.scale.z = initialScale;    
        } else {
            this.mesh.scale.x = 0.25;
            this.mesh.scale.y= 0.25;
            this.mesh.scale.z = 0.25;
        }
        this.mesh.userData['type'] = this.geometry.type;
        this.createMaterial(color);
        this.parent.add(this.mesh);
    }

    private createMaterial(color: number): void {
        const material = new MeshBasicMaterial({ color });
        material.wireframe = true;
        this.mesh.material = material;
    }

    public getWireframedMesh(): Mesh {
        return this.mesh;
    }

    public animate(step: number): void {
        this.mesh.rotation.x += this.rotationSpeed.x;
        this.mesh.rotation.y += this.rotationSpeed.y;
        if (this.scale !== 0) {
            this.mesh.scale.setX(Math.cos(step * 0.01) * this.scale * 0.5);
            this.mesh.scale.setY(Math.cos(step * 0.01) * this.scale * 0.5);
            this.mesh.scale.setZ(Math.cos(step * 0.01) * this.scale * 0.5);
        }
    }
}
