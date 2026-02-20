'use strict';

const snapshotButton = document.querySelector('button#snapshot');
const filterSelect = document.querySelector('select#filter');
const slider = document.querySelector('#threshold');
const threshVal = document.querySelector('#threshVal');
const video = document.querySelector('video');
const canvas = document.querySelector('canvas');

canvas.width = 640;
canvas.height = 640;

slider.oninput = function() {
    const val = slider.value;
    const intensity = val / 360; 
    threshVal.innerText = Math.round(intensity * 100) + '%';
    video.style.setProperty('--intensity', intensity);
};

snapshotButton.onclick = function() {
    const context = canvas.getContext('2d');
    
    canvas.style.setProperty('--intensity', slider.value / 360);
    canvas.className = filterSelect.value;

    context.filter = getComputedStyle(video).filter;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = `Ekranvaizdis_${new Date().getTime()}.png`;
    link.click();
};

filterSelect.onchange = function() {
    video.className = filterSelect.value;
};

const constraints = {
    audio: false,
    video: { width: 640, height: 640 }
};

function handleSuccess(stream) {
    video.srcObject = stream;
}

function handleError(error) {
    console.error('Error: ', error);
}

navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);