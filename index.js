import * as THREE from "three";
import {OrbitControls} from "jsm/controls/OrbitControls.js";

// 기본 화면 설정
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
const fov = 75;
const aspect = w/h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
const scene = new THREE.Scene();

//orbit control 추가 (궤도 조정?)
const controls = new OrbitControls(camera, renderer.domElement);//마우스로 컨트롤 할 수 있게 해줌
controls.enableDamping = true;
controls.dampingFactor = 0.03;


//오브젝트 추가 
const geo = new THREE.IcosahedronGeometry(1.0, 2);
const mat = new THREE.MeshStandardMaterial({
    color:0xffffff,
    flatShading: true,
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

//오브젝트에 선 추가 
const wireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe:true,
})
const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001);//선의 크기 증가
mesh.add(wireMesh); //구체에 선 추가 


//빛 추가 
const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500)
scene.add(hemiLight);

// 움직이는 함수 생성
function animate(t = 0){
    requestAnimationFrame(animate);
    mesh.rotation.y = t * 0.0001;
    renderer.render(scene,camera);
    controls.update();//궤도 조정 업데이트
}

animate();

// renderer.render(scene, camera);