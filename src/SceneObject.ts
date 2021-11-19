import { Mesh, Scene } from 'three';

export type SceneObjectProps = {
    mesh: Mesh;
    rotate: (step: number) => void;
};

export function SceneObject(
    parent: Scene,
    { position = [0, 0, 0], scale = 1, rotationSpeed = 0.05 },
    { geometry, material }
): SceneObjectProps {
    const dummy = {
        mesh: new Mesh(geometry, material),
        rotate: function (step: number) {
            this.mesh.rotation.x += rotationSpeed;
            this.mesh.rotation.y -= rotationSpeed;
            this.mesh.scale.x += Math.cos(step / 125) / 130;
            this.mesh.scale.y += Math.cos(step / 125) / 130;
            this.mesh.scale.z += Math.cos(step / 125) / 130;
        },
    };

    dummy.mesh.position.x = position[0];
    dummy.mesh.position.y = position[1];
    dummy.mesh.position.z = position[2];
    dummy.mesh.scale.x = scale;
    dummy.mesh.scale.y = scale;
    dummy.mesh.scale.z = scale;
    dummy.mesh.userData['type'] = 'cube';
    parent.add(dummy.mesh);
    return dummy;
}
