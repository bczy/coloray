import { PerspectiveCamera, WebGLRenderer } from 'three';

export function onWindowResize(
  camera: PerspectiveCamera,
  renderer: WebGLRenderer
): void {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
