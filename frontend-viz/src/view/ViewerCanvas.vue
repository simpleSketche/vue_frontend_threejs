<template>
  <div class="pageHeight"><div class="canvas"></div></div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three-OrbitControlsYYK/OrbitControls.js";
import axios from "axios";
export default {
  name: "ViewerCanvas",
  data: function () {
    /**
     * scene
     */
    const scene = new THREE.Scene();

    /**
     * camera
     */
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    /**
     * light
     */
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
    directionalLight.castShadow = true;
    directionalLight.position.set(5, 5, 5);

    /**
     * Test sphere
     */
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1, 36, 36),
      new THREE.MeshStandardMaterial({
        metalness: 0.3,
        roughness: 0.4,
      })
    );
    sphere.position.y = 2;

    /**
     * Floor
     */
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.MeshStandardMaterial({
        color: "#ed7a72",
      })
    );
    floor.receiveShadow = false;
    floor.rotation.x = -Math.PI * 0.5;

    /**
     * renderer
     */
    const renderer = new THREE.WebGLRenderer();

    return {
      scene: scene,
      camera: camera,
      ambientLight: ambientLight,
      directionalLight: directionalLight,
      sphere: sphere,
      floor: floor,
      renderer: renderer,
      canvas: {},
      parent: {},
      control: {},
      oldElapsedTime: 0,
      clock: new THREE.Clock(),
    };
  },
  created() {
    this.renderer.setSize(window.innerWidth * 0.92, window.innerHeight * 0.92);
    this.directionalLight.position.set(0, 0, 10);
    this.camera.position.y = 5;
    this.camera.position.z = 10;
    this.scene.add(this.camera);
    this.scene.add(this.ambientLight);
    this.scene.add(this.directionalLight);
    this.scene.add(this.sphere);
    this.scene.add(this.floor);
    this.control = new OrbitControls(this.camera, this.renderer.domElement);
    this.control.enableDamping = true;
    this.getRhinoModel(15);
  },
  mounted() {
    // this.section = this.$el.querySelector("section.widget");]
    this.canvas = this.$el.querySelector("div.canvas");
    this.parent = this.$el.querySelector("div.pageHeight");
    this.canvas.appendChild(this.renderer.domElement);
    this.animate();
  },
  methods: {
    animate: function () {
      // update controls
      this.control.update();

      // update renderer
      this.renderer.render(this.scene, this.camera);

      // call back, call animate itself again the next frame
      requestAnimationFrame(this.animate);
    },
    async getRhinoModel(radius) {
      console.log(radius);
      await axios.get("/makeSphere/5").then((r) => console.log(r));
    },
  },
};
</script>

<style>
.pageHeight {
  height: 92vh;
}
.canvas {
  background-color: black;
  color: white;
  height: 100%;
}
</style>
