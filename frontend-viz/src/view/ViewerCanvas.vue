<template>
  <div class="pageHeight">
    <v-slider
      dark
      color="red"
      trackColor="white"
      max="10.00"
      min="1.00"
      class="slider ma-15"
      label="Radius"
      thumb-label="always"
      v-model="inputValue"
      @change="mouseupEvent(inputValue)"
    ></v-slider>
    <div class="canvas"></div>
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three-OrbitControlsYYK/OrbitControls.js";
import axios from "axios";
import RhinoService from "../rhinoService.js";

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

    /**
     * load rhino
     */

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
      rhinoService: new RhinoService(),
      rhinoMesh: {},
      rhinoThreeMesh: {},
      inputValue: 1,
      isInProcess: false,
      existingMesh: null,
    };
  },
  async created() {
    this.renderer.setSize(window.innerWidth * 0.92, window.innerHeight * 0.92);
    this.directionalLight.position.set(0, 0, 10);
    this.camera.position.y = 5;
    this.camera.position.z = 10;
    this.scene.add(this.camera);
    this.scene.add(this.ambientLight);
    this.scene.add(this.directionalLight);
    // this.scene.add(this.sphere);
    // this.scene.add(this.floor);
    this.control = new OrbitControls(this.camera, this.renderer.domElement);
    this.control.enableDamping = true;
    await this.getRhinoModel(this.inputValue);
  },
  async mounted() {
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
      this.isInProcess = true;
      // let res = await axios.get(`/makeSphere/${radius}`);
      // this.rhinoMesh = await this.rhinoService.decodeRhinoJsonToThreeJson(res);

      let generatorRes = await axios.get(`/getGeneratedResult`);

      let generatorResult = await this.rhinoService.decodeGeneratorResult(
        generatorRes
      );

      let loader = new THREE.BufferGeometryLoader();
      // var geometry = loader.parse(this.rhinoMesh);

      var material = new THREE.MeshStandardMaterial({
        metalness: 0.3,
        roughness: 0.4,
      });

      generatorResult.forEach((r) => {
        let curTHREEobj = new THREE.Mesh(loader.parse(r), material);
        this.scene.add(curTHREEobj);
      });

      // this.rhinoThreeMesh = new THREE.Mesh(geometry, material);
      console.log(radius);
      // if (this.existingMesh != null) {
      //   console.log(this.existingMesh);
      //   let lastMeshIndex = this.scene.children.length - 1;
      //   this.existingMesh = this.scene.children[lastMeshIndex];
      //   this.scene.remove(this.existingMesh);
      // } else {
      //   this.existingMesh = this.rhinoThreeMesh;
      // }

      // this.scene.add(this.rhinoThreeMesh);
      this.isInProcess = false;
    },
    async mouseupEvent(value) {
      console.log(value);
      await this.getRhinoModel(value);
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
.slider {
  position: fixed;
  z-index: 2;
  width: 15%;
}
</style>
