const title = document.getElementById('title')
const artist = document.getElementById('artist')
const imgContainer = document.getElementById('image')
const music = document.getElementById('song')
const progress = document.getElementById('progress')
const ctrlIcon = document.getElementById('ctrlIcon')
const prev = document.getElementById('prev')
const next = document.getElementById('next')
 

const songs = [
    {
        name: 'song-1',
        title: 'Believer',
        artist: 'Imagine Dragons'
    },
    {
        name: 'song-2',
        title: 'If You Hold My Hand',
        artist: 'Benny Dayal.'
    },{
        name: 'song-3',
        title: 'Baby',
        artist: 'Justin Bieber'
    }
]

let isPlaying = false;
//rangeBar for song
music.onloadedmetadata = function(){
    if (!isPlaying){
        ctrlIcon.classList.replace("fa-pause", "fa-play");
    }
    progress.max = music.duration;
    progress.value = music.currentTime;
}
if(music.play()){    
    ctrlIcon.classList.replace("fa-play", "fa-pause");    
    imgContainer.classList.remove('anime');
    
    setInterval(()=>{
        progress.value = music.currentTime;
    }, 500)
}

//function for playing music at any range
progress.onchange = function(){
    music.play();
    music.currentTime = progress.value;    
    ctrlIcon.classList.replace("fa-play", "fa-pause");
    imgContainer.classList.add('anime');
}


const playMusic = ()=>{
    isPlaying = true;
    music.play();
    ctrlIcon.classList.replace('fa-play', 'fa-pause');
    imgContainer.classList.add('anime');
    
};

const pauseMusic = () =>{
    isPlaying = false;
    music.pause();
    ctrlIcon.classList.replace('fa-pause', 'fa-play');
    imgContainer.classList.remove('anime');
};

ctrlIcon.addEventListener('click', ()=>{
    isPlaying? pauseMusic() : playMusic();
});


//Changing the Music
songIndex = 0;

const loadSong = (songs) => {
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src = `music/${songs.name}.mpeg`;
    imgContainer.src = `images/${songs.name}.jpg`;
}

loadSong(songs[songIndex]);

const nextSong = () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();    
}

const prevSong = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();    
}

next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);




