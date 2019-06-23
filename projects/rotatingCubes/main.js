$(function() {

    //globale variabler
    var scene, camera, renderer;
    var controls;
    var stats;
    var spotLight, redCube, blueCube, greenCube;
    var SCREEN_WIDTH, SCREEN_HEIGHT;
    var counter = 0;


    function init() {
        //Lager en tom scene og renderer
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 500);
        renderer = new THREE.WebGLRenderer({
            antialias: true
        });

        renderer.setClearColor(0xdddddd);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMapSoft = true;



        /*Kamera*/
        camera.position.x = 25;
        camera.position.y = 20;
        camera.position.z = 15;
        camera.lookAt(scene.position);

        /*Lys*/
        var ambient = new THREE.AmbientLight(0x404040);
        scene.add(ambient);

        spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(10, 10, 15);
        spotLight.castShadow = true;
        spotLight.shadow.camera.near = 8;
        spotLight.shadow.camera.far = 30;
        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;
        spotLight.name = 'Spot Light';
        scene.add(spotLight);

        /*Grunnflate*/
        var Ground_geometry = new THREE.BoxGeometry(20, 0.1, 20);
        var Ground_material = new THREE.MeshPhongMaterial({
            color: 0xa0adaf,
            shininess: 50,
            specular: 0xffffff,
            shading: THREE.SmoothShading
        });

        var ground = new THREE.Mesh(Ground_geometry, Ground_material);
        ground.scale.multiplyScalar(3);
        ground.position.y -= 0.5;
        ground.castShadow = false;
        ground.receiveShadow = true;
        scene.add(ground);

        /*Boxes*/
        var redBox_material = new THREE.MeshPhongMaterial({
            color: 0xff0000,
            shininess: 120,
            specular: 0x222222,
            shading: THREE.SmoothShading,
        });

        var greenBox_material = new THREE.MeshPhongMaterial({
            color: 0x00ff00,
            shininess: 50,
            specular: 0x222222,
            shading: THREE.SmoothShading,
        });

        var blueBox_material = new THREE.MeshPhongMaterial({
            color: 0x0000ff,
            shininess: 250,
            specular: 0x222222,
            shading: THREE.SmoothShading,
        });


        var Box_geometry = new THREE.BoxGeometry(3, 3, 3);


        redCube = new THREE.Mesh(Box_geometry, redBox_material);
        redCube.position.set(0, 2.6, 0);
        redCube.castShadow = true;
        redCube.receiveShadow = true;
        scene.add(redCube);

        greenCube = new THREE.Mesh(Box_geometry, greenBox_material);
        greenCube.position.set(5, 2.6, -5);
        greenCube.castShadow = true;
        greenCube.receiveShadow = true;
        scene.add(greenCube);

        blueCube = new THREE.Mesh(Box_geometry, blueBox_material);
        blueCube.position.set(-5, 2.6, 5);
        blueCube.castShadow = true;
        blueCube.receiveShadow = true;
        scene.add(blueCube);

        $("#webGL-container").append(renderer.domElement);

    }

    function render() {}

    function animate() {
        requestAnimationFrame(animate);
        render();

        redCube.rotation.x += 0.01;
        redCube.rotation.y += 0.02;
        greenCube.rotation.x += 0.03;
        greenCube.rotation.y += 0.04;
        blueCube.rotation.x += 0.05;
        blueCube.rotation.y += 0.06;

        counter += 0.005;
        camera.position.x = Math.sin(counter) * 30;
        camera.position.z = Math.cos(counter) * 30;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    init();
    animate();

    $(window).resize(function() {
        SCREEN_WIDTH = window.innerWidth;
        SCREEN_HEIGHT = window.innerHeight;
        camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
        camera.updateProjectionMatrix();
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    });

});
