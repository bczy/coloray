import * as THREE from 'three';
import { BufferGeometry } from 'three';
import { WireframedShape, WireframedShapeProps } from './WireframedShape';

export class Layer {
    private group = new THREE.Group();
    private wiredFramedShapes  = new Array<WireframedShape>();
    constructor(scene, private rotationSpeed = { x : 0.01, y: 0.01, z: 0.01}) {
        this.group.rotation.x = this.rotationSpeed.x;
        this.group.rotation.y = this.rotationSpeed.y;
        this.group.rotation.z = this.rotationSpeed.z;
        scene.add(this.group);
    }

    public async addFromJson(
        scene,
        jsonPath: string,
        geometry: BufferGeometry
    ): Promise<void> {
        const rawJson = await fetch(jsonPath);
        const { sceneObjectsProperties } = await rawJson.json();
        sceneObjectsProperties.forEach(
            (sceneObjectPoperties: WireframedShapeProps) => {
                const { position, scale, rotation, color } = sceneObjectPoperties;
                const basicMesh = new WireframedShape(scene, geometry, rotation, color, position, scale);
                this.group.add(basicMesh.getWireframedMesh());
                this.wiredFramedShapes.push(basicMesh);
            }
        );
    }
    
    public animate(step: number) {
        this.group.rotation.x += this.rotationSpeed.x;
        this.group.rotation.y += this.rotationSpeed.y;
        this.wiredFramedShapes.forEach(wiredFramedShape => wiredFramedShape.animate())
    }
}