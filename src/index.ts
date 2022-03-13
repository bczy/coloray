import { ColorRay } from "./ColorRay";
import { onWindowResize } from './graphics/Window';

const colorRay = new ColorRay();

document.body.appendChild(colorRay.renderer.domElement);
window.addEventListener('resize', () =>
  onWindowResize(colorRay.camera, colorRay.renderer)
);
document.body.style.margin = '0';