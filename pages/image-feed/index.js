document.addEventListener('DOMContentLoaded', function(glEvent){
  (function(window, document){
    'use strict';

    //set global variables
    let imgObjArr = [];
    let currSlideIdx = 0;
    let isAnimating = false;
    let imgDelay = parseInt(getParameterByName('imgDelay')) * 1000 || 8000;
    let imgCount = parseInt(getParameterByName('imgCount')) || 30;
    let slideshowInterval;

    //cache selectors
    let feedContainer = document.getElementById('feed-container');
    let mainContainers = document.querySelectorAll('.main-container');
    let loadingCircle = document.getElementById('loading-circle');
    let logoutBtn = document.getElementById('logout-btn');
    let settingsContainer = document.getElementById('settings-container');
    let imgCountInput = document.getElementById('img-count-input');
    let imgDelayInput = document.getElementById('img-delay-input');
    let saveBtn = document.getElementById('save-btn');
    let settingsTab = document.getElementById("settings-container-tab");
    let slideshowControls = document.getElementById('slideshow-controls');
    // let slideshowPreviousBtn = document.getElementById('previous-button');
    let slideshowNextBtn = document.getElementById('next-button');
    let slideshowPauseBtn = document.getElementById('pause-button');
    let slideshowPlayBtn = document.getElementById('play-button');
    let body = document.querySelector('body');
    
    //set element values
    imgDelayInput.value = imgDelay/1000;
    imgCountInput.value = imgCount;
    
    //set listeners
    feedContainer.addEventListener('click', actionHandler);
    logoutBtn.addEventListener('click', actionHandler);
    settingsContainer.addEventListener('click', actionHandler);
    saveBtn.addEventListener('click', actionHandler);
    settingsTab.addEventListener('click', actionHandler);
    slideshowControls.addEventListener('click', actionHandler);
    // slideshowPreviousBtn.addEventListener('click', actionHandler);
    slideshowNextBtn.addEventListener('click', actionHandler);
    slideshowPauseBtn.addEventListener('click', actionHandler);
    slideshowPlayBtn.addEventListener('click', actionHandler);

    function actionHandler(e){
      e.stopPropagation();
      var id = e.currentTarget.id;

      //ids
      switch(id){
        case "save-btn":
          var newUrl = [location.protocol, '//', location.host, location.pathname].join('') + "?";
          newUrl += "&imgCount=" + imgCountInput.value;
          newUrl += "&imgDelay=" + imgDelayInput.value;
          window.location.replace(newUrl);
          break;
        case "feed-container":
          settingsContainer.classList.remove('settings-container-show');
          let slideshowControlsShowing = slideshowControls.classList.contains('slideshow-controls-show');
          if(slideshowControlsShowing){
            slideshowControls.classList.remove('slideshow-controls-show');
          } else {
            slideshowControls.classList.add('slideshow-controls-show');
          }
          break;
        case "settings-container-tab":
          let settingsIsShowing = settingsContainer.classList.contains('settings-container-show');
          if(settingsIsShowing){
            settingsContainer.classList.remove('settings-container-show');
          } else {
            settingsContainer.classList.add('settings-container-show');
          }
          break;
        case "previous-button":

          break;
        case "next-button":
          if(!isAnimating){
            pauseSlideshow();
            changeSlide();
            slideshowPlayBtn.classList.add('show');
            slideshowPauseBtn.classList.remove('show');
          }
          break;
        case "play-button":
          startSlideshow();
          slideshowPlayBtn.classList.remove('show');
          slideshowPauseBtn.classList.add('show');
          break;
        case "pause-button":
          pauseSlideshow();
          slideshowPlayBtn.classList.add('show');
          slideshowPauseBtn.classList.remove('show');
          break;
      }
    }
    
    ////ON LOAD
    fetch('https://picsum.photos/v2/list?page=2&limit=100')
    .then(response=>{
      return response.json();
    })
    .then(data=>{
      let imageData = shuffle(data);
      loadingCircle.style.display = "none";
      //compile all images and owner_ids into an object array
      for(var i = 0; i < imageData.length; i++){
        imgObjArr.push({
          "url":imageData[i].download_url,
          "owner_full_name":imageData[i].author
        });
      }
      //set 'imgCount' to maximum images returned if the number of returned
      //images is less than requested by user (or default of 10)
      if(imgObjArr.length < imgCount) {
        imgCount = imgObjArr.length
      }
      // remove any images beyond request image count
      imgObjArr = imgObjArr.slice(0, imgCount);

      //populate both containers with first 2 images
      createPost();
      createPost();
      startSlideshow();
    })
    
    //Custom functions
    let startSlideshow = function(){
      slideshowInterval = setInterval(function(){
        console.log('slideInterval');
        changeSlide();
      }, imgDelay);
    }

    let pauseSlideshow = function(){
      clearInterval(slideshowInterval);
    }

    let changeSlide = function(){
      isAnimating = true;
      if(currSlideIdx%2){
        mainContainers[0].classList.remove('hide-container');
      } else {
        mainContainers[0].classList.add('hide-container');
      }
      setTimeout(function(){
        createPost();
      },1500);
    }

    let createPost = function(){
      if(!imgObjArr[currSlideIdx]) currSlideIdx = 0;

      //poster container
      let html = `
        <div class='inner-main-container'>
          <div class='feed-poster-container'>
            <p class='feed-poster-name'>${imgObjArr[currSlideIdx].owner_full_name}</p>
          </div>
          <img class='feed-image' alt='slideshow-img' src='${imgObjArr[currSlideIdx].url}'/>
        </div>`;
      mainContainers[currSlideIdx%2].innerHTML = html;
      currSlideIdx++;
      isAnimating = false;
    }

    //GLOBAL LISTENERS
    window.addEventListener('resize', function(){
      body.style.height = (Math.floor(window.innerHeight) - 1) + "px";
      body.style.fontSize = ((window.innerWidth/1024) * 18) + "px";
    });

    //HELPER FUNCTIONS
    function getParameterByName(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;
    
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
    
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
    
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
    
      return array;
    }
  })(window, document)
});