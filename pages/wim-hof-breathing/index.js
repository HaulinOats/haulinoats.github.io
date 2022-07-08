let totalSecondsElapsed = 0;
let breathCount = 0;
let breathingIn = false;
let isCounting = false;
let isReset = true;
let breathHexagon = document.querySelector('.main-hexagon');
let totalTimeCountText = document.querySelector('.total-time-count');
let startStopButton = document.querySelector('.start-stop-button');
let breathCounterText = document.querySelector('.breath-counter');
let breathImageContainer = document.querySelector('.breath-image-container');
let resetButton = document.querySelector('.reset');
let breathInterval;
let timeInterval;

startStopButton.addEventListener('pointerdown', startApp);
breathImageContainer.addEventListener('pointerdown', startApp);
resetButton.addEventListener('pointerdown', resetApp);

function startApp(){
  if(isReset){
    isCounting = !isCounting;

    if(isCounting){
      startStopButton.innerHTML = "Stop";
      breathInterval = setInterval(()=>{
        if(breathingIn){
          breathImageContainer.classList.remove('deflate');
        } else {
          breathImageContainer.classList.add('deflate');
          breathCount++;
        }
        breathingIn = !breathingIn;
        breathCounterText.innerHTML = breathCount;
      },2000);
      timeInterval = setInterval(()=>{
        totalSecondsElapsed++;
        let secondsDelta = totalSecondsElapsed;
        let totalHours = Math.floor(totalSecondsElapsed/3600);
        secondsDelta -= totalHours * 3600;
        let totalMinutes = Math.floor(secondsDelta/60);
        secondsDelta -= totalMinutes * 60;
        let totalSeconds = totalSecondsElapsed % 60;
        totalTimeCountText.innerHTML = `
          ${totalHours < 10 ? '0' + totalHours : totalHours}:${totalMinutes < 10 ? '0' + totalMinutes : totalMinutes}:${totalSeconds < 10 ? '0' + totalSeconds : totalSeconds}`;
      }, 1000);
    } else {
      startStopButton.innerHTML = "Start";
      clearInterval(breathInterval);
      clearInterval(timeInterval);
    }
  }
}

function resetApp(){
  console.log('reset app');
  isReset = false;
  totalSecondsElapsed = 0;
  breathCount = 0;
  isCounting = false;
  breathingIn = false;
  startStopButton.innerHTML = "Start";
  totalTimeCountText.innerHTML = "00:00:00";
  breathCounterText.innerHTML = "0";
  breathImageContainer.classList.remove('deflate');
  clearInterval(breathInterval);
  clearInterval(timeInterval);
  setTimeout(()=>{
    isReset = true;
  },2000)
}