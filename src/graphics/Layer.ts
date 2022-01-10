import * as THREE from 'three';

export class SceneGroup {
    private group = new THREE.Group();
    constructor(private rotationSpeed = { x : 0, y: 0, z: 0}) {
        this.group.rotation.x = this.rotationSpeed.x;
        this.group.rotation.y = this.rotationSpeed.y;
        this.group.rotation.z = this.rotationSpeed.z;
    }
    
}