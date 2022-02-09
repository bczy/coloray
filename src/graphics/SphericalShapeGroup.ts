import { BufferGeometry } from 'three';
import { ShapeGroup } from './ShapeGroup';
import { WireframedShapeProps } from './WireframedShape';

export class SphericalShapeGroup extends ShapeGroup {
    constructor(
        scene,
        rotationSpeed = { x: 0, y: 0.1, z: 0 },
        geometry: BufferGeometry,
        radius: number,
        steps = 27,
        colorPatterns = undefined
    ) {
        super(scene, rotationSpeed);
        const shapProps = new Array<WireframedShapeProps>();
        for (let i = 0; i < steps; i++) {
            let wireframedShapeProps: WireframedShapeProps = {};
            const ipi2 = i * Math.PI * 2;
            wireframedShapeProps.position = [];
            wireframedShapeProps.position[0] = radius * Math.cos(ipi2 / steps);
            wireframedShapeProps.position[1] = radius * Math.sin(ipi2 / steps);
            wireframedShapeProps.position[2] = 0;
            wireframedShapeProps.color = colorPatterns
                ? colorPatterns[i%colorPatterns.length]
                : 0xfff000;
            shapProps.push(wireframedShapeProps);
        }
        shapProps.forEach((sceneObjectProperties) => {
            this.initWireFrameShape(sceneObjectProperties, scene, geometry);
        });
    }
}
