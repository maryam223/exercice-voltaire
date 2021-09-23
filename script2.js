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

    var circle = new THREE.Object3D();
    var skelet = new THREE.Object3D();
    var particle = new THREE.Object3D();
    var particleSpe = new THREE.Object3D();

    scene.add(circle);
    scene.add(skelet);
    scene.add(particle);
    scene.add(particleSpe);

    camera.position.z = 400;


    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false;
    renderer.setClearColor(0x000000, 0.0);
    document.getElementById('out').appendChild(renderer.domElement);
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

    var material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        shading: THREE.FlatShading
    });

    var materialParticuleSpe1 = new THREE.MeshPhongMaterial({
        color: 0x7181ff,
        shading: THREE.FlatShading
    });

    var materialParticuleSpe2 = new THREE.MeshPhongMaterial({
        color: 0xf4e274,
        shading: THREE.FlatShading
    });

    var materialParticuleSpe3 = new THREE.MeshPhongMaterial({
        color: 0x38A3A5,
        shading: THREE.FlatShading
    });

    var materialParticuleSpe4 = new THREE.MeshPhongMaterial({
        color: 0x68ea06,
        shading: THREE.FlatShading
    });

    var materialParticuleSpe5 = new THREE.MeshPhongMaterial({
        color: 0xa8219c,
        shading: THREE.FlatShading
    });

    var materialParticuleSpe6 = new THREE.MeshPhongMaterial({
        color: 0xeb7e5e,
        shading: THREE.FlatShading
    });

    var materialParticuleSpe7 = new THREE.MeshPhongMaterial({
        color: 0xfb1cd3,
        shading: THREE.FlatShading
    });

    var materialParticuleSpe8 = new THREE.MeshPhongMaterial({
        color: 0xf4bf6d,
        shading: THREE.FlatShading
    });

    var mat = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        shading: THREE.FlatShading
    });

    var mat2 = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        wireframe: true,
        side: THREE.DoubleSide

    });


    var ambientLight = new THREE.AmbientLight(0x999999);
    scene.add(ambientLight);

    var geometry = new THREE.TetrahedronGeometry(1, 0);

    var lights = [];
    lights[0] = new THREE.DirectionalLight(0x808080, 1);
    lights[0].position.set(1, 0, 0);
    lights[1] = new THREE.DirectionalLight(0x303030, 1);
    lights[1].position.set(0.75, 1, 0.5);
    lights[2] = new THREE.DirectionalLight(0x141313, 1);
    lights[2].position.set(-0.75, -1, 0.5);
    scene.add(lights[0]);
    scene.add(lights[1]);
    scene.add(lights[2]);

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

        function updateGeometry(mesh, geometry) {
            mesh.geometry.dispose();
            mesh.geometry = geometry;
        }


        function createGeometry() {
            analyser.getByteFrequencyData(dataArray);
            var lowerHalfArray = dataArray.slice(0, (dataArray.length / 2) - 1);
            var upperHalfArray = dataArray.slice((dataArray.length / 2) - 1, dataArray.length - 1);

            var lowerMax = max(lowerHalfArray) / 2;
            var upperAvg = avg(upperHalfArray) / 2;


            var lowerMaxFr = lowerMax / lowerHalfArray.length;
            var upperAvgFr = upperAvg / upperHalfArray.length;

            ratio = Math.round(modulate(Math.pow(lowerMaxFr, 0.2), 0, 1, 0, 8) + 50);

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

            return new THREE.IcosahedronGeometry(distance + 40, 1);
        }

        for (var i = 0; i < 1000; i++) {
            var mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
            mesh.position.multiplyScalar(90 + (Math.random() * 700));
            mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
            particle.add(mesh);
        }

        //CREATION DES PARTICULES QUI MARCHE AVEC LE BRUIT
        var geometryParticuleSpe = new THREE.TetrahedronGeometry(15, 2);
        var geometryParticuleSpe2 = new THREE.TetrahedronGeometry(10, 2);
        var geometryParticuleSpe3 = new THREE.TetrahedronGeometry(12, 2);

        var particuleSpe1 = new THREE.Mesh(geometryParticuleSpe, materialParticuleSpe1);
        particuleSpe1.position.x = 350;
        particuleSpe1.position.y = 150;
        particuleSpe1.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);

        var particuleSpe2 = new THREE.Mesh(geometryParticuleSpe2, materialParticuleSpe2);
        particuleSpe2.position.x = 200;
        particuleSpe2.position.y = 50;

        var particuleSpe3 = new THREE.Mesh(geometryParticuleSpe, materialParticuleSpe3);
        particuleSpe3.position.x = -400;
        particuleSpe3.position.y = 200;

        var particuleSpe4 = new THREE.Mesh(geometryParticuleSpe3, materialParticuleSpe4);
        particuleSpe4.position.x = -200;
        particuleSpe4.position.y = -200;

        var particuleSpe5 = new THREE.Mesh(geometryParticuleSpe, materialParticuleSpe5);
        particuleSpe5.position.x = 50;
        particuleSpe5.position.y = 200;

        var particuleSpe6 = new THREE.Mesh(geometryParticuleSpe2, materialParticuleSpe6);
        particuleSpe6.position.x = 200;
        particuleSpe6.position.y = -150;

        var particuleSpe7 = new THREE.Mesh(geometryParticuleSpe3, materialParticuleSpe7);
        particuleSpe7.position.x = -500;
        particuleSpe7.position.y = -40;

        var particuleSpe8 = new THREE.Mesh(geometryParticuleSpe3, materialParticuleSpe8);
        particuleSpe8.position.x = -150;
        particuleSpe8.position.y = 100;

        particleSpe.add(particuleSpe1);
        particleSpe.add(particuleSpe2);
        particleSpe.add(particuleSpe3);
        particleSpe.add(particuleSpe4);
        particleSpe.add(particuleSpe5);
        particleSpe.add(particuleSpe6);
        particleSpe.add(particuleSpe7);
        particleSpe.add(particuleSpe8);

        function createGeometryPlanet() {
            analyser.getByteFrequencyData(dataArray);
            var lowerHalfArray = dataArray.slice(0, (dataArray.length / 2) - 1);
            var lowerMax = max(lowerHalfArray) / 2;
            var lowerMaxFr = lowerMax / lowerHalfArray.length;

            ratio = Math.round(modulate(Math.pow(lowerMaxFr, 0.2), 0, 1, 0, 8) + 25);
            distance = Math.round((modulate(Math.pow(lowerMaxFr, 0.8), 0, 1, 0, 8)));

            if (distance % 2 == 0) {
                distance += 2;
            } else {
                distance -= 2;
            }

            return new THREE.IcosahedronGeometry(ratio, distance);
        }


        function setupKeyControls() {
            var color = Math.random() * 0x777777 + 0x777777;
            document.onkeydown = function(e) {
                switch (e.keyCode) {
                    //Q Particle 1
                    case 81:
                        particuleSpe1.material.color.set(color);
                        particuleSpe1.rotateX(20);
                        particuleSpe1.position.x += 5;
                        particuleSpe1.position.y += 2;
                        break;
                        //S Particle 2
                    case 83:
                        particuleSpe2.material.color.set(color);
                        particuleSpe2.rotateX(80);
                        particuleSpe2.position.x += 3;
                        particuleSpe2.position.y += 5;
                        break;
                        //S Particle 3
                    case 68:
                        particuleSpe3.material.color.set(color);
                        particuleSpe3.rotateX(100);
                        particuleSpe3.position.x += 7;
                        particuleSpe3.position.y += 9;
                        break;
                        //F Particle 4
                    case 70:
                        particuleSpe4.material.color.set(color);
                        particuleSpe4.rotateX(120);
                        particuleSpe4.position.x += 3;
                        particuleSpe4.position.y += 3;
                        break;
                        //G Particle 5
                    case 71:
                        particuleSpe5.material.color.set(color);
                        particuleSpe5.rotateX(30);
                        particuleSpe5.position.x += 9;
                        particuleSpe5.position.y += 7;
                        break;
                        //H Particle 6
                    case 72:
                        particuleSpe6.material.color.set(color);
                        particuleSpe6.rotateX(60);
                        particuleSpe6.position.x += 2;
                        particuleSpe6.position.y += 6;
                        break;
                        //J Particle 7
                    case 74:
                        particuleSpe7.material.color.set(color);
                        particuleSpe7.rotateX(40);
                        particuleSpe7.position.x += 4;
                        particuleSpe7.position.y += 4;
                        break;
                        //K Particle 8
                    case 75:
                        particuleSpe8.material.color.set(color);
                        particuleSpe8.rotateX(70);
                        particuleSpe8.position.x += 3;
                        particuleSpe8.position.y += 6;
                        break;
                }
            };
            document.onkeyup = function(e) {

                var color = Math.random() * 0x777777 + 0x777777;
                switch (e.keyCode) {
                    //Q Particle 1
                    case 81:

                        particuleSpe1.rotateX(20);
                        particuleSpe1.position.x -= 5;
                        particuleSpe1.position.y -= 2;
                        break;
                        //S Particle 2
                    case 83:
                        particuleSpe2.rotateX(80);
                        particuleSpe2.position.x -= 3;
                        particuleSpe2.position.y -= 5;
                        break;
                        //S Particle 3
                    case 68:
                        particuleSpe3.rotateX(100);
                        particuleSpe3.position.x -= 7;
                        particuleSpe3.position.y -= 9;
                        break;
                        //F Particle 4
                    case 70:
                        particuleSpe4.rotateX(120);
                        particuleSpe4.position.x -= 3;
                        particuleSpe4.position.y -= 3;
                        break;
                        //G Particle 5
                    case 71:
                        particuleSpe5.rotateX(30);
                        particuleSpe5.position.x -= 9;
                        particuleSpe5.position.y -= 7;
                        break;
                        //H Particle 6
                    case 72:
                        particuleSpe6.rotateX(60);
                        particuleSpe6.position.x -= 2;
                        particuleSpe6.position.y -= 6;
                        break;
                        //J Particle 7
                    case 74:
                        particuleSpe7.rotateX(40);
                        particuleSpe7.position.x -= 4;
                        particuleSpe7.position.y -= 4;
                        break;
                        //K Particle 8
                    case 75:
                        particuleSpe8.rotateX(70);
                        particuleSpe8.position.x -= 3;
                        particuleSpe8.position.y -= 6;
                        break;
                }
            };
        }



        //CREATION DE LA PLANETE
        var planet = new THREE.Mesh(createGeometryPlanet(), mat);
        circle.add(planet);

        planet.scale.x = planet.scale.y = planet.scale.z = 3;

        var planet2 = new THREE.Mesh(createGeometry(), mat2);
        planet2.scale.x = planet2.scale.y = planet2.scale.z = 3;
        skelet.add(planet2);

        var animate = function() {
            if (distancePrevious != distance) {
                updateGeometry(planet, createGeometryPlanet())
                updateGeometry(planet2, createGeometry())
                distancePrevious = distance;
            }
            updateGeometry(planet, createGeometryPlanet());
            updateGeometry(planet2, createGeometry());
            setupKeyControls();
            particuleSpe1.rotation.x += 0.005;
            particuleSpe1.rotation.y += 0.010;

            particuleSpe2.rotation.x += 0.005;
            particuleSpe2.rotation.y += 0.010;

            particuleSpe3.rotation.x += 0.005;
            particuleSpe3.rotation.y += 0.010;

            particuleSpe4.rotation.x += 0.005;
            particuleSpe4.rotation.y += 0.010;

            particuleSpe5.rotation.x += 0.005;
            particuleSpe5.rotation.y += 0.010;

            particuleSpe6.rotation.x += 0.005;
            particuleSpe6.rotation.y += 0.010;

            particuleSpe7.rotation.x += 0.005;
            particuleSpe7.rotation.y += 0.010;

            particuleSpe8.rotation.x += 0.005;
            particuleSpe8.rotation.y += 0.010;

            particle.rotation.x += 0.000004;
            particle.rotation.y -= 0.0005;
            circle.rotation.x -= 0.0020;
            circle.rotation.y += 0.0030;
            skelet.rotation.x -= 0.0010;
            skelet.rotation.y += 0.0020;
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