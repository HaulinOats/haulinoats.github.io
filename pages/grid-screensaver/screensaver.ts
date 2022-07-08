const mainContainer:HTMLElement = document.querySelector('.main-container');
let imagesArr:string[] = [];
let options:any = {};

//build images array
for(let i = 1; i < 97; i++){
  imagesArr.push(`./img/${i}.jpg`);
}

const optionsContainer:HTMLElement = document.querySelector('.grid-options-container');
const optionsTab:HTMLElement = document.querySelector('.options-tab');
const optionsSubmit:HTMLElement = document.querySelector('.options-submit');
const optionInputs:NodeList = document.querySelectorAll('.grid-options-container input');
const optionsParams = new URLSearchParams(window.location.search);

//iterate the search parameters.
for (let param in optionsParams) {
  let paramName:string = param[0];
  let paramValue:string = param[1];
  switch(paramName){
    case "opacityDuration":
      options['opacityDuration'] = Number(paramValue);
      (<HTMLInputElement>document.querySelector('#opacity-duration-input')).value = options['opacityDuration'];
      break;
    case "pageChangeTimeout":
      options['pageChangeTimeout'] = Number(paramValue);
      (<HTMLInputElement>document.querySelector('#page-change-timeout-input')).value = options['pageChangeTimeout'];
      break;
    case "kenBurnsScaling":
      options['allowKenBurnsScaling'] = paramValue === '0' ? false : true;
      (<HTMLInputElement>document.querySelector('#ken-burns-scaling-input')).checked = options['allowKenBurnsScaling'];
      break;
    case "gridLayoutsId":
      options['gridLayoutsId'] = Number(paramValue);
      (<HTMLInputElement>document.querySelector('#grid-layouts-id-input')).value = options['gridLayoutsId'];
      break;
  }
}

const actionHandler = function(e){
  let classNames = e.target.classList;

  for(let i = 0, len = classNames.length; i < len; i++){
    switch(classNames[i]){
      case "options-tab":
        optionsContainer.classList.toggle('expand');
        break;
      case "options-submit":
        let paramsObj = {};
        
        optionInputs.forEach(option => {
          let element = <HTMLInputElement>option;
          switch(element.id){
            case "opacity-duration-input":
              paramsObj['opacityDuration'] = Number(element.value);
              break;
            case "page-change-timeout-input":
              paramsObj['pageChangeTimeout'] = Number(element.value);
              break;
            case "ken-burns-scaling-input":
              paramsObj['kenBurnsScaling'] = Number(element.checked);
              break;
            case "grid-layouts-id-input":
              paramsObj['gridLayoutsId'] = Number(element.value);
              break;
          }
        })
        let params = new URLSearchParams(paramsObj);
        window.location.href = window.location.href.split('?')[0] + "?" + params.toString();
        break;
    }
  }
}
optionsTab.addEventListener('click', actionHandler);
optionsSubmit.addEventListener('click', actionHandler);

//instantiates and starts screensaver
let screensaver = gridScreensaver(mainContainer, imagesArr, options);

// gridScreensaver - start
/**
 * Launches grid screensaver
 * Leverages ES6 features. Cheatsheet at: https://devhints.io/es6
 * Codepen to help with defining grids: https://codepen.io/HaulinOats/full/mQMVKJ/
 * @param {Element} attachElement - REQUIRED -  Element Object that screensaver will attach (append) to.
 * @param {Array} imageArr - REQUIRED - Array of fullpath image urls
 * @param {Object} options - OPTIONAL - Options for overriding screensaver default values
 * @param {number} options.opacityDuration - Duration of opacity fade between images within a single grid element (in seconds)
 * @param {number} options.pageChangeTimeout - Time between full grid page transitions (in seconds)
 * @param {Boolean} options.allowKenBurnsScaling - If set to false, turns off the 'Ken Burns' scaling effect
 * @param {Boolean} options.closeOnClick - If true, means the screensaver will close when clicked on
 * @param {string} options.bindStartQuerySelector - Query Selector string to bind start of screensaver to
 * @param {startCallback} options.startCallback - If provided, will trigger once screensaver starts (when start() is called)
 * @param {loadCallback} options.loadCallback - If provided, will trigger once screensaver loads (finishes fade in)
 * @param {stopCallback} options.stopCallback - If provided, will trigger once screensaver stops (starts fade-out)
 * @param {number} options.gridLayoutsId - If defined, overrides layout to be whichever id is passed
 */
function gridScreensaver(attachElement, imageArr, options){
  console.log(options);
  console.log('opacityDuration' in options);
  let opacityDuration = 'opacityDuration' in options ? Number(options.opacityDuration) : 1;
  let pageChangeTimeout = 'pageChangeTimeout' in options ? Number(options.pageChangeTimeout) : 40;
  let allowKenBurnsScaling = 'allowKenBurnsScaling' in options ? Boolean(options.allowKenBurnsScaling) : true;
  let closeOnClick = 'closeOnClick' in options ? Boolean(options.closeOnClick) : false;
  let bindStartQuerySelector = 'bindStartQuerySelector' in options && options.bindStartQuerySelector ? options.bindStartQuerySelector : null;
  let startCallback = 'startCallback' in options && typeof options.startCallback === "function" ? options.startCallback : false;
  let loadCallback = 'loadCallback' in options && typeof options.loadCallback === "function" ? options.loadCallback : false;
  let stopCallback = 'stopCallback' in options && typeof options.stopCallback === "function" ? options.stopCallback : false;
  let gridLayoutsId = 'gridLayoutsId' in options ? Number(options.gridLayoutsId) : 0;
  let imageTransitionStartDelay = 0;
  let isHorizontal = true;
  let screensaverActive = false;
  let frontActive = true;
  let gridsPerPage;
  let screensaverFront;
  let screensaverBack;
  let screensaverEl;
  let gridPageIdx = 0;
  let gridLayoutsArr = [];
  let gridImageData = {
    "vertical":{
      "imageArr":[],
      "countIdx":0
    }, 
    "horizontal":{
      "imageArr":[],
      "countIdx":0
    },
    "square":{
      "imageArr":[],
      "countIdx":0
    }
  };
  let imagesLeftToLoad = imageArr.length;
  let gridElements = [];

  preloadAndSortImages();
  buildScreensaverAndApplyListeners();

  function start(){
    console.log('start...');
    //If all images have loaded, allow screensaver to start
    if(!imagesLeftToLoad){
      console.log('starting screensaver...');
      screensaverEl.style.display = 'block';
      if(startCallback){
        startCallback();
      }
      frontActive = true;
      buildGrids(screensaverFront);
    }
  }

  function buildScreensaverAndApplyListeners(){
    console.log('buildScreensaverAndApplyListeners()');
    let baseHTML =`
      <div id='mvwsct_ui_gridScreensaverInner'>
        <div data-is-front='0' class="mvwsct_ui_gridScreensaverInnerContainer" id="mvwsct_ui_gridScreensaverInner_backGrid"></div>
        <div data-is-front='1' class="mvwsct_ui_gridScreensaverInnerContainer" id="mvwsct_ui_gridScreensaverInner_frontGrid"></div>
      </div>`;
    screensaverEl = document.createElement('div');
    screensaverEl.id = 'mvwsct_ui_gridScreensaver';
    screensaverEl.innerHTML = baseHTML;
    attachElement.appendChild(screensaverEl);
    applyGridScreensaverCSS();
    screensaverFront = document.getElementById('mvwsct_ui_gridScreensaverInner_frontGrid');
    screensaverBack = document.getElementById('mvwsct_ui_gridScreensaverInner_backGrid');
    //'transitionend' listener allows smooth transitions that execute when memory allows
    screensaverEl.addEventListener('transitionend', (e)=>{
      // if(e.target.id === 'mvwsct_ui_gridScreensaver'){
        switch(e.target.style.opacity){
          case "1"://triggers when screensaver starts/loads (fade-in completes)
            console.log('screensaver loaded (active)');
            screensaverActive = true;
            if(loadCallback){
              loadCallback();
            }
            break;
          case "0"://triggers when screensaver stops/unloads (fade-out completes)
            console.log('screensaver stopped');
            unloadScreensaver();
            break;
        }
      // }
    });

    //triggers when front grid page finishes transition (Opacity change between 1 and 0)
    screensaverFront.addEventListener('transitionend', handleTransition, false);
    
    //get orientation of screen
    if(attachElement.offsetWidth < attachElement.offsetHeight){
      isHorizontal = false;
    }

    //get layout object array based on orientation (if not explicitly set)
    if(gridLayoutsId){
      gridLayoutsArr = getGridLayouts(gridLayoutsId);
    } else {
      if(isHorizontal){
        gridLayoutsArr = getGridLayouts(1);
      } else {
        gridLayoutsArr = getGridLayouts(2);
      }
    }

    //stop/hide screensaver
    if(closeOnClick){
      screensaverEl.addEventListener('pointerdown', stop);
    }

    //if bindStartQuerySelector (query selector string passed) exists, start screensaver on double click
    if(bindStartQuerySelector){
      document.querySelector(bindStartQuerySelector).addEventListener('dblclick', ()=>{
        start();
      });
    }
  };

  //'transitionend' listener allows smooth transitions that execute when memory allows
  function handleTransition(e){
    e.stopPropagation();
    //when a screensaver page change FINISHES (front page finishes fade in or out),
    //remove elements from page that's no longer in view to free DOM memory
    if(e.target.id === 'mvwsct_ui_gridScreensaverInner_frontGrid'){
      if(e.target.style.opacity === '0'){
        while(screensaverFront.lastChild){
          screensaverFront.lastChild.remove();
        }
      } else {
        while(screensaverBack.lastChild){
          screensaverBack.lastChild.remove();
        }
      }
      frontActive = !frontActive;
    }
    //When a transition finishes on a single grid item within a page.
    //'letter-spacing' transition is a low-memory way of creating a 
    //delay and callback for the 'transitionend' event instead of using 
    //'setTimeout' for more accurate realtime animation timeline handling.
    if(e.target.classList.contains('mvwsct_ui_gridScreensaverInner_gridItem_inner')){
      switch(e.propertyName){
        case "opacity":
          //if there are more grid items that haven't done a transition
          if(gridElements.length > 1){
            let nextEl = gridElements.pop();
            applyTransitionAttributes(nextEl.lastElementChild, false, false);
          } else {
            //transition to next grid page
            if(frontActive){
              buildGrids(screensaverBack);
              setTimeout(()=>{
                screensaverFront.style.opacity = '0';
              }, 2500);
            } else {
              buildGrids(screensaverFront);
              setTimeout(()=>{
                screensaverFront.style.opacity = '1';
              }, 2500);
            }
          }
          break;
        case "transform":
        case "letter-spacing":
          let parentEl = e.target.parentElement;
          e.target.style.transition = `opacity ${opacityDuration}s`;
          //if front image, fade-out front image
          if(e.target.classList.contains('mvwsct_ui_gridScreensaverInner_gridItem_front')){
            e.target.previousElementSibling.style.backgroundImage = `url(${handleCountAndReturnImageUrl(parentEl.getAttribute('data-orientation'))})`;
            e.target.style.opacity = '0';
          } else {//if back image, fade-in front image
            e.target.nextElementSibling.style.backgroundImage = `url(${handleCountAndReturnImageUrl(parentEl.getAttribute('data-orientation'))})`;
            e.target.style.opacity = '1';
          }
          break;
      }
    }
  }

  //preload images and sort into their respective arrays within 'gridImageData' object
  //based on their orientation.
  function preloadAndSortImages(){
    console.log('preloading and sorting images...');
    for(let i = 0; i < imageArr.length; i++){
      let tempImg = new Image();
      tempImg.src = imageArr[i];
      tempImg.onload = ()=>{
        let imageRatio = tempImg.width > tempImg.height ? tempImg.height/tempImg.width : tempImg.width/tempImg.height;
        if(imageRatio > 0.8){
          gridImageData.square.imageArr.push(tempImg);
        } else {
          if(tempImg.width >= tempImg.height){
            gridImageData.horizontal.imageArr.push(tempImg);
          } else {
            gridImageData.vertical.imageArr.push(tempImg);
          }
        }
        imagesLeftToLoad--;
        if(!imagesLeftToLoad){
          gridImageData.horizontal.imageArr = shuffleArr(gridImageData.horizontal.imageArr);
          gridImageData.vertical.imageArr = shuffleArr(gridImageData.vertical.imageArr);
          gridImageData.square.imageArr = shuffleArr(gridImageData.square.imageArr);
          console.log('images preloaded and sorted');
          console.log('gridImageData: ', gridImageData);
          
          //normally you would call this from where screensaver was instantiated
          screensaver.start()
          return;
        }
      }
      tempImg.onerror = ()=>{
        imagesLeftToLoad--;
      }
    }
  }

  function buildGrids(screensaverContainer){
    console.log('building page grids...');
    //sets screensaver to block to show (display:none when not active), though opacity won't change 
    //(fade in won't occur) until the grids have finished loading and started their animations
    screensaverEl.style.display = 'block';
    //Populate grids on page based on layout properties defined for current grid page.
    let gridData = gridLayoutsArr[gridPageIdx];
    incrementGridPageCount();
    let html = "";
    for(let i = 0; i < gridData.length; i++){
      let isFront = parseInt(screensaverContainer.getAttribute('data-is-front'));
      html += `<div data-is-front='${isFront}' data-left='${gridData[i].left}' data-top='${gridData[i].top}' data-col='${gridData[i].col}' data-row='${gridData[i].row}' class='mvwsct_ui_gridScreensaverInner_gridItem'>
                <div class='mvwsct_ui_gridScreensaverInner_gridItem_inner mvwsct_ui_gridScreensaverInner_gridItem_back'></div>
                <div class='mvwsct_ui_gridScreensaverInner_gridItem_inner mvwsct_ui_gridScreensaverInner_gridItem_front'></div>
              </div>`;
    }
    screensaverContainer.innerHTML = html;
    setTimeout(()=>{
      //wait on instant timeout (0ms) to allow screen rendering to finish before checking actual sizes of containers
      //in order to properly measure the orientation of a container
      let gridItems = screensaverContainer.querySelectorAll('.mvwsct_ui_gridScreensaverInner_gridItem');
      for(let i = 0; i < gridItems.length; i++){
        let gridItemRatio = gridItems[i].offsetWidth > gridItems[i].offsetHeight ? gridItems[i].offsetHeight/gridItems[i].offsetWidth : gridItems[i].offsetWidth/gridItems[i].offsetHeight;
        if(gridItemRatio > 0.8){
          gridItems[i].setAttribute('data-orientation', 'square');
        } else {
          if(gridItems[i].offsetWidth >= gridItems[i].offsetHeight){
            gridItems[i].setAttribute('data-orientation', 'horizontal');
          } else {
            gridItems[i].setAttribute('data-orientation', 'vertical');
          }
        }
      }
      initGridAnimations(screensaverContainer);
    },0);
  }
  
  //after grid page has been populated, loop through each grid element and begin
  //image transition animations
  function initGridAnimations(screensaverContainer){
    console.log('Page grids built. Starting grid animations...');
    gridElements = shuffleArr([].slice.call(screensaverContainer.querySelectorAll('.mvwsct_ui_gridScreensaverInner_gridItem')));
    gridsPerPage = gridElements.length;
    imageTransitionStartDelay = gridsPerPage/pageChangeTimeout;
    for(let i = 0; i < gridElements.length; i++){
      gridElements[i].addEventListener('transitionend', handleTransition);
      let frontImage = gridElements[i].querySelector('.mvwsct_ui_gridScreensaverInner_gridItem_front');
      let orientation = gridElements[i].getAttribute('data-orientation');
      frontImage.style.backgroundImage = `url(${handleCountAndReturnImageUrl(orientation)})`;
      switch(i){
        case 0://Apply scaling (Ken Burns effect) on first element
          if(allowKenBurnsScaling){
            applyTransitionAttributes(frontImage, true, true);
          } else {
            applyTransitionAttributes(frontImage, false, true);
          }
          break;
        case 1://Apply letter-spacing change on second element
          if(allowKenBurnsScaling){
            applyTransitionAttributes(frontImage, false, true);
          }
          break;
      }
    }
    if(allowKenBurnsScaling){
      gridElements = gridElements.slice(0, gridElements.length - 1);
    } else {
      gridElements = gridElements.slice(0, gridElements.length);
    }
    screensaverEl.style.opacity = '1';
  }

  function applyTransitionAttributes(el, shouldScale, firstLoad){
    let transitionDelay = 0;
    if(firstLoad){
      transitionDelay = imageTransitionStartDelay;
      if(allowKenBurnsScaling && !shouldScale){
        transitionDelay = imageTransitionStartDelay * 2;
      }
    }
    if(shouldScale){
      el.style.transform = 'scale3d(2,2,2)';
      el.style.transformOrigin = getRandomTransformOrigin();
      setTimeout(()=>{
        el.style.transition = `transform ${pageChangeTimeout}s ease-in-out ${transitionDelay}s`;
        el.style.transform = 'scale3d(1,1,1)';
      },100);
    } else {
      setTimeout(()=>{
        el.style.transition = `letter-spacing ${pageChangeTimeout/gridsPerPage}s ease-in-out ${transitionDelay}s`;
        el.style.letterSpacing = "5px";
      },100);
    }
  }

  //randomize where the background image traslates from
  function getRandomTransformOrigin(){
    let randomNumTo100 = Math.random() * 100;
    if (randomNumTo100 < 10){
      return 'top left';
    } else if (randomNumTo100 >= 10 && randomNumTo100 < 20){
      return 'top center';
    } else if (randomNumTo100 >= 20 && randomNumTo100 < 30){
      return 'top right';
    } else if (randomNumTo100 >= 30 && randomNumTo100 < 40){
      return 'right center';
    } else if (randomNumTo100 >= 40 && randomNumTo100 < 50){
      return 'left center';
    } else if (randomNumTo100 >= 50 && randomNumTo100 < 60){
      return 'bottom left';
    } else if (randomNumTo100 >= 60 && randomNumTo100 < 70){
      return 'bottom center';
    } else if (randomNumTo100 >= 70 && randomNumTo100 < 80){
      return 'bottom right';
    } else {
      return 'center';
    }
  }

  //checks 'gridImageData' object to see if there is an image at the current count index
  //if not, gets image at first index and sets 'countIdx' to 1. 
  //'gridImageData[imgOrientation].imageArr' gets array related to specified orientation
  //'gridImageData[imgOrientation].countIdx' gets/sets the current image count for orientation
  function handleCountAndReturnImageUrl(imgOrientation){
    let imageUrl;
    let orientation = imgOrientation;
    if(!imagesExistForOrientation(imgOrientation)){
      switch(imgOrientation){
        case 'square':
          if(imagesExistForOrientation('horizontal')){
            orientation = 'horizontal';
          } else {
            orientation = 'vertical';
          }
          break;
        case 'horizontal':
          if(imagesExistForOrientation('vertical')){
            orientation = 'vertical';
          } else {
            orientation = 'square';
          }
          break;
        case 'vertical':
          if(imagesExistForOrientation('horizontal')){
            orientation = 'horizontal';
          } else {
            orientation = 'square';
          }
          break;
      }
    }
    
    //See if an image exists at the current 'countIdx'. If so, return first image
    //imageUrl and increment 'countIdx', else, loop back to the beginning of
    //the image array by returning the first image and setting 'countIdx' to '1'.
    if(gridImageData[orientation].imageArr[gridImageData[orientation].countIdx]){
      imageUrl = gridImageData[orientation].imageArr[gridImageData[orientation].countIdx].src;
      gridImageData[orientation].countIdx++;
    } else {
      imageUrl = gridImageData[orientation].imageArr[0].src;
      gridImageData[orientation].countIdx = 1;
    }
    return imageUrl;
    
    function imagesExistForOrientation(imageOrientation){
      if(gridImageData[imageOrientation].imageArr.length < 2){
        return false;
      } else {
        return true;
      }
    }
  }
  
  function incrementGridPageCount(){
    if(!gridLayoutsArr[gridPageIdx + 1]){
      gridPageIdx = 0;
    } else {
      gridPageIdx++;
    }
  }

  //stops screensaver (object and images still remain in memory)
  function stop(){
    console.log('stopping screensaver...');
    let allGridItems:NodeList = document.querySelectorAll('.mvwsct_ui_gridScreensaverInner_gridItem_inner');
    for(var i = 0; i < allGridItems.length; i++){
      (<HTMLElement>allGridItems[i]).style.transition = 'none';
    }
    screensaverEl.style.opacity = '0';
  }

  function unloadScreensaver(){
    console.log('unload screensaver');
    screensaverActive = false;
    screensaverEl.style.display = 'none';
    let pageContainers = document.querySelectorAll('.mvwsct_ui_gridScreensaverInnerContainer');
    for(var i = 0; i < pageContainers.length; i++){
      while(pageContainers[i].lastChild){
        pageContainers[i].lastChild.remove();
      }
      pageContainers[i].removeAttribute('style');
    }
    if(stopCallback) stopCallback();
  }

  function shuffleArr(arr) {
    var i, temp, j, len = arr.length;
    for (i = 0; i < len; i++) {
      j = ~~(Math.random() * len);
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }

  function isActive(){
    return screensaverActive;
  }

  //back ticks allow multi-line string definition (ES6 feature)
  function applyGridScreensaverCSS(){
    var styles = document.createElement('style');
    styles.setAttribute('id', 'mvwsct_ui_gridScreensaver_styles');
    styles.setAttribute('type', 'text/css');
    styles.innerHTML = `
      #mvwsct_ui_gridScreensaver {
        display:none;
        transition:opacity 2s;
        opacity:0;
        background-color:white;
        background-size:100% 100%;
        position:absolute;
        top:0;
        left:0;
        z-index:1000;
        width:100%;
        height:100%;
        border:solid thin black;
      }
      #mvwsct_ui_gridScreensaverInner {
        position:relative;
        width:100%;
        height:100%;
      }
      #mvwsct_ui_gridScreensaverInner_frontGrid,
      #mvwsct_ui_gridScreensaverInner_backGrid {
        position:absolute;
        width:100%;
        height:100%;
      }
      #mvwsct_ui_gridScreensaverInner_frontGrid{
        transition:opacity 3s;
        opacity:1;
        z-index:1;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem {
        z-index: 1;
        transform:scale3d(1,1,1);
        position:absolute;
        box-shadow:inset 0px 0px 4px -2px black;
        background:white;
        overflow:hidden;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem_back,
      .mvwsct_ui_gridScreensaverInner_gridItem_front {
        transform:scale3d(1,1,1);
        transform-origin:center;
        position:absolute;
        width:102%;
        height:102%;
        top:-1%;
        left:-1%;
        opacity:1;
        letter-spacing:0px;
        background-size:cover;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem_back {
        z-index:1;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem_front {
        z-index:2;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem[data-left="0"]{
        left:0;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem[data-left="1"]{
        left:10%;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem[data-left="2"]{
        left:20%;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem[data-left="3"]{
        left:30%;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem[data-left="4"]{
        left:40%;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem[data-left="5"]{
        left:50%;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem[data-left="6"]{
        left:60%;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem[data-left="7"]{
        left:70%;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem[data-left="8"]{
        left:80%;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem[data-left="9"]{
        left:90%;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem[data-top="0"]{
        top:0;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem[data-top="1"]{
        top:10%;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem[data-top="2"] {
        top:20%;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem[data-top="3"] {
        top:30%;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem[data-top="4"] {
        top:40%;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem[data-top="5"] {
        top:50%;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem[data-top="6"] {
        top:60%;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem[data-top="7"] {
        top:70%;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem[data-top="8"] {
        top:80%;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem[data-top="9"] {
        top:90%;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem[data-col="1"] {
        width:10%;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem[data-col="2"] {
        width:20%;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem[data-col="3"] {
        width:30%;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem[data-col="4"] {
        width:40%;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem[data-col="5"] {
        width:50%;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem[data-col="6"] {
        width:60%;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem[data-col="7"] {
        width:70%;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem[data-col="8"] {
        width:80%;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem[data-col="9"] {
        width:90%;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem[data-col="10"] {
        width:100%;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem[data-row="1"] {
        height:10%;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem[data-row="2"] {
        height:20%;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem[data-row="3"] {
        height:30%;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem[data-row="4"]{
        height:40%;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem[data-row="5"] {
        height:50%;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem[data-row="6"] {
        height:60%;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem[data-row="7"] {
        height:70%;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem[data-row="8"] {
        height:80%;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem[data-row="9"] {
        height:90%;
      }
      .mvwsct_ui_gridScreensaverInner_gridItem[data-row="10"] {
        height:100%;
      }`;
    document.getElementsByTagName('head')[0].appendChild(styles);
  }

  function getGridLayouts(layoutId){
    switch(layoutId){
      case 1://Horizontal Normal
        return [[
          {top:0, left:0, col:4, row:5},
          {top:0, left:4, col:3, row:7},
          {top:0, left:7, col:3, row:4},
          {top:4, left:7, col:3, row:6},
          {top:7, left:2, col:2, row:3},
          {top:7, left:4, col:3, row:3},
          {top:5, left:0, col:2, row:5},
          {top:5, left:2, col:2, row:2}
        ],[
          {top:0, left:6, col:4, row:5},
          {top:0, left:3, col:3, row:7},
          {top:0, left:0, col:3, row:3},
          {top:3, left:0, col:3, row:7},
          {top:7, left:3, col:3, row:3},
          {top:5, left:8, col:2, row:5},
          {top:7, left:6, col:2, row:3},
          {top:5, left:6, col:2, row:2}
        ],[
          {top:5, left:6, col:4, row:5},
          {top:3, left:3, col:3, row:7},
          {top:6, left:0, col:3, row:4},
          {top:0, left:8, col:2, row:5},
          {top:0, left:6, col:2, row:3},
          {top:3, left:6, col:2, row:2},
          {top:0, left:3, col:3, row:3},
          {top:0, left:0, col:3, row:6}
        ],[
          {top:0, left:6, col:4, row:5},
          {top:0, left:3, col:3, row:7},
          {top:0, left:0, col:3, row:4},
          {top:5, left:8, col:2, row:5},
          {top:7, left:6, col:2, row:3},
          {top:5, left:6, col:2, row:2},
          {top:7, left:3, col:3, row:3},
          {top:4, left:0, col:3, row:6}
        ]];
      case 2://Vertical Normal
        return [[
          {top:0, left:0, col:7, row:3},
          {top:3, left:0, col:4, row:2},
          {top:5, left:5, col:5, row:3},
          {top:5, left:0, col:5, row:2},
          {top:8, left:5, col:5, row:2},
          {top:3, left:4, col:3, row:2},
          {top:7, left:0, col:5, row:3},
          {top:2, left:7, col:3, row:3},
          {top:0, left:7, col:3, row:2}
        ],[
          {top:0, left:0, col:5, row:2},
          {top:0, left:5, col:5, row:3},
          {top:2, left:0, col:5, row:3},
          {top:3, left:5, col:5, row:2},
          {top:5, left:0, col:3, row:3},
          {top:5, left:3, col:3, row:2},
          {top:5, left:6, col:4, row:2},
          {top:8, left:0, col:3, row:2},
          {top:7, left:3, col:7, row:3}
        ],[
          {top:0, left:0, col:3, row:2},
          {top:0, left:3, col:7, row:3},
          {top:2, left:0, col:3, row:3},
          {top:3, left:3, col:3, row:2},
          {top:3, left:6, col:4, row:2},
          {top:5, left:0, col:5, row:3},
          {top:5, left:5, col:5, row:2},
          {top:7, left:5, col:5, row:3},
          {top:8, left:0, col:5, row:2}
        ],[
          {top:0, left:0, col:5, row:3},
          {top:0, left:5, col:5, row:2},
          {top:2, left:5, col:5, row:3},
          {top:3, left:0, col:5, row:2},
          {top:5, left:0, col:4, row:2},
          {top:5, left:4, col:3, row:2},
          {top:5, left:7, col:3, row:3},
          {top:7, left:0, col:7, row:3},
          {top:8, left:7, col:3, row:2}
        ]];
      case 3://Horizontal - Square
        return [[
          {top:0, left:0, col:3, row:3},
          {top:0, left:3, col:4, row:5},
          {top:0, left:7, col:3, row:7},
          {top:3, left:0, col:3, row:7},
          {top:7, left:7, col:3, row:3},
          {top:5, left:3, col:4, row:5}
        ],[
          {top:0, left:0, col:3, row:3},
          {top:0, left:3, col:4, row:5},
          {top:0, left:7, col:3, row:7},
          {top:3, left:0, col:3, row:7},
          {top:5, left:3, col:4, row:5},
          {top:7, left:7, col:3, row:3}
        ],[
          {top:7, left:4, col:3, row:3},
          {top:0, left:0, col:4, row:5},
          {top:3, left:7, col:3, row:7},
          {top:0, left:4, col:3, row:7},
          {top:5, left:0, col:4, row:5},
          {top:0, left:7, col:3, row:3}
        ],[
          {top:4, left:6, col:4, row:6},
          {top:0, left:3, col:4, row:4},
          {top:5, left:0, col:3, row:5},
          {top:4, left:3, col:3, row:6},
          {top:0, left:7, col:3, row:4},
          {top:0, left:0, col:3, row:5}
        ]];
      case 4://Vertical - Square
        return [[
          {top:0, left:0, col:4, row:3},
          {top:0, left:4, col:6, row:3},
          {top:3, left:5, col:5, row:4},
          {top:3, left:0, col:5, row:4},
          {top:7, left:6, col:4, row:3},
          {top:7, left:0, col:6, row:3}
        ],[
          {top:0, left:0, col:6, row:3},
          {top:0, left:6, col:4, row:3},
          {top:3, left:0, col:5, row:4},
          {top:3, left:5, col:5, row:4},
          {top:7, left:4, col:6, row:3},
          {top:7, left:0, col:4, row:3}
        ],[
          {top:0, left:4, col:6, row:3},
          {top:0, left:0, col:4, row:3},
          {top:3, left:5, col:5, row:4},
          {top:3, left:0, col:5, row:4},
          {top:7, left:0, col:6, row:3},
          {top:7, left:6, col:4, row:3}
        ],[
          {top:4, left:0, col:6, row:3},
          {top:4, left:6, col:4, row:3},
          {top:0, left:5, col:5, row:4},
          {top:0, left:0, col:5, row:4},
          {top:7, left:4, col:6, row:3},
          {top:7, left:0, col:4, row:3}
        ]];
      default:
        return getGridLayouts(1);
    }
  }

  return {
    isActive,
    start,
    stop
  }
}
// gridScreensaver - end	