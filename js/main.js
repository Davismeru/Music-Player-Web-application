// display random gif when document loads
function randomGif() {
    // all gifs src array
    const allGifs = ["img/dancing.gif", "img/dancing-2.gif", "img/dancing-3.gif", "img/dancing-4.gif", "img/dancing-5.gif", "img/dancing-6.gif"]
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

// progress bar functionality
const progressUpdateBar = document.querySelector('.current-progress')
audio.addEventListener('timeupdate', (e)=> {
    const songDuration = e.target.duration
    const songTotalTime = e.target.currentTime
    const barPosition = (songTotalTime/songDuration) * 100
    progressUpdateBar.style.width = `${barPosition}%`

    // show music current time and music duration
    const currentTimeContainer = document.querySelector('.current-time')
    const totalDurationContainer = document.querySelector('.total-duration')
    audio.addEventListener('loadeddata', (e)=> {
        // display correct music total time/duration
        const songTotalTime = e.target.duration
        const totalTimeInMins = Math.floor(songTotalTime / 60)
        let totalTimeInSecs = Math.floor(songTotalTime % 60)
        if(totalTimeInSecs<10) {
            totalTimeInSecs = `0${totalTimeInSecs}`
        }
        totalDurationContainer.innerText = `${totalTimeInMins}:${totalTimeInSecs}`
    })
    // display correct music current time
    const songCurrentTime = e.target.currentTime
    const currentTimeInMins = Math.floor(songCurrentTime / 60)
    let currentTimeInSecs = Math.floor(songCurrentTime % 60)
    if(currentTimeInSecs<10) {
        currentTimeInSecs = `0${currentTimeInSecs}`
    }
    currentTimeContainer.innerText = `${currentTimeInMins}:${currentTimeInSecs}`
})