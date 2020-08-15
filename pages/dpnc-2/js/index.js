//assign elements for reuse
let hcProviderContainer = document.getElementById("hc-provider");
let hcProviderFormCancel = document.getElementById('provider-form-cancel');
// let hcProviderForm = document.getElementById("hc-provider-form");
// let hcProviderInnerContent = document.getElementById("hc-provider-inner-content");
let hcPlanContainer = document.getElementById("hc-plan");
let hcPlanFormCancel = document.getElementById('plan-form-cancel');
// let hcPlanForm = document.getElementById("hc-plan-form");
// let hcPlanInnerContent = document.getElementById("hc-plan-inner-content");

//apply action handlers
hcProviderContainer.addEventListener('click', actionHandler);
hcPlanContainer.addEventListener('click', actionHandler);
hcProviderFormCancel.addEventListener('click', actionHandler);
hcPlanFormCancel.addEventListener('click', actionHandler);
// hcProviderContainer.addEventListener('transitionend', actionHandler);
// hcProviderFormCancel.addEventListener('click', actionHandler);

function actionHandler(el){
  el.stopPropagation();
  let type = el.type;
  let id = el.currentTarget.id;
  let className = el.currentTarget.className;
  let target = el.currentTarget;
  console.log(el);
  console.log(target);
  console.log(type);

  switch(type){
    //CLICK
    case 'click':
      //IDs
      switch(id){
        case "hc-provider":
          let provtl = anime.timeline({
            easing:'linear'
          });
          provtl.add({
            targets:'#hc-provider',
            height:'100%',
            duration:1000
          }).add({
            targets:'#hc-provider-inner-content',
            top:'5%',
            duration:1000
          }).add({
            targets:'#hc-provider-form',
            opacity:'1',
            duration:500
          })
          break;
        case "hc-plan":
          let plantl = anime.timeline({});
          plantl.add({
            targets:'#hc-provider',
            height:'0%',
            duration:1000
          }).add({
            targets:'#hc-plan',
            height:'100%',
            duration:0
          })
          .add({
            targets:'#hc-plan-inner-content',
            top:'5%',
            duration:1000
          }).add({
            targets:'#hc-plan-form',
            opacity:'1',
            duration:500
          })
          break;
        case "provider-form-cancel":
          let provCancelTl = anime.timeline({
            easing:'linear'
          });
          provCancelTl.add({
            targets:'#hc-provider-form',
            opacity:'0',
            duration:500
          })
          .add({
            targets:'#hc-provider-inner-content',
            top:'28%',
            duration:1000
          })
          .add({
            targets:'#hc-provider',
            height:'50%',
            duration:500
          })
          break;
        case "plan-form-cancel":
          let planFormCancelTl = anime.timeline({
            easing:'linear'
          });
          planFormCancelTl.add({
            targets:'#hc-plan-form',
            opacity:'0',
            duration:500
          })
          .add({
            targets:'#hc-plan-inner-content',
            top:'28%',
            duration:1000
          })
          .add({
            targets:'#hc-provider',
            height:'50%',
            duration:500
          })
          .add({
            targets:'#hc-plan',
            height:'50%',
            duration:1000
          })
          break;
      }
    
      //Classes
      switch(className){
        case "main-page-inner":
          
          break;
      }
      break;
  }
}