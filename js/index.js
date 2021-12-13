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
sortBtn = document.querySelector(".sort")
filterBtn = document.querySelector(".filter")
filterform = document.querySelector("#filterform")
const ulTag = musicList.querySelector("ul")
let allMusic = allMusicOG

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
loadMusic(musicIndex)

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

//prev music function
function prevMusic(){
  musicIndex-- //decrement of musicIndex by 1
  //if musicIndex is less than 1 then musicIndex will be the array length so the last music play
  musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex
  loadMusic(musicIndex)
  playMusic()
  playingSong() 
}

//next music function
function nextMusic(){
  musicIndex++ //increment of musicIndex by 1
  //if musicIndex is greater than array length then musicIndex will be 1 so the first music play
  musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex
  loadMusic(musicIndex)
  playMusic()
  playingSong() 
}

//prev music button event
prevBtn.addEventListener("click", ()=>{
  prevMusic()
})

//next music button event
nextBtn.addEventListener("click", ()=>{
  nextMusic()
})

// update progress bar width according to music current time
mainAudio.addEventListener("timeupdate", (e)=>{
  const currentTime = e.target.currentTime //getting playing song currentTime
  const duration = e.target.duration //getting playing song total duration
  let progressWidth = (currentTime / duration) * 100
  progressBar.style.width = `${progressWidth}%`

  let musicCurrentTime = outerBox.querySelector(".current-time")
  musicDuration = outerBox.querySelector(".max-duration")
  mainAudio.addEventListener("loadeddata", ()=>{
    // update song total duration
    let mainAdDuration = mainAudio.duration
    let totalMin = Math.floor(mainAdDuration / 60)
    let totalSec = Math.floor(mainAdDuration % 60)
    if(totalSec < 10){ //if sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`
  })
  // update playing song current time
  let currentMin = Math.floor(currentTime / 60)
  let currentSec = Math.floor(currentTime % 60)
  if(currentSec < 10){ //if sec is less than 10 then add 0 before it
    currentSec = `0${currentSec}`
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`
})

//particular li clicked function
function clicked(element){
  let getLiIndex = element.getAttribute("li-index")
  musicIndex = getLiIndex //updating current song index with clicked li index
  loadMusic(musicIndex)
  playMusic()
  playingSong()
}

function sortByName(){
  allMusic.sort((a,b) => (a.name > b.name) ?1 : -1)
  loadPlaylist()
  musicIndex=1
  loadMusic(musicIndex)
}
sortBtn.addEventListener("click",sortByName);
// Create map of singers
let artistMap = {}
allMusic.forEach(function(item){
    if(artistMap[item.artist]==undefined)
    artistMap[item.artist]=[]

    artistMap[item.artist].push(item);
})
filterBtn.addEventListener("click",function(){
    if(!document.querySelector(".filter-menu").classList.contains("show")){
        document.querySelector(".filter-menu").classList.add("show")
    }
    else{
        document.querySelector(".filter-menu").classList.remove("show")

    }
    let checkbox=`<input type="radio" onclick='handleFilterClick(this)' id="radio-all" checked name="filterArtist"></input> <label for=all>all</label><br>`
    Object.keys(artistMap).forEach(function(artist){
        checkbox+=`<input type="radio" onclick='handleFilterClick(this)' name="filterArtist" id="${artist}"></input> <label for=${artist}>${artist}</label><br>`
    })
    filterform.innerHTML=checkbox
})
function handleFilterClick(ele){
    allMusic=allMusicOG
    if(ele.id!="radio-all")
        allMusic = allMusic.filter(music => music.artist == ele.id)
    loadPlaylist()
    musicIndex=1
    loadMusic(musicIndex)

    console.log(ele)
}