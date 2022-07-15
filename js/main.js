// all songs details array (Json data)
const allMusic = [
    {
        src: "music/yt5s.com - Mayorkun - Mama (Official Video) (128 kbps).mp3",
        artist: "mayorkun",
        song: "mama"
    },

    {
        src: "music/yt5s.com - Brandy Maina - ( ACOUSTIC ) KUBALI X DANGER DINJI (128 kbps).mp3",
        artist: "Brandy maina X Danger Dinji",
        song: "Kubali"
    },

    {
        src: "music/yt5s.com - Bruno Mars - The Lazy Song (Official Music Video) (128 kbps).mp3",
        artist: "Bruno Mars",
        song: "The lazy song"
    },

    {
        src: "music/yt5s.com - CKay - Emiliana [Official Music Video] (128 kbps).mp3",
        artist: "CKay",
        song: "Emiliana"
    },

    {
        src: "music/yt5s.com - Davido - FIA (Official Video) (128 kbps).mp3",
        artist: "Davido",
        song: "FIA"
    },

    {
        src: "music/yt5s.com - Le Band x Suzziah - Number 1 (official video)[SMS SKIZA 9046701 to 811] (128 kbps).mp3",
        artist: "Le Band x Suzziah",
        song: "Number 1"
    },

    {
        src: "music/yt5s.com - MONALISA  - LOJAY X SARZ X CHRIS BROWN (128 kbps).mp3",
        artist: "LOJAY X SARZ X CHRIS BROWNn",
        song: "MONALISA"
    },

    {
        src: "music/yt5s.com - Nviiri the Storyteller - Niko Sawa ft Bien (Official Music Video) SMS [Skiza 5802169] to 811 (128 kbps).mp3",
        artist: "mNviiri the Storyteller ft Bien",
        song: "Niko Sawa"
    },

    {
        src: "music/yt5s.com - Olakira - Maserati Remix [Official Video] Ft. Davido (128 kbps).mp3",
        artist: "Olakira Ft. Davido",
        song: "Maserati Remix"
    },

    {
        src: "music/yt5s.com - Pheelz - Finesse ft BUJU - (Lyric Video) (128 kbps).mp3",
        artist: "Finesse",
        song: "Pheelz ft BUJU"
    },

    {
        src: "music/yt5s.com - Rema - Calm Down (Official Music Video) (128 kbps).mp3",
        artist: "Rema",
        song: "Calm Down"
    },

    {
        src: "music/yt5s.com - Samthing Soweto x Mzansi Youth Choir -  The Danko! Medley (128 kbps).mp3",
        artist: "Samthing Soweto x Mzansi Youth Choir",
        song: "The Danko!"
    },

    {
        src: "music/yt5s.com - Sauti Sol - Tujiangalie ft Nyashinski (Official Lyric Video) SMS [Skiza 1051931] to 811 (128 kbps).mp3",
        artist: "Sauti Sol ft Nyashinski ",
        song: "Tujiangalie"
    },

    {
        src: "music/Jamhuri Jam Sessions SWIGA - ROSELLA (Cover).mp3",
        artist: "Jamhuri Jam Sessions SWIGA",
        song: "ROSELLA (Cover)"
    }
]

// display random gif when document loads
function randomGif() {
    // all gifs src array
    const allGifs = ["img/dancing.gif", "img/dancing-2.gif", "img/dancing-3.gif", "img/dancing-4.gif"]
    const gifContainer = document.querySelector('.images')
    const randomGif = Math.floor(Math.random()*allGifs.length) //pic random Gif in the allGif array
    gifContainer.innerHTML = `<img src=${allGifs[randomGif]} alt="img">`
}

randomGif()

// set and show playing music
let randomMusic = Math.floor(Math.random()*allMusic.length) //pic random music in the allMusic array
console.log(randomMusic);
const audio = document.querySelector('#audio')
const songName = document.querySelector('.song-name')
const songArtist = document.querySelector('.song-artist')

function playingMusicDetails(songItem) {
    audio.src = allMusic[songItem].src
    songName.innerHTML = allMusic[songItem].song
    songArtist.innerHTML = allMusic[songItem].artist
}

playingMusicDetails(randomMusic) //play random song

// music controls functionality
const controlsContainer = document.querySelector('.controls')
const controls = controlsContainer.querySelectorAll('img')
// play music function
function playMusic(item) {
    audio.play()
    item.currentTarget.setAttribute('src', "img/pause.png")
}

// pause music function
function pauseMusic(item) {
    audio.pause()
    item.currentTarget.setAttribute('src', "img/play.png")
}

const playBtn = document.querySelector('#play')
controls.forEach((control) => {
    control.addEventListener('click', (e)=> {
        const clickedControl = e.currentTarget.getAttribute('src')
        // play and pause music functionality
        if(clickedControl === "img/play.png") {
            playMusic(e)
        } else if(clickedControl === "img/pause.png") {
            pauseMusic(e)
        }

        // check that music selected is within the array
        function arrayLimit() {
            if(randomMusic<0) {
                randomMusic = allMusic.length-1
            } else if(randomMusic > allMusic.length-1) {
                randomMusic=0
            }
        }

        // next and previous button functionality
        if(clickedControl === "img/next.png") {
            randomMusic++
            arrayLimit()
            playingMusicDetails(randomMusic)
            audio.play()
            playBtn.setAttribute('src', "img/pause.png")
            randomGif()
        } else if(clickedControl === "img/previous.png") {          
            randomMusic--
            arrayLimit()
            playingMusicDetails(randomMusic)
            audio.play()
            playBtn.setAttribute('src', "img/pause.png")
            randomGif()
        }

        // list button 
        const listHeader = document.querySelector('.list-header')
        if(clickedControl === "img/list.png") {
            songListContainer.classList.add('full-list')
            listHeader.style.display = "flex"
        }
        const closeBtn = document.querySelector('.close-list')
        closeBtn.addEventListener('click', ()=> {
            songListContainer.classList.remove('full-list')
            listHeader.style.display = "none"
        })
    })
})

// all songs list at bottom of player 
const songListContainer = document.querySelector('.songs-list')
allMusic.map((singleSong) => {
    songListContainer.innerHTML += `
    <div class="single-song">
        <p class="song-name">${singleSong.song}</p>
        <p class="song-artist">${singleSong.artist}</p>
    </div>
    `
})

// play clicked song functionality
const allSongs = document.querySelectorAll('.single-song')
allSongs.forEach((eachSong) => {
    eachSong.addEventListener('click', (e) => {
        const selectedSong = e.currentTarget.children[0].innerHTML
        const selectedSongArtist = e.currentTarget.children[1].innerHTML
        const filteredSong = allMusic.filter((singleSong) => {
            if(singleSong.song == selectedSong) {
                return singleSong
            }
        })
    audio.src = filteredSong[0].src
    songName.innerHTML = filteredSong[0].song
    songArtist.innerHTML = filteredSong[0].artist
    audio.play()
    playBtn.setAttribute('src', "img/pause.png")
    })
})