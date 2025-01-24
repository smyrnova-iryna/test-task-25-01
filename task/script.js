import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
function getPoint() {
    var u = Math.random();
    var v = Math.random();
    var theta = u * 2.0 * Math.PI;
    var phi = Math.acos(2.0 * v - 1.0);
    var r = Math.cbrt(Math.random());
    var sinTheta = Math.sin(theta);
    var cosTheta = Math.cos(theta);
    var sinPhi = Math.sin(phi);
    var cosPhi = Math.cos(phi);
    var x = r * sinPhi * cosTheta;
    var y = r * sinPhi * sinTheta;
    var z = r * cosPhi;
    return {x: x, y: y, z: z};
}
class Sketch {
  constructor(options) {
    this.scene = new THREE.Scene();

    this.container = options.dom;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1))
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0x000000, 1); 

    this.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      0.01,
      1000
    );

   
    this.camera.position.set(0, 0, 2);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.time = 0;

    this.addObjects();
    this.resize();
    this.render();
    this.setupResize();

  }


  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  addObjects() {
    this.material = new THREE.PointsMaterial({
         size: 0.01, sizeAttenuation: true, alphaTest: 0.5, transparent: true 
    })
      
    

    this.geometry = new THREE.BufferGeometry()
      let vertices = []
      
      for ( let i = 0; i < 10000; i ++ ) {

					let p = getPoint();

					vertices.push( 4*p.x, 4*p.y, 4*p.z );

				}

				this.geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );


    this.plane = new THREE.Points(this.geometry, this.material);
    this.scene.add(this.plane);
  }

  render() {

    this.time += 0.05;
    
  
    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
  }
}

new Sketch({
  dom: document.getElementById("container")
});



