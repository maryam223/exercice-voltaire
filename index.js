function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    if (!audio) {
        return;
    }
    audio.currentTime = 0;
    audio.play();

    key.classList.add('playing');

};

function removeTransition(e) {
    if (e.propertyName !== 'transform') {
        return;
    }
    if (this.classList.contains('is-active')) {
        this.classList.remove('is-active');
    } else {
        this.classList.add('is-active');
    }
    this.classList.remove('playing');
}

/*const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));*/
window.addEventListener('keydown', playSound);

var btnQ = document.getElementById("btnQ");
var btnS = document.getElementById("btnS");
var btnD = document.getElementById("btnD");
var btnF = document.getElementById("btnF");
var btnG = document.getElementById("btnG");
var btnH = document.getElementById("btnH");
var btnJ = document.getElementById("btnJ");
var btnK = document.getElementById("btnK");

window.addEventListener("keydown", anim);

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', finAnim));


function anim(e) {
    if (e.keyCode == 81) {
        btnQ.classList.add('playing');
        document.getElementById("stars").style.display = "block";
        document.getElementById("stars").classList.remove('stars');
        document.getElementById("stars").classList.add('filante');

    }
    if (e.keyCode == 83) {
        btnS.classList.add('playing');
        document.getElementById("stars").style.display = "block";
        document.getElementById("stars").classList.remove('stars');
        document.getElementById("stars").classList.add('filante');
    }
    if (e.keyCode == 68) {
        btnD.classList.add('playing');
        document.getElementById("stars").style.display = "block";
        document.getElementById("stars").classList.remove('stars');
        document.getElementById("stars").classList.add('filante');
    }
    if (e.keyCode == 70) {
        btnF.classList.add('playing');
        document.getElementById("stars").style.display = "block";
        document.getElementById("stars").classList.remove('stars');
        document.getElementById("stars").classList.add('filante');
    }
    if (e.keyCode == 71) {
        btnG.classList.add('playing');
        document.getElementById("stars").style.display = "block";
        document.getElementById("stars").classList.remove('stars');
        document.getElementById("stars").classList.add('filante');
    }
    if (e.keyCode == 72) {
        btnH.classList.add('playing');
        document.getElementById("stars").style.display = "block";
        document.getElementById("stars").classList.remove('stars');
        document.getElementById("stars").classList.add('filante');
    }
    if (e.keyCode == 74) {
        btnJ.classList.add('playing');
        document.getElementById("stars").style.display = "block";
        document.getElementById("stars").classList.remove('stars');
        document.getElementById("stars").classList.add('filante');
    }
    if (e.keyCode == 75) {
        btnK.classList.add('playing');
        document.getElementById("stars").style.display = "block";
        document.getElementById("stars").classList.remove('stars');
        document.getElementById("stars").classList.add('filante');
    }
}

function finAnim(e) {
    if (e.propertyName !== 'transform') {
        return;
    }
    this.classList.remove('playing');
}