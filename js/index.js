const outerBox = document.querySelector(".outerBox")
musicImg = outerBox.querySelector(".img-area img")
musicName = outerBox.querySelector(".song-details .name")
musicArtist = outerBox.querySelector(".song-details .artist")
playPauseBtn = outerBox.querySelector(".play-pause")
prevBtn = outerBox.querySelector("#prev")
nextBtn = outerBox.querySelector("#next")
mainAudio = outerBox.querySelector("#main-audio")
progressArea = outerBox.querySelector(".progress-area")
progressBar = progressArea.querySelector(".progress-bar")
musicList = document.querySelector(".music-list2")
moreMusicBtn = outerBox.querySelector("#show-playlist")

const ulTag = musicList.querySelector("ul")
function loadPlaylist(){
  ulTag.innerHTML=""
  for (let i = 0; i < allMusic.length; i++) {
    let liTag = `<li li-index="${i + 1}">
                  <div class="row">
                    <span>${allMusic[i].name}</span>
                    <p>${allMusic[i].artist}</p>
                  </div>
                  <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
                  <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
                </li>`
    ulTag.insertAdjacentHTML("beforeend", liTag) //inserting the li inside ul tag

    let liAudioDuartionTag = ulTag.querySelector(`#${allMusic[i].src}`)
    let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`)
    liAudioTag.addEventListener("loadeddata", ()=>{
      let duration = liAudioTag.duration
      let totalMin = Math.floor(duration / 60)
      let totalSec = Math.floor(duration % 60)
      if(totalSec < 10){ //if sec is less than 10 then add 0 before it
        totalSec = `0${totalSec}`
      }
      liAudioDuartionTag.innerText = `${totalMin}:${totalSec}` //passing total duation of song
      liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`) //adding t-duration attribute with total duration value
    })
  }
}
// Load playlist on load of document.
loadPlaylist()

let musicIndex = 1
let isMusicPaused = true

// loadMusic takes indexNumb parameter that starts from 1
function loadMusic(indexNumb){
  musicName.innerText = allMusic[indexNumb - 1].name
  musicArtist.innerText = allMusic[indexNumb - 1].artist
  musicImg.src = `img/${allMusic[indexNumb - 1].src}.jpg`
  mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`
}

//play music function
function playMusic(){
  outerBox.classList.add("paused")
  playPauseBtn.querySelector("i").innerText = "pause"
  mainAudio.play()
}

//pause music function
function pauseMusic(){
  outerBox.classList.remove("paused")
  playPauseBtn.querySelector("i").innerText = "play_arrow"
  mainAudio.pause()
}

// play or pause button event
playPauseBtn.addEventListener("click", ()=>{
  const isMusicPlay = outerBox.classList.contains("paused")
  //if isPlayMusic is true then call pauseMusic else call playMusic
  isMusicPlay ? pauseMusic() : playMusic()
  playingSong()
})

//play particular song from the list onclick of li tag
function playingSong(){
  const allLiTag = ulTag.querySelectorAll("li")
  
  for (let j = 0; j < allLiTag.length; j++) {
    let audioTag = allLiTag[j].querySelector(".audio-duration")
    
    if(allLiTag[j].classList.contains("playing")){
      allLiTag[j].classList.remove("playing")
      let adDuration = audioTag.getAttribute("t-duration")
      audioTag.innerText = adDuration
    }

    //if the li tag index is equal to the musicIndex then add playing class in it
    if(allLiTag[j].getAttribute("li-index") == musicIndex){
      allLiTag[j].classList.add("playing")
      audioTag.innerText = "Playing"
    }

    allLiTag[j].setAttribute("onclick", "clicked(this)")
  }
}
