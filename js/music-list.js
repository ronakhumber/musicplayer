var request = new XMLHttpRequest();
request.open("GET", "../songList.json", false);
request.send(null)
let allMusicOG = JSON.parse(request.responseText);