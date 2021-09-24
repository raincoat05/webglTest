import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';

function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({ canvas });

    //カメラの設定
    const fov = 75;//視野角
    const aspect = 2;  // the canvas default
    const near = 0.001;//おそらく描画する奥行きの手前
    const far = 20;//おそらく描画する奥行きの奥
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 8;//カメラの奥行き
    const scene = new THREE.Scene();

    {
        //光源の設定
        const color = 0xFFFFFF;//光源の色
        const intensity = 1;//明るさ
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);//光源の位置(x,y,z)
        scene.add(light);
    }

    //箱の設定
    const boxWidth = 4;//横(x)
    const boxHeight = 4;//縦(y)
    const boxDepth = 4;//奥行き(z)
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });  // 箱の色

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    //回転速度(時間の進み方)の設定
    function render(time) {
        time *= 0.001;  // convert time to seconds

        cube.rotation.x = time;
        cube.rotation.y = time;

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    //ブロックノイズの除去(解像度の向上)
    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
}

main();