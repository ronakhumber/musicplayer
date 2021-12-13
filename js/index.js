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



