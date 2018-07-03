var canvas  = document.getElementById("resources");
if (canvas.getContext){   
   var ctx = canvas.getContext('2d');   
   console.log('canvas working');
} else {   
   // canvas-unsupported code here 
}  
