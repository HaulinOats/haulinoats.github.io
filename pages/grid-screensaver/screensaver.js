var mainContainer = document.querySelector('.main-container');
var imagesArr = [];
var options = {};
//build images array
for (var i = 1; i < 97; i++) {
    imagesArr.push("./img/" + i + ".jpg");
}
var optionsContainer = document.querySelector('.grid-options-container');
var optionsTab = document.querySelector('.options-tab');
var optionsSubmit = document.querySelector('.options-submit');
var optionInputs = document.querySelectorAll('.grid-options-container input');
var optionsParams = new URLSearchParams(window.location.search);
//iterate the search parameters.
for (var param in optionsParams) {
    var paramName = param[0];
    var paramValue = param[1];
    switch (paramName) {
        case "opacityDuration":
            options['opacityDuration'] = Number(paramValue);
            document.querySelector('#opacity-duration-input').value = options['opacityDuration'];
            break;
        case "pageChangeTimeout":
            options['pageChangeTimeout'] = Number(paramValue);
            document.querySelector('#page-change-timeout-input').value = options['pageChangeTimeout'];
            break;
        case "kenBurnsScaling":
            options['allowKenBurnsScaling'] = paramValue === '0' ? false : true;
            document.querySelector('#ken-burns-scaling-input').checked = options['allowKenBurnsScaling'];
            break;
        case "gridLayoutsId":
            options['gridLayoutsId'] = Number(paramValue);
            document.querySelector('#grid-layouts-id-input').value = options['gridLayoutsId'];
            break;
    }
}
var actionHandler = function (e) {
    var classNames = e.target.classList;
    var _loop_1 = function (i, len) {
        switch (classNames[i]) {
            case "options-tab":
                optionsContainer.classList.toggle('expand');
                break;
            case "options-submit":
                var paramsObj_1 = {};
                optionInputs.forEach(function (option) {
                    var element = option;
                    switch (element.id) {
                        case "opacity-duration-input":
                            paramsObj_1['opacityDuration'] = Number(element.value);
                            break;
                        case "page-change-timeout-input":
                            paramsObj_1['pageChangeTimeout'] = Number(element.value);
                            break;
                        case "ken-burns-scaling-input":
                            paramsObj_1['kenBurnsScaling'] = Number(element.checked);
                            break;
                        case "grid-layouts-id-input":
                            paramsObj_1['gridLayoutsId'] = Number(element.value);
                            break;
                    }
                });
                var params = new URLSearchParams(paramsObj_1);
                window.location.href = window.location.href.split('?')[0] + "?" + params.toString();
                break;
        }
    };
    for (var i = 0, len = classNames.length; i < len; i++) {
        _loop_1(i, len);
    }
};
optionsTab.addEventListener('click', actionHandler);
optionsSubmit.addEventListener('click', actionHandler);
//instantiates and starts screensaver
var screensaver = gridScreensaver(mainContainer, imagesArr, options);
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
function gridScreensaver(attachElement, imageArr, options) {
    console.log(options);
    console.log('opacityDuration' in options);
    var opacityDuration = 'opacityDuration' in options ? Number(options.opacityDuration) : 1;
    var pageChangeTimeout = 'pageChangeTimeout' in options ? Number(options.pageChangeTimeout) : 40;
    var allowKenBurnsScaling = 'allowKenBurnsScaling' in options ? Boolean(options.allowKenBurnsScaling) : true;
    var closeOnClick = 'closeOnClick' in options ? Boolean(options.closeOnClick) : false;
    var bindStartQuerySelector = 'bindStartQuerySelector' in options && options.bindStartQuerySelector ? options.bindStartQuerySelector : null;
    var startCallback = 'startCallback' in options && typeof options.startCallback === "function" ? options.startCallback : false;
    var loadCallback = 'loadCallback' in options && typeof options.loadCallback === "function" ? options.loadCallback : false;
    var stopCallback = 'stopCallback' in options && typeof options.stopCallback === "function" ? options.stopCallback : false;
    var gridLayoutsId = 'gridLayoutsId' in options ? Number(options.gridLayoutsId) : 0;
    var imageTransitionStartDelay = 0;
    var isHorizontal = true;
    var screensaverActive = false;
    var frontActive = true;
    var gridsPerPage;
    var screensaverFront;
    var screensaverBack;
    var screensaverEl;
    var gridPageIdx = 0;
    var gridLayoutsArr = [];
    var gridImageData = {
        "vertical": {
            "imageArr": [],
            "countIdx": 0
        },
        "horizontal": {
            "imageArr": [],
            "countIdx": 0
        },
        "square": {
            "imageArr": [],
            "countIdx": 0
        }
    };
    var imagesLeftToLoad = imageArr.length;
    var gridElements = [];
    preloadAndSortImages();
    buildScreensaverAndApplyListeners();
    function start() {
        console.log('start...');
        //If all images have loaded, allow screensaver to start
        if (!imagesLeftToLoad) {
            console.log('starting screensaver...');
            screensaverEl.style.display = 'block';
            if (startCallback) {
                startCallback();
            }
            frontActive = true;
            buildGrids(screensaverFront);
        }
    }
    function buildScreensaverAndApplyListeners() {
        console.log('buildScreensaverAndApplyListeners()');
        var baseHTML = "\n      <div id='mvwsct_ui_gridScreensaverInner'>\n        <div data-is-front='0' class=\"mvwsct_ui_gridScreensaverInnerContainer\" id=\"mvwsct_ui_gridScreensaverInner_backGrid\"></div>\n        <div data-is-front='1' class=\"mvwsct_ui_gridScreensaverInnerContainer\" id=\"mvwsct_ui_gridScreensaverInner_frontGrid\"></div>\n      </div>";
        screensaverEl = document.createElement('div');
        screensaverEl.id = 'mvwsct_ui_gridScreensaver';
        screensaverEl.innerHTML = baseHTML;
        attachElement.appendChild(screensaverEl);
        applyGridScreensaverCSS();
        screensaverFront = document.getElementById('mvwsct_ui_gridScreensaverInner_frontGrid');
        screensaverBack = document.getElementById('mvwsct_ui_gridScreensaverInner_backGrid');
        //'transitionend' listener allows smooth transitions that execute when memory allows
        screensaverEl.addEventListener('transitionend', function (e) {
            // if(e.target.id === 'mvwsct_ui_gridScreensaver'){
            switch (e.target.style.opacity) {
                case "1": //triggers when screensaver starts/loads (fade-in completes)
                    console.log('screensaver loaded (active)');
                    screensaverActive = true;
                    if (loadCallback) {
                        loadCallback();
                    }
                    break;
                case "0": //triggers when screensaver stops/unloads (fade-out completes)
                    console.log('screensaver stopped');
                    unloadScreensaver();
                    break;
            }
            // }
        });
        //triggers when front grid page finishes transition (Opacity change between 1 and 0)
        screensaverFront.addEventListener('transitionend', handleTransition, false);
        //get orientation of screen
        if (attachElement.offsetWidth < attachElement.offsetHeight) {
            isHorizontal = false;
        }
        //get layout object array based on orientation (if not explicitly set)
        if (gridLayoutsId) {
            gridLayoutsArr = getGridLayouts(gridLayoutsId);
        }
        else {
            if (isHorizontal) {
                gridLayoutsArr = getGridLayouts(1);
            }
            else {
                gridLayoutsArr = getGridLayouts(2);
            }
        }
        //stop/hide screensaver
        if (closeOnClick) {
            screensaverEl.addEventListener('pointerdown', stop);
        }
        //if bindStartQuerySelector (query selector string passed) exists, start screensaver on double click
        if (bindStartQuerySelector) {
            document.querySelector(bindStartQuerySelector).addEventListener('dblclick', function () {
                start();
            });
        }
    }
    ;
    //'transitionend' listener allows smooth transitions that execute when memory allows
    function handleTransition(e) {
        e.stopPropagation();
        //when a screensaver page change FINISHES (front page finishes fade in or out),
        //remove elements from page that's no longer in view to free DOM memory
        if (e.target.id === 'mvwsct_ui_gridScreensaverInner_frontGrid') {
            if (e.target.style.opacity === '0') {
                while (screensaverFront.lastChild) {
                    screensaverFront.lastChild.remove();
                }
            }
            else {
                while (screensaverBack.lastChild) {
                    screensaverBack.lastChild.remove();
                }
            }
            frontActive = !frontActive;
        }
        //When a transition finishes on a single grid item within a page.
        //'letter-spacing' transition is a low-memory way of creating a 
        //delay and callback for the 'transitionend' event instead of using 
        //'setTimeout' for more accurate realtime animation timeline handling.
        if (e.target.classList.contains('mvwsct_ui_gridScreensaverInner_gridItem_inner')) {
            switch (e.propertyName) {
                case "opacity":
                    //if there are more grid items that haven't done a transition
                    if (gridElements.length > 1) {
                        var nextEl = gridElements.pop();
                        applyTransitionAttributes(nextEl.lastElementChild, false, false);
                    }
                    else {
                        //transition to next grid page
                        if (frontActive) {
                            buildGrids(screensaverBack);
                            setTimeout(function () {
                                screensaverFront.style.opacity = '0';
                            }, 2500);
                        }
                        else {
                            buildGrids(screensaverFront);
                            setTimeout(function () {
                                screensaverFront.style.opacity = '1';
                            }, 2500);
                        }
                    }
                    break;
                case "transform":
                case "letter-spacing":
                    var parentEl = e.target.parentElement;
                    e.target.style.transition = "opacity " + opacityDuration + "s";
                    //if front image, fade-out front image
                    if (e.target.classList.contains('mvwsct_ui_gridScreensaverInner_gridItem_front')) {
                        e.target.previousElementSibling.style.backgroundImage = "url(" + handleCountAndReturnImageUrl(parentEl.getAttribute('data-orientation')) + ")";
                        e.target.style.opacity = '0';
                    }
                    else { //if back image, fade-in front image
                        e.target.nextElementSibling.style.backgroundImage = "url(" + handleCountAndReturnImageUrl(parentEl.getAttribute('data-orientation')) + ")";
                        e.target.style.opacity = '1';
                    }
                    break;
            }
        }
    }
    //preload images and sort into their respective arrays within 'gridImageData' object
    //based on their orientation.
    function preloadAndSortImages() {
        console.log('preloading and sorting images...');
        var _loop_2 = function (i) {
            var tempImg = new Image();
            tempImg.src = imageArr[i];
            tempImg.onload = function () {
                var imageRatio = tempImg.width > tempImg.height ? tempImg.height / tempImg.width : tempImg.width / tempImg.height;
                if (imageRatio > 0.8) {
                    gridImageData.square.imageArr.push(tempImg);
                }
                else {
                    if (tempImg.width >= tempImg.height) {
                        gridImageData.horizontal.imageArr.push(tempImg);
                    }
                    else {
                        gridImageData.vertical.imageArr.push(tempImg);
                    }
                }
                imagesLeftToLoad--;
                if (!imagesLeftToLoad) {
                    gridImageData.horizontal.imageArr = shuffleArr(gridImageData.horizontal.imageArr);
                    gridImageData.vertical.imageArr = shuffleArr(gridImageData.vertical.imageArr);
                    gridImageData.square.imageArr = shuffleArr(gridImageData.square.imageArr);
                    console.log('images preloaded and sorted');
                    console.log('gridImageData: ', gridImageData);
                    //normally you would call this from where screensaver was instantiated
                    screensaver.start();
                    return;
                }
            };
            tempImg.onerror = function () {
                imagesLeftToLoad--;
            };
        };
        for (var i = 0; i < imageArr.length; i++) {
            _loop_2(i);
        }
    }
    function buildGrids(screensaverContainer) {
        console.log('building page grids...');
        //sets screensaver to block to show (display:none when not active), though opacity won't change 
        //(fade in won't occur) until the grids have finished loading and started their animations
        screensaverEl.style.display = 'block';
        //Populate grids on page based on layout properties defined for current grid page.
        var gridData = gridLayoutsArr[gridPageIdx];
        incrementGridPageCount();
        var html = "";
        for (var i = 0; i < gridData.length; i++) {
            var isFront = parseInt(screensaverContainer.getAttribute('data-is-front'));
            html += "<div data-is-front='" + isFront + "' data-left='" + gridData[i].left + "' data-top='" + gridData[i].top + "' data-col='" + gridData[i].col + "' data-row='" + gridData[i].row + "' class='mvwsct_ui_gridScreensaverInner_gridItem'>\n                <div class='mvwsct_ui_gridScreensaverInner_gridItem_inner mvwsct_ui_gridScreensaverInner_gridItem_back'></div>\n                <div class='mvwsct_ui_gridScreensaverInner_gridItem_inner mvwsct_ui_gridScreensaverInner_gridItem_front'></div>\n              </div>";
        }
        screensaverContainer.innerHTML = html;
        setTimeout(function () {
            //wait on instant timeout (0ms) to allow screen rendering to finish before checking actual sizes of containers
            //in order to properly measure the orientation of a container
            var gridItems = screensaverContainer.querySelectorAll('.mvwsct_ui_gridScreensaverInner_gridItem');
            for (var i = 0; i < gridItems.length; i++) {
                var gridItemRatio = gridItems[i].offsetWidth > gridItems[i].offsetHeight ? gridItems[i].offsetHeight / gridItems[i].offsetWidth : gridItems[i].offsetWidth / gridItems[i].offsetHeight;
                if (gridItemRatio > 0.8) {
                    gridItems[i].setAttribute('data-orientation', 'square');
                }
                else {
                    if (gridItems[i].offsetWidth >= gridItems[i].offsetHeight) {
                        gridItems[i].setAttribute('data-orientation', 'horizontal');
                    }
                    else {
                        gridItems[i].setAttribute('data-orientation', 'vertical');
                    }
                }
            }
            initGridAnimations(screensaverContainer);
        }, 0);
    }
    //after grid page has been populated, loop through each grid element and begin
    //image transition animations
    function initGridAnimations(screensaverContainer) {
        console.log('Page grids built. Starting grid animations...');
        gridElements = shuffleArr([].slice.call(screensaverContainer.querySelectorAll('.mvwsct_ui_gridScreensaverInner_gridItem')));
        gridsPerPage = gridElements.length;
        imageTransitionStartDelay = gridsPerPage / pageChangeTimeout;
        for (var i = 0; i < gridElements.length; i++) {
            gridElements[i].addEventListener('transitionend', handleTransition);
            var frontImage = gridElements[i].querySelector('.mvwsct_ui_gridScreensaverInner_gridItem_front');
            var orientation_1 = gridElements[i].getAttribute('data-orientation');
            frontImage.style.backgroundImage = "url(" + handleCountAndReturnImageUrl(orientation_1) + ")";
            switch (i) {
                case 0: //Apply scaling (Ken Burns effect) on first element
                    if (allowKenBurnsScaling) {
                        applyTransitionAttributes(frontImage, true, true);
                    }
                    else {
                        applyTransitionAttributes(frontImage, false, true);
                    }
                    break;
                case 1: //Apply letter-spacing change on second element
                    if (allowKenBurnsScaling) {
                        applyTransitionAttributes(frontImage, false, true);
                    }
                    break;
            }
        }
        if (allowKenBurnsScaling) {
            gridElements = gridElements.slice(0, gridElements.length - 1);
        }
        else {
            gridElements = gridElements.slice(0, gridElements.length);
        }
        screensaverEl.style.opacity = '1';
    }
    function applyTransitionAttributes(el, shouldScale, firstLoad) {
        var transitionDelay = 0;
        if (firstLoad) {
            transitionDelay = imageTransitionStartDelay;
            if (allowKenBurnsScaling && !shouldScale) {
                transitionDelay = imageTransitionStartDelay * 2;
            }
        }
        if (shouldScale) {
            el.style.transform = 'scale3d(2,2,2)';
            el.style.transformOrigin = getRandomTransformOrigin();
            setTimeout(function () {
                el.style.transition = "transform " + pageChangeTimeout + "s ease-in-out " + transitionDelay + "s";
                el.style.transform = 'scale3d(1,1,1)';
            }, 100);
        }
        else {
            setTimeout(function () {
                el.style.transition = "letter-spacing " + pageChangeTimeout / gridsPerPage + "s ease-in-out " + transitionDelay + "s";
                el.style.letterSpacing = "5px";
            }, 100);
        }
    }
    //randomize where the background image traslates from
    function getRandomTransformOrigin() {
        var randomNumTo100 = Math.random() * 100;
        if (randomNumTo100 < 10) {
            return 'top left';
        }
        else if (randomNumTo100 >= 10 && randomNumTo100 < 20) {
            return 'top center';
        }
        else if (randomNumTo100 >= 20 && randomNumTo100 < 30) {
            return 'top right';
        }
        else if (randomNumTo100 >= 30 && randomNumTo100 < 40) {
            return 'right center';
        }
        else if (randomNumTo100 >= 40 && randomNumTo100 < 50) {
            return 'left center';
        }
        else if (randomNumTo100 >= 50 && randomNumTo100 < 60) {
            return 'bottom left';
        }
        else if (randomNumTo100 >= 60 && randomNumTo100 < 70) {
            return 'bottom center';
        }
        else if (randomNumTo100 >= 70 && randomNumTo100 < 80) {
            return 'bottom right';
        }
        else {
            return 'center';
        }
    }
    //checks 'gridImageData' object to see if there is an image at the current count index
    //if not, gets image at first index and sets 'countIdx' to 1. 
    //'gridImageData[imgOrientation].imageArr' gets array related to specified orientation
    //'gridImageData[imgOrientation].countIdx' gets/sets the current image count for orientation
    function handleCountAndReturnImageUrl(imgOrientation) {
        var imageUrl;
        var orientation = imgOrientation;
        if (!imagesExistForOrientation(imgOrientation)) {
            switch (imgOrientation) {
                case 'square':
                    if (imagesExistForOrientation('horizontal')) {
                        orientation = 'horizontal';
                    }
                    else {
                        orientation = 'vertical';
                    }
                    break;
                case 'horizontal':
                    if (imagesExistForOrientation('vertical')) {
                        orientation = 'vertical';
                    }
                    else {
                        orientation = 'square';
                    }
                    break;
                case 'vertical':
                    if (imagesExistForOrientation('horizontal')) {
                        orientation = 'horizontal';
                    }
                    else {
                        orientation = 'square';
                    }
                    break;
            }
        }
        //See if an image exists at the current 'countIdx'. If so, return first image
        //imageUrl and increment 'countIdx', else, loop back to the beginning of
        //the image array by returning the first image and setting 'countIdx' to '1'.
        if (gridImageData[orientation].imageArr[gridImageData[orientation].countIdx]) {
            imageUrl = gridImageData[orientation].imageArr[gridImageData[orientation].countIdx].src;
            gridImageData[orientation].countIdx++;
        }
        else {
            imageUrl = gridImageData[orientation].imageArr[0].src;
            gridImageData[orientation].countIdx = 1;
        }
        return imageUrl;
        function imagesExistForOrientation(imageOrientation) {
            if (gridImageData[imageOrientation].imageArr.length < 2) {
                return false;
            }
            else {
                return true;
            }
        }
    }
    function incrementGridPageCount() {
        if (!gridLayoutsArr[gridPageIdx + 1]) {
            gridPageIdx = 0;
        }
        else {
            gridPageIdx++;
        }
    }
    //stops screensaver (object and images still remain in memory)
    function stop() {
        console.log('stopping screensaver...');
        var allGridItems = document.querySelectorAll('.mvwsct_ui_gridScreensaverInner_gridItem_inner');
        for (var i = 0; i < allGridItems.length; i++) {
            allGridItems[i].style.transition = 'none';
        }
        screensaverEl.style.opacity = '0';
    }
    function unloadScreensaver() {
        console.log('unload screensaver');
        screensaverActive = false;
        screensaverEl.style.display = 'none';
        var pageContainers = document.querySelectorAll('.mvwsct_ui_gridScreensaverInnerContainer');
        for (var i = 0; i < pageContainers.length; i++) {
            while (pageContainers[i].lastChild) {
                pageContainers[i].lastChild.remove();
            }
            pageContainers[i].removeAttribute('style');
        }
        if (stopCallback)
            stopCallback();
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
    function isActive() {
        return screensaverActive;
    }
    //back ticks allow multi-line string definition (ES6 feature)
    function applyGridScreensaverCSS() {
        var styles = document.createElement('style');
        styles.setAttribute('id', 'mvwsct_ui_gridScreensaver_styles');
        styles.setAttribute('type', 'text/css');
        styles.innerHTML = "\n      #mvwsct_ui_gridScreensaver {\n        display:none;\n        transition:opacity 2s;\n        opacity:0;\n        background-color:white;\n        background-size:100% 100%;\n        position:absolute;\n        top:0;\n        left:0;\n        z-index:1000;\n        width:100%;\n        height:100%;\n        border:solid thin black;\n      }\n      #mvwsct_ui_gridScreensaverInner {\n        position:relative;\n        width:100%;\n        height:100%;\n      }\n      #mvwsct_ui_gridScreensaverInner_frontGrid,\n      #mvwsct_ui_gridScreensaverInner_backGrid {\n        position:absolute;\n        width:100%;\n        height:100%;\n      }\n      #mvwsct_ui_gridScreensaverInner_frontGrid{\n        transition:opacity 3s;\n        opacity:1;\n        z-index:1;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem {\n        z-index: 1;\n        transform:scale3d(1,1,1);\n        position:absolute;\n        box-shadow:inset 0px 0px 4px -2px black;\n        background:white;\n        overflow:hidden;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem_back,\n      .mvwsct_ui_gridScreensaverInner_gridItem_front {\n        transform:scale3d(1,1,1);\n        transform-origin:center;\n        position:absolute;\n        width:102%;\n        height:102%;\n        top:-1%;\n        left:-1%;\n        opacity:1;\n        letter-spacing:0px;\n        background-size:cover;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem_back {\n        z-index:1;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem_front {\n        z-index:2;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem[data-left=\"0\"]{\n        left:0;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem[data-left=\"1\"]{\n        left:10%;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem[data-left=\"2\"]{\n        left:20%;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem[data-left=\"3\"]{\n        left:30%;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem[data-left=\"4\"]{\n        left:40%;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem[data-left=\"5\"]{\n        left:50%;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem[data-left=\"6\"]{\n        left:60%;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem[data-left=\"7\"]{\n        left:70%;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem[data-left=\"8\"]{\n        left:80%;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem[data-left=\"9\"]{\n        left:90%;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem[data-top=\"0\"]{\n        top:0;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem[data-top=\"1\"]{\n        top:10%;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem[data-top=\"2\"] {\n        top:20%;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem[data-top=\"3\"] {\n        top:30%;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem[data-top=\"4\"] {\n        top:40%;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem[data-top=\"5\"] {\n        top:50%;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem[data-top=\"6\"] {\n        top:60%;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem[data-top=\"7\"] {\n        top:70%;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem[data-top=\"8\"] {\n        top:80%;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem[data-top=\"9\"] {\n        top:90%;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem[data-col=\"1\"] {\n        width:10%;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem[data-col=\"2\"] {\n        width:20%;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem[data-col=\"3\"] {\n        width:30%;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem[data-col=\"4\"] {\n        width:40%;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem[data-col=\"5\"] {\n        width:50%;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem[data-col=\"6\"] {\n        width:60%;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem[data-col=\"7\"] {\n        width:70%;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem[data-col=\"8\"] {\n        width:80%;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem[data-col=\"9\"] {\n        width:90%;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem[data-col=\"10\"] {\n        width:100%;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem[data-row=\"1\"] {\n        height:10%;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem[data-row=\"2\"] {\n        height:20%;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem[data-row=\"3\"] {\n        height:30%;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem[data-row=\"4\"]{\n        height:40%;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem[data-row=\"5\"] {\n        height:50%;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem[data-row=\"6\"] {\n        height:60%;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem[data-row=\"7\"] {\n        height:70%;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem[data-row=\"8\"] {\n        height:80%;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem[data-row=\"9\"] {\n        height:90%;\n      }\n      .mvwsct_ui_gridScreensaverInner_gridItem[data-row=\"10\"] {\n        height:100%;\n      }";
        document.getElementsByTagName('head')[0].appendChild(styles);
    }
    function getGridLayouts(layoutId) {
        switch (layoutId) {
            case 1: //Horizontal Normal
                return [[
                        { top: 0, left: 0, col: 4, row: 5 },
                        { top: 0, left: 4, col: 3, row: 7 },
                        { top: 0, left: 7, col: 3, row: 4 },
                        { top: 4, left: 7, col: 3, row: 6 },
                        { top: 7, left: 2, col: 2, row: 3 },
                        { top: 7, left: 4, col: 3, row: 3 },
                        { top: 5, left: 0, col: 2, row: 5 },
                        { top: 5, left: 2, col: 2, row: 2 }
                    ], [
                        { top: 0, left: 6, col: 4, row: 5 },
                        { top: 0, left: 3, col: 3, row: 7 },
                        { top: 0, left: 0, col: 3, row: 3 },
                        { top: 3, left: 0, col: 3, row: 7 },
                        { top: 7, left: 3, col: 3, row: 3 },
                        { top: 5, left: 8, col: 2, row: 5 },
                        { top: 7, left: 6, col: 2, row: 3 },
                        { top: 5, left: 6, col: 2, row: 2 }
                    ], [
                        { top: 5, left: 6, col: 4, row: 5 },
                        { top: 3, left: 3, col: 3, row: 7 },
                        { top: 6, left: 0, col: 3, row: 4 },
                        { top: 0, left: 8, col: 2, row: 5 },
                        { top: 0, left: 6, col: 2, row: 3 },
                        { top: 3, left: 6, col: 2, row: 2 },
                        { top: 0, left: 3, col: 3, row: 3 },
                        { top: 0, left: 0, col: 3, row: 6 }
                    ], [
                        { top: 0, left: 6, col: 4, row: 5 },
                        { top: 0, left: 3, col: 3, row: 7 },
                        { top: 0, left: 0, col: 3, row: 4 },
                        { top: 5, left: 8, col: 2, row: 5 },
                        { top: 7, left: 6, col: 2, row: 3 },
                        { top: 5, left: 6, col: 2, row: 2 },
                        { top: 7, left: 3, col: 3, row: 3 },
                        { top: 4, left: 0, col: 3, row: 6 }
                    ]];
            case 2: //Vertical Normal
                return [[
                        { top: 0, left: 0, col: 7, row: 3 },
                        { top: 3, left: 0, col: 4, row: 2 },
                        { top: 5, left: 5, col: 5, row: 3 },
                        { top: 5, left: 0, col: 5, row: 2 },
                        { top: 8, left: 5, col: 5, row: 2 },
                        { top: 3, left: 4, col: 3, row: 2 },
                        { top: 7, left: 0, col: 5, row: 3 },
                        { top: 2, left: 7, col: 3, row: 3 },
                        { top: 0, left: 7, col: 3, row: 2 }
                    ], [
                        { top: 0, left: 0, col: 5, row: 2 },
                        { top: 0, left: 5, col: 5, row: 3 },
                        { top: 2, left: 0, col: 5, row: 3 },
                        { top: 3, left: 5, col: 5, row: 2 },
                        { top: 5, left: 0, col: 3, row: 3 },
                        { top: 5, left: 3, col: 3, row: 2 },
                        { top: 5, left: 6, col: 4, row: 2 },
                        { top: 8, left: 0, col: 3, row: 2 },
                        { top: 7, left: 3, col: 7, row: 3 }
                    ], [
                        { top: 0, left: 0, col: 3, row: 2 },
                        { top: 0, left: 3, col: 7, row: 3 },
                        { top: 2, left: 0, col: 3, row: 3 },
                        { top: 3, left: 3, col: 3, row: 2 },
                        { top: 3, left: 6, col: 4, row: 2 },
                        { top: 5, left: 0, col: 5, row: 3 },
                        { top: 5, left: 5, col: 5, row: 2 },
                        { top: 7, left: 5, col: 5, row: 3 },
                        { top: 8, left: 0, col: 5, row: 2 }
                    ], [
                        { top: 0, left: 0, col: 5, row: 3 },
                        { top: 0, left: 5, col: 5, row: 2 },
                        { top: 2, left: 5, col: 5, row: 3 },
                        { top: 3, left: 0, col: 5, row: 2 },
                        { top: 5, left: 0, col: 4, row: 2 },
                        { top: 5, left: 4, col: 3, row: 2 },
                        { top: 5, left: 7, col: 3, row: 3 },
                        { top: 7, left: 0, col: 7, row: 3 },
                        { top: 8, left: 7, col: 3, row: 2 }
                    ]];
            case 3: //Horizontal - Square
                return [[
                        { top: 0, left: 0, col: 3, row: 3 },
                        { top: 0, left: 3, col: 4, row: 5 },
                        { top: 0, left: 7, col: 3, row: 7 },
                        { top: 3, left: 0, col: 3, row: 7 },
                        { top: 7, left: 7, col: 3, row: 3 },
                        { top: 5, left: 3, col: 4, row: 5 }
                    ], [
                        { top: 0, left: 0, col: 3, row: 3 },
                        { top: 0, left: 3, col: 4, row: 5 },
                        { top: 0, left: 7, col: 3, row: 7 },
                        { top: 3, left: 0, col: 3, row: 7 },
                        { top: 5, left: 3, col: 4, row: 5 },
                        { top: 7, left: 7, col: 3, row: 3 }
                    ], [
                        { top: 7, left: 4, col: 3, row: 3 },
                        { top: 0, left: 0, col: 4, row: 5 },
                        { top: 3, left: 7, col: 3, row: 7 },
                        { top: 0, left: 4, col: 3, row: 7 },
                        { top: 5, left: 0, col: 4, row: 5 },
                        { top: 0, left: 7, col: 3, row: 3 }
                    ], [
                        { top: 4, left: 6, col: 4, row: 6 },
                        { top: 0, left: 3, col: 4, row: 4 },
                        { top: 5, left: 0, col: 3, row: 5 },
                        { top: 4, left: 3, col: 3, row: 6 },
                        { top: 0, left: 7, col: 3, row: 4 },
                        { top: 0, left: 0, col: 3, row: 5 }
                    ]];
            case 4: //Vertical - Square
                return [[
                        { top: 0, left: 0, col: 4, row: 3 },
                        { top: 0, left: 4, col: 6, row: 3 },
                        { top: 3, left: 5, col: 5, row: 4 },
                        { top: 3, left: 0, col: 5, row: 4 },
                        { top: 7, left: 6, col: 4, row: 3 },
                        { top: 7, left: 0, col: 6, row: 3 }
                    ], [
                        { top: 0, left: 0, col: 6, row: 3 },
                        { top: 0, left: 6, col: 4, row: 3 },
                        { top: 3, left: 0, col: 5, row: 4 },
                        { top: 3, left: 5, col: 5, row: 4 },
                        { top: 7, left: 4, col: 6, row: 3 },
                        { top: 7, left: 0, col: 4, row: 3 }
                    ], [
                        { top: 0, left: 4, col: 6, row: 3 },
                        { top: 0, left: 0, col: 4, row: 3 },
                        { top: 3, left: 5, col: 5, row: 4 },
                        { top: 3, left: 0, col: 5, row: 4 },
                        { top: 7, left: 0, col: 6, row: 3 },
                        { top: 7, left: 6, col: 4, row: 3 }
                    ], [
                        { top: 4, left: 0, col: 6, row: 3 },
                        { top: 4, left: 6, col: 4, row: 3 },
                        { top: 0, left: 5, col: 5, row: 4 },
                        { top: 0, left: 0, col: 5, row: 4 },
                        { top: 7, left: 4, col: 6, row: 3 },
                        { top: 7, left: 0, col: 4, row: 3 }
                    ]];
            default:
                return getGridLayouts(1);
        }
    }
    return {
        isActive: isActive,
        start: start,
        stop: stop
    };
}
// gridScreensaver - end	
