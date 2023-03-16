# **Three.js tutorial**

-Creating the scene
To actually be able to display anything with three.js, we need three things: scene, camera and renderer, so that we can render the scene with camera.

```ruby
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 800 / 500, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(800, 500);
```
