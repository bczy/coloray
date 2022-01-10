import { BufferGeometry, Mesh, MeshBasicMaterial, Scene } from 'three';

export type SceneObjectProps = {
    mesh: Mesh;
    animate: (step: number) => void;
};

export type BasicMeshProps = {
    color?: number;
    position?: number[];
    rotation?: { x: number; y: number; z: number };
    scale?: number;
};

export class BasicMesh {
    private mesh : Mesh;
    constructor(
        private parent: Scene,
        private geometry: BufferGeometry,
        private rotationSpeed = { x: 0.01, y: 0.01, z: 0.01},
        private color = 0x00ff00,
        private position = [0, 0, 0], 
        private scale = 1,
    ) {
        this.mesh = new Mesh(geometry),
        this.mesh.position.x = this.position[0];
        this.mesh.position.y = this.position[1];
        this.mesh.position.z = this.position[2];
        this.mesh.scale.x = this.scale;
        this.mesh.scale.y = this.scale;
        this.mesh.scale.z = this.scale;
        this.mesh.userData['type'] = this.geometry.type;
        this.createMaterial(this.color);
        this.parent.add(this.mesh);
    }

    animate(step: number) {
        this.mesh.rotation.x += this.rotationSpeed.x;
        this.mesh.rotation.y -= this.rotationSpeed.y;
        this.mesh.position.z =
            this.mesh.position.z +
            (Math.sin(step / 10) / 130) * this.rotationSpeed.y * 2;
    }

    createMaterial(color: number) : void {
        const material = new MeshBasicMaterial({ color });
        material.wireframe = true;
        this.mesh.material = material;
    }
}
