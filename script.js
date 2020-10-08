const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');




// music
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight Disco Queen',
        artist: 'Jacinto Design',
    },
    {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Jacinto Design',
    },

];

// Check if Playing
let isPlaying = false;
// Play
function playSong()
{
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
    
    
    
}
// Pause
function pauseSong()
{
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
    
    
}



// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying? pauseSong(): playSong()));



// Update Dom
function loadSong(song)
{
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    
    image.src = `img/${song.name}.jpg`





}

// Current Song
let songIndex = 0;

// Next Song

function nextSong()
{
    if (songIndex === songs.length-1)
    songIndex = 0;
    else
    songIndex++;
    loadSong(songs[songIndex]);

    playSong();
}

// Prev Song

function prevSong()
{
    if (songIndex === 0)
    songIndex = songs.length-1;
    else
    songIndex--;
    loadSong(songs[songIndex]);
    playSong();
}
// On Load - select first song
loadSong(songs[songIndex]);

// Update Progress Bar and Time

function updateProgressBar(e)
{
    if(isPlaying)
    {
        const {duration, currentTime} = e.srcElement;
        

        // Update Progress Bar Width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // Calculate display for duration

        const durationMinutes = Math.floor(duration / 60);
        

        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10)
        durationSeconds = `0${durationSeconds}`;
        

        
        if(durationSeconds)
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;

        // calculate display for current time 

        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);

        

        if(currentSeconds < 10)
        currentSeconds = `0${currentSeconds}`;
        

        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
        
    }


}

// Set Progress Bar

function setProgressBar(e)
{

    const width = this.clientWidth;
    
    const clickX = e.offsetX;
    

    const {duration} = music;
    


    music.currentTime = (clickX / width) * duration;
}


nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);
