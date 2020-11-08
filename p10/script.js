const musiContainer = document.getElementById('music-container');
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const stopButton = document.getElementById('stop');
const audio = document.getElementById('audio');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// List of Songs
const songList = [ 'Merai Moula Ali',
                   'Haider-e-Karrar', 
                   'Imam Raza', 
                   'Salam Ghazi'
                ];

// Track which Song is currently is playing

let currentSong = 0;

// update the Song to current DOM
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

// Funtion to play the song
function playSong() {
    musiContainer.classList.add('play');
    playButton.querySelector('i.fas').classList.remove('fa-play');
    playButton.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

// Function to Pause song
function pauseSong() {
    musiContainer.classList.remove('play');
    playButton.querySelector('i.fas').classList.remove('fa-pause');   
    playButton.querySelector('i.fas').classList.add('fa-play');

    audio.pause();
}

// Fuction to Switch Previous Song
function prevSong() {
    currentSong--;

    if(currentSong < 0) {
        currentSong = songList.length - 1;
    }

    loadSong(songList[currentSong]);
    playSong();
}

// Fuction to Switch Next Song
function nextSong() {
    currentSong++;

    if(currentSong > songList.length - 1) {
        currentSong = 0;
    }

    loadSong(songList[currentSong]);
    playSong();
}

// Update the Progress Bar
function updateProgress(e) {
    const { currentTime, duration } = e.srcElement;
    const progressPercentage = currentTime / duration * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

// Function to Set Progress Bar
function setProgress(e) {
    const width = this.clientWidth;
    const offsetX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (offsetX / width) * duration;
} 

// Initial Song Load
loadSong(songList[currentSong]);

// Event Listners.
// 1. Play Button Event LIstners
playButton.addEventListener('click', () => {
    const isPlaying = musiContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
})

// 2. Previous Button Event Listner
prevButton.addEventListener('click', prevSong);

// 3. Next Button Event Listner
nextButton.addEventListener('click', nextSong);

// 4. Update the time for Song
audio.addEventListener('timeupdate', updateProgress);

// 5. Update the Time for Song Play based on CLick on Progress Container
progressContainer.addEventListener('click', setProgress);

// 6. Automatically Play next song
audio.addEventListener('ended', nextSong);


