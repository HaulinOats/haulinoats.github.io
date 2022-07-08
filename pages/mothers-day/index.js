const menuTab = document.querySelector('.menu-tab');
const messageContainer = document.querySelector('.message-container');

menuTab.addEventListener('click', actionHandler);

function actionHandler(e){
  let classNames = e.target.classList;

  console.log(classNames);
  for(let i = 0; i < classNames.length; i++){
    switch(classNames[i]){
      case "menu-tab":
        messageContainer.classList.toggle('show-message-container');
        break;
      default:
    }
  }
}