import { BufferGeometry, Mesh, MeshBasicMaterial, Scene } from 'three';

export type SceneObjectProps = {
    mesh: Mesh;
    animate: (step: number) => void;
};

export class BasicMesh {
    private mesh : Mesh;
    constructor(
        private parent: Scene,
        private geometry: BufferGeometry,
        private rotationSpeed = { x : 0, y: 0, z: 0},
        { position = [0, 0, 0], scale = 1 },
    ) {
        this.mesh = new Mesh(geometry),

        this.mesh.position.x = position[0];
        this.mesh.position.y = position[1];
        this.mesh.position.z = position[2];
        this.mesh.scale.x = scale;
        this.mesh.scale.y = scale;
        this.mesh.scale.z = scale;
        this.mesh.userData['type'] = geometry.type;
        parent.add(this.mesh);
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
