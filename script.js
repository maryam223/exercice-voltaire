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

function play() {
    var context = new AudioContext();
    var src = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();
    console.log('analyser', analyser);
    src.connect(analyser);
    analyser.connect(context.destination);
    analyser.fftSize = 512;
    var bufferLength = analyser.frequencyBinCount;
    console.log('buffer', bufferLength);
    var dataArray = new Uint8Array(bufferLength);

    var scene = new THREE.Scene();
    var group = new THREE.Group();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


    camera.position.z = 100;


    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x1d1152);

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    //----------------DEPOSER ET CREER LA FORME--------------------//


    //var geometry = new THREE.IcosahedronGeometry(30, 2);

    let ballMaterial = new THREE.MeshBasicMaterial({
        color: 0x5cefff,
        transparent: true,
        opacity: 1,
        wireframe: true,
        linewidth: 5,
        linecap: 'round',
        linejoin: 'round'
    });

    //var ball = new THREE.Mesh(geometry, ballMaterial);
    //ball.position.set(0, 0, 0);
    //group.add(ball);

    //console.log("groupe", ball);

    // scene.add(group);

    document.getElementById('out').appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);


    //------------------------------------------------------------//


    render();

    function render() {

        //group.rotation.y += 0.005;


        var distancePrevious = 0;
        var distance = 0;

        var ratio = 0;

        function updateGeometry(mesh, geometry) {
            mesh.geometry.dispose();
            mesh.geometry = geometry;
            // these do not update nicely together if shared
        }


        function createGeometry() {
            analyser.getByteFrequencyData(dataArray);

            var lowerHalfArray = dataArray.slice(0, (dataArray.length / 2) - 1);
            var upperHalfArray = dataArray.slice((dataArray.length / 2) - 1, dataArray.length - 1);

            var lowerMax = max(lowerHalfArray);
            var upperAvg = avg(upperHalfArray);

            var lowerMaxFr = lowerMax / lowerHalfArray.length;
            var upperAvgFr = upperAvg / upperHalfArray.length;
            distance = Math.round(modulate(Math.pow(lowerMaxFr, 0.8), 0, 1, 0, 8) + modulate(upperAvgFr, 0, 1, 0, 4));

            ratio = Math.round(modulate(Math.pow(lowerMaxFr, 0.2), 0, 1, 0, 8) + 30);

            if (distance > 4) {
                distance = distance - 5;
            }

            console.log("ratio", ratio);
            return new THREE.IcosahedronGeometry(ratio, distance);
        }

        var mesh = new THREE.Mesh(createGeometry(), ballMaterial);
        console.log('mesh', mesh);
        scene.add(mesh);
        var animate = function() {
            if (distancePrevious != distance) {
                updateGeometry(mesh, createGeometry())
                distancePrevious = distance;
            }
            updateGeometry(mesh, createGeometry())
            mesh.rotation.y += 0.005;
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        animate();

        //renderer.render(scene, camera);
        // requestAnimationFrame(render);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    audio.play();

}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}



window.onload = vizInit();

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