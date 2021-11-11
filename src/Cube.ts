import { Mesh, Scene } from 'three';

export type Dummy = {
    mesh: Mesh;
    rotate: () => void;
};

export function Cube(
    parent: Scene,
    { position = [0, 0, 0], scale = 1, rotationSpeed = 0.05 },
    { geometry, material }
) : Dummy {
    const dummy = {
        mesh: new Mesh(geometry, material),
        rotate: function () {
            this.mesh.rotation.x += rotationSpeed;
            this.mesh.rotation.y -= rotationSpeed;
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
