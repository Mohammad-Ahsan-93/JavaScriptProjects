const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

// Functions
// 1 - toggleVideo - Play or pause video
// If video is playing, then pause
// If video is paused, then play
function toggleVideo() {
    if (video.paused) {
        video.play();
    }
    else {
        video.pause();
    }
} 

// 2 - updateIcon - toggle between play and pause icons
// If video is playing, then show pause icon
// If video is paused, then show play icon
function updateIcon() {
    if (video.paused) {
        play.innerHTML = '<i class="fas fa-play fa-1x"></i>'
    } else {
        play.innerHTML = '<i class="fas fa-pause fa-1x"></i>'
    }
}

// 3 - updateProgress - update the position of the progress bar and timestamp
function updateProgress() {
    // update slider
    progress.value = video.currentTime/video.duration*100; 

    // update timestramp
    let minutes = Math.floor(video.currentTime/60)
    if  (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let seconds = Math.floor(video.currentTime%60)
    if  (seconds < 10) {
        seconds = `0${seconds}`;
    }
    timestamp.innerText = `${minutes}:${seconds}`;
}  

// 4 - stopVIdeo - Stop video playback and reset time to 0
function stopVideo() {
    video.pause();
    video.currentTime = 0;
}

// 5 - setProgress - update video playback time based on manual change in progress bar
function setProgress() {
    video.currentTime = progress.value * video.duration / 100;
} 


// Event Listeners
// 1 - Video Element - cLick to play or pause video
video.addEventListener('click', toggleVideo);

// 2 - Video Element - pause to toggle play icon to pause icon
video.addEventListener('pause', updateIcon);

// 3 - Video Element - play to toggle pause icon back to play icon
video.addEventListener('play', updateIcon);

// 4 - Video Element - update progress bar and timestamp
video.addEventListener('timeupdate', updateProgress);

// 5 - Play Button - click to play or pause video
play.addEventListener('click', toggleVideo);

// 6 - Stop Button - click to reset video and pause video
stop.addEventListener('click', stopVideo);

// 7 - Progress Bar - change postion to change time of playback
progress.addEventListener('change', setProgress);