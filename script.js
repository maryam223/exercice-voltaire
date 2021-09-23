var vizInit = function() {
    var file = document.getElementById("thefile");
    var audio = document.getElementById("audio");
    var fileLabel = document.querySelector("label.file");

    document.onload = function(e) {
        console.log(e);
        audio.play();
        play();
    }
    file.onchange = function() {
        fileLabel.classList.add('normal');
        audio.classList.add('active');
        var files = this.files;

        audio.src = URL.createObjectURL(files[0]);
        audio.load();
        audio.play();
        play();
    }
}

//FONCTION PLAY
function play() {

    //GESTION DE L'AUDIO

    var context = new AudioContext();
    var src = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();

    src.connect(analyser);
    analyser.connect(context.destination);
    analyser.fftSize = 512;

    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);


    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    camera.position.z = 100;


    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x110929);


    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);



    /*Material*/

    let ballMaterial = new THREE.MeshBasicMaterial({
        color: 0x2aebf5,
        transparent: true,
        opacity: 1,
        wireframe: true,
        linewidth: 20,
        linecap: 'round',
        linejoin: 'round'
    });

    const material = new THREE.MeshBasicMaterial({
        color: 0x4e8bf5,
        transparent: true,
        opacity: 1,
        wireframe: true,
        linewidth: 20,
        linecap: 'round',
        linejoin: 'round'
    });

    const material2 = new THREE.MeshBasicMaterial({
        color: 0x889ABF,
        transparent: true,
        opacity: 1,
        wireframe: true,
        linewidth: 20,
        linecap: 'round',
        linejoin: 'round'
    });

    const material3 = new THREE.MeshBasicMaterial({
        color: 0x1C588C,
        transparent: true,
        opacity: 1,
        wireframe: true,
        linewidth: 20,
        linecap: 'round',
        linejoin: 'round'
    });

    const material4 = new THREE.MeshBasicMaterial({
        color: 0x42f56f,
        transparent: true,
        opacity: 1,
        wireframe: true,
        linewidth: 20,
        linecap: 'round',
        linejoin: 'round'
    });

    const material5 = new THREE.MeshBasicMaterial({
        color: 0x9430db,
        transparent: true,
        opacity: 1,
        wireframe: true,
        linewidth: 20,
        linecap: 'round',
        linejoin: 'round'
    });

    const material6 = new THREE.MeshBasicMaterial({
        color: 0x5eebd3,
        transparent: true,
        opacity: 1,
        wireframe: true,
        linewidth: 20,
        linecap: 'round',
        linejoin: 'round'
    });

    const material7 = new THREE.MeshBasicMaterial({
        color: 0x1c44d6,
        transparent: true,
        opacity: 1,
        wireframe: true,
        linewidth: 20,
        linecap: 'round',
        linejoin: 'round'
    });

    const material8 = new THREE.MeshBasicMaterial({
        color: 0xe3a936,
        transparent: true,
        opacity: 1,
        wireframe: true,
        linewidth: 20,
        linecap: 'round',
        linejoin: 'round'
    });

    var dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(-10, 10, 10);
    scene.add(dirLight);

    document.getElementById('out').appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);


    //------------------------------------------------------------//


    render();

    function render() {

        /*Variables*/
        var distancePrevious = 0;
        var distance = 0;
        var ratio = 0;
        var count = 0

        /*Creation cubes*/
        let cube1 = new THREE.Mesh(createBoxWithRoundedEdges(5, 5, 5, 0.8, 10), material);
        let cube2 = new THREE.Mesh(createBoxWithRoundedEdges(5, 5, 5, 0.8, 20), material2);
        let cube3 = new THREE.Mesh(createBoxWithRoundedEdges(5, 5, 5, 0.8, 20), material3);
        let cube4 = new THREE.Mesh(createBoxWithRoundedEdges(5, 5, 5, 0.8, 20), material4);
        let cube5 = new THREE.Mesh(createBoxWithRoundedEdges(5, 5, 5, 0.8, 20), material5);
        let cube6 = new THREE.Mesh(createBoxWithRoundedEdges(5, 5, 5, 0.8, 20), material6);
        let cube7 = new THREE.Mesh(createBoxWithRoundedEdges(5, 5, 5, 0.8, 20), material7);
        let cube8 = new THREE.Mesh(createBoxWithRoundedEdges(5, 5, 5, 0.8, 20), material8);

        cube1.scale.setScalar(1.25);
        cube2.scale.setScalar(1.25);
        cube3.scale.setScalar(1.25);
        cube4.scale.setScalar(1.25);
        cube5.scale.setScalar(1.25);
        cube6.scale.setScalar(1.25);
        cube7.scale.setScalar(1.25);
        cube8.scale.setScalar(1.25);


        console.log("cube", cube1);
        scene.add(cube1);
        scene.add(cube2);
        scene.add(cube3);
        scene.add(cube4);
        scene.add(cube5);
        scene.add(cube6);
        scene.add(cube7);
        scene.add(cube8);

        cube1.position.x = -100;
        cube1.position.y = 50;

        cube2.position.x = -70;
        cube2.position.y = -50;

        cube3.position.x = -40;
        cube3.position.y = 50;

        cube4.position.x = -10;
        cube4.position.y = 50;

        cube5.position.x = 20;
        cube5.position.y = 50;

        cube6.position.x = 50;
        cube6.position.y = 50;

        cube7.position.x = 80;
        cube7.position.y = 50;

        cube8.position.x = 110;
        cube8.position.y = 50;



        function updateGeometry(mesh, geometry) {
            mesh.geometry.dispose();
            mesh.geometry = geometry;
        }


        function createBoxWithRoundedEdges(width, height, depth, radius0, smoothness) {
            let shape = new THREE.Shape();
            let eps = 0.00001;
            let radius = radius0 - eps;
            shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true);
            shape.absarc(eps, height - radius * 2, eps, Math.PI, Math.PI / 2, true);
            shape.absarc(width - radius * 2, height - radius * 2, eps, Math.PI / 2, 0, true);
            shape.absarc(width - radius * 2, eps, eps, 0, -Math.PI / 2, true);

            let geometry = new THREE.ExtrudeBufferGeometry(shape, {
                amount: depth - radius0 * 2,
                bevelEnabled: true,
                bevelSegments: smoothness * 2,
                steps: 1,
                bevelSize: radius,
                bevelThickness: radius0,
                curveSegments: smoothness
            });

            geometry.center();

            return geometry;
        }

        function createGeometry() {
            analyser.getByteFrequencyData(dataArray);
            var lowerHalfArray = dataArray.slice(0, (dataArray.length / 2) - 1);
            var upperHalfArray = dataArray.slice((dataArray.length / 2) - 1, dataArray.length - 1);

            var lowerMax = max(lowerHalfArray) / 2;
            var upperAvg = avg(upperHalfArray) / 2;


            var lowerMaxFr = lowerMax / lowerHalfArray.length;
            var upperAvgFr = upperAvg / upperHalfArray.length;

            ratio = Math.round(modulate(Math.pow(lowerMaxFr, 0.2), 0, 1, 0, 8) + 30);

            distance = Math.round((modulate(Math.pow(lowerMaxFr, 0.8), 0, 1, 0, 8)));

            if (ratio % 2 == 0) {
                ratio += 2;
            } else {
                ratio -= 2;
            }

            if (distance % 2 == 0) {
                distance += 2;
            } else {
                distance -= 2;
            }

            return new THREE.IcosahedronGeometry(ratio, distance);
        }


        function createGeometry3() {
            analyser.getByteFrequencyData(dataArray);
            var lowerHalfArray = dataArray.slice(0, (dataArray.length / 2) - 1);
            var upperHalfArray = dataArray.slice((dataArray.length / 2) - 1, dataArray.length - 1);

            var lowerMax = max(lowerHalfArray) / 2;
            var upperAvg = avg(upperHalfArray) / 2;


            var lowerMaxFr = lowerMax / lowerHalfArray.length;
            var upperAvgFr = upperAvg / upperHalfArray.length;

            ratio = Math.round(modulate(Math.pow(lowerMaxFr, 0.2), 0, 1, 0, 8) + 10);

            distance = Math.round(modulate(upperAvgFr, 0, 1, 0, 4));

            if (ratio % 2 == 0) {
                ratio += 2;
            } else {
                ratio -= 2;
            }

            if (distance % 2 == 0) {
                distance += 2;
            } else {
                distance -= 2;
            }

            return new THREE.TorusGeometry(distance + 80, 1, ratio, 60);
        }

        const ringMeterial = new THREE.MeshStandardMaterial({
            color: 0xF2F2F2,
            shading: THREE.FlatShading,
            transparent: true,
            opacity: 0.7,
            wireframe: true,
        });

        const ring = new THREE.Mesh(createGeometry3(), ringMeterial);
        ring.position.set(0, -20, -30);
        ring.position.y = -20;
        ring.rotateX(80);
        ring.castShadow = true;
        ring.receiveShadow = true;
        scene.add(ring);

        var mesh = new THREE.Mesh(createGeometry(), ballMaterial);
        scene.add(mesh);

        mesh.position.y = -15;

        function setupKeyControls() {
            var count = 0;
            var color = Math.random() * 0x777777 + 0x777777;
            document.onkeydown = function(e) {
                switch (e.keyCode) {
                    case 81:
                        while (count <= 1) {
                            cube1.material.color.set(color);
                            cube1.rotateX(20);
                            cube1.position.x += 3;
                            cube1.position.y += 1;
                            count++;
                        }
                        break;
                    case 83:
                        while (count <= 1) {
                            cube2.material.color.set(color);
                            cube2.rotateX(20);
                            cube2.position.x += 3;
                            cube2.position.y += 1;
                            count++;
                        }
                        break;
                    case 39:
                        cube.rotation.x -= 0.1;
                        break;
                    case 40:
                        cube.rotation.z += 0.1;
                        break;
                }
            };
            document.onkeyup = function(e) {

                var color = Math.random() * 0x777777 + 0x777777;
                switch (e.keyCode) {
                    case 81:
                        while (count <= 1) {
                            cube.rotateX(60);
                            cube.material.color.set(color);
                            cube.position.x -= 2;
                            cube.position.y -= 1;
                            count++;
                        }


                        break;
                    case 83:
                        cube.rotation.z -= 0.1;
                        break;
                    case 39:
                        cube.rotation.x -= 0.1;
                        break;
                    case 40:
                        cube.rotation.z += 0.1;
                        break;
                }
            };
        }

        var animate = function() {
            if (distancePrevious != distance) {
                updateGeometry(mesh, createGeometry())
                updateGeometry(ring, createGeometry3())
                distancePrevious = distance;
            }
            updateGeometry(mesh, createGeometry())
            updateGeometry(ring, createGeometry3())
            setupKeyControls();
            mesh.rotation.y += 0.005;

            cube1.rotation.y += 0.005;
            cube1.rotation.x += 0.005;

            cube2.rotation.y += 0.005;
            cube2.rotation.x += 0.005;

            cube3.rotation.y += 0.005;
            cube3.rotation.x += 0.005;

            cube3.rotation.y += 0.005;
            cube3.rotation.x += 0.005;

            cube4.rotation.y += 0.005;
            cube4.rotation.x += 0.005;

            cube5.rotation.y += 0.005;
            cube5.rotation.x += 0.005;

            cube6.rotation.y += 0.005;
            cube6.rotation.x += 0.005;

            cube7.rotation.y += 0.005;
            cube7.rotation.x += 0.005;

            cube8.rotation.y += 0.005;
            cube8.rotation.x += 0.005;

            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        animate();

    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    audio.play();

}

//WINDOW_RESIZE
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.onload = vizInit();

//FONCTIONS CALCULS
function max(arr) {
    return arr.reduce(function(a, b) { return Math.max(a, b); })
}

function modulate(val, minVal, maxVal, outMin, outMax) {
    var fr = fractionate(val, minVal, maxVal);
    var delta = outMax - outMin;
    return outMin + (fr * delta);
}

function avg(arr) {
    var total = arr.reduce(function(sum, b) { return sum + b; });
    return (total / arr.length);
}


function fractionate(val, minVal, maxVal) {
    return (val - minVal) / (maxVal - minVal);
}