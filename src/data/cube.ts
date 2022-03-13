import { CylinderBufferGeometry } from 'three';
import { ShapeGroupData } from '../graphics/ShapeGroup';

export const cube: ShapeGroupData = {
  geometry: new CylinderBufferGeometry(1, 1, 1, 32),
  rotationSpeed: { x: 0, y: 0.01, z: 0 },
  wireframedShapes: [
    {
      color: 'rgb(0, 60, 125)',
      position: [0, 2, 0],
      rotationSpeed: 0.05,
    },
    {
      color: 'rgb(0, 60, 125)',
      position: [0, -2, 0],
      rotationSpeed: 0.05,
    },
    {
      color: 'rgb(0, 60, 125)',
      position: [2, 0, 0],
      rotationSpeed: -0.05,
    },
    {
      color: 'rgb(0, 60, 125)',
      position: [2, 2, 0],
      rotationSpeed: -0.05,
    },
    {
      color: 'rgb(0, 60, 125)',
      position: [2, -2, 0],
      rotationSpeed: -0.05,
    },
    {
      color: 'rgb(0, 60, 125)',
      position: [-2, -2, 0],
      rotationSpeed: -0.05,
    },
    {
      color: 'rgb(0, 60, 125)',
      position: [-2, 2, 0],
      rotationSpeed: -0.05,
    },

    {
      color: 'rgb(0, 60, 125)',
      position: [0, 0, 2],
      rotationSpeed: -0.05,
    },
    {
      color: 'rgb(0, 60, 125)',
      position: [0, -2, 2],
      rotationSpeed: 0.05,
    },
    {
      color: 'rgb(0, 60, 125)',
      position: [0, 2, 2],
      rotationSpeed: 0.05,
    },
    {
      color: 'rgb(0, 60, 125)',
      position: [2, 0, 2],
      rotationSpeed: -0.05,
    },
    {
      color: 'rgb(0, 60, 125)',
      position: [2, 2, 2],
      rotationSpeed: 0.05,
    },
    {
      color: 'rgb(0, 60, 125)',
      position: [2, -2, 2],
      rotationSpeed: 0.05,
    },
    {
      color: 'rgb(0, 60, 125)',
      position: [-2, -2, 2],
      rotationSpeed: 0.05,
    },
    {
      color: 'rgb(0, 60, 125)',
      position: [-2, 0, 2],
      rotationSpeed: 0.05,
    },
    {
      color: 'rgb(0, 60, 125)',
      position: [-2, 2, 2],
      rotationSpeed: 0.05,
    },

    {
      color: 'rgb(0, 60, 125)',
      position: [0, 0, -2],
      rotationSpeed: -0.05,
    },
    {
      color: 'rgb(0, 60, 125)',
      position: [0, -2, -2],
      rotationSpeed: 0.05,
    },
    {
      color: 'rgb(0, 60, 125)',
      position: [0, 2, -2],
      rotationSpeed: 0.05,
    },
    {
      color: 'rgb(0, 60, 125)',
      position: [2, 0, -2],
      rotationSpeed: -0.05,
    },
    {
      color: 'rgb(0, 60, 125)',
      position: [2, 2, -2],
      rotationSpeed: 0.05,
    },
    {
      color: 'rgb(0, 60, 125)',
      position: [2, -2, -2],
      rotationSpeed: 0.05,
    },
    {
      color: 'rgb(0, 60, 125)',
      position: [-2, -2, -2],
      rotationSpeed: 0.05,
    },
    {
      color: 'rgb(0, 60, 125)',
      position: [-2, 0, -2],
      rotationSpeed: 0.05,
    },
    {
      color: 'rgb(0, 60, 125)',
      position: [-2, 2, -2],
      rotationSpeed: 0.05,
    },
  ],
};
