let playpause_btn = document.querySelector('.play-track');
        let next_btn = document.querySelector('.next-track');
        let prev_btn = document.querySelector('.prev-track');

        let icon = document.querySelector(".slider_container")
        let seek_slider = document.querySelector('.seek-bar');
        let volume_slider = document.querySelector('.volume_slider')
        var volumeIcon = document.querySelector('#volume-icon');
        const currentVolume = document.querySelector("#volume");
        const trackDuration  = document.querySelector(".total-duration");
        const trackCurrentTime = document.querySelector(".current-time");
        const slider = document.querySelector("#duration");
        volumeIcon.addEventListener('click', mute_unmute, false);
        currentVolume.addEventListener("change", changeVolume);
        seek_slider.addEventListener("click", seekTo);
        
        let autoplay = 0;
        let track_index = 0;
        let isPlaying = false; 
        let timer;

        let audio = document.getElementById("audio");

        slider.addEventListener("change", changeDuration);
        audio.addEventListener("timeupdate", songTimeUpdate);


        function loadtrack(track_index){
            clearInterval(timer);
            resetSlider();

            audio.load();
            timer = setInterval(updateSlider, 1000);
        }
        loadtrack(track_index);

    function playpauseTrack() {
        isPlaying ? pauseTrack() : playTrack();
    }

    function playTrack(){
        audio.play();
        isPlaying = true;
        playpause_btn.innerHTML = '<img src="pausa.png" alt="">'
    }

    function pauseTrack(){
        audio.pause();
        isPlaying = false;
        playpause_btn.innerHTML = '<img src="play.png" alt="">'
    }

    function seekTo(){
        let seekto = audio.duration * (seek_slider.value / 100);
        audio.currentTime = seekto;
    }

    function mute_unmute() {
           if(audio.muted == true){
            audio.muted = false;
            volumeIcon.removeAttribute('src');
            volumeIcon.setAttribute('src', 'volume.png');
           } else {
            audio.muted = true;
            volumeIcon.removeAttribute('src');
            volumeIcon.setAttribute('src', 'muted.png');
           }
        }
       

function changeVolume() {
        audio.volume = currentVolume.value / 100;   
    }

    function changeDuration() {
  let sliderPosition = audio.duration * (slider.value / 100);
  audio.currentTime = sliderPosition;
}


    function resetSlider(){
        slider.value = 0;
    }

    function updateSlider(){
        let position = 0;
        if (!isNaN(audio.duration)) {
        position = audio.currentTime * (100/ audio.duration);
        slider.value = position;
        }
        
  if (audio.ended) {
    if (autoplay == 1 && track_index< trackList.length - 1) {
        track_index++;
        loadtrack(track_index);
      playTrack();
    } else if (autoplay == 1 && track_index == trackList.length - 1) {
        track_index = 0;
        loadtrack(track_index);
      playTrack();
    }
  }
    }

    function songTimeUpdate() {
  if (audio.duration) {
    let curmins = Math.floor(audio.currentTime / 60);
    let cursecs = Math.floor(audio.currentTime - curmins * 60);
    let durmins = Math.floor(audio.duration / 60);
    let dursecs = Math.floor(audio.duration - durmins * 60);

    if (dursecs < 10) {
      dursecs = "0" + dursecs;
    }
    if (durmins < 10) {
      durmins = "0" + durmins;
    }
    if (curmins < 10) {
      curmins = "0" + curmins;
    }
    if (cursecs < 10) {
      cursecs = "0" + cursecs;
    }
    trackCurrentTime.innerHTML = curmins + ":" + cursecs;
    trackDuration.innerHTML = durmins + ":" + dursecs;
  } else {
    trackCurrentTime.innerHTML = "00" + ":" + "00";
    trackDuration.innerHTML = "00" + ":" + "00";
  }
}


