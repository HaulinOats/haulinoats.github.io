const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let grid = Array.from({ length: canvas.height }, () => Array(canvas.width).fill(0));
let isMouseDown = false;
let cellSize = 5;
let mouseX = 0;
let mouseY = 0;

canvas.addEventListener("mousedown", () => {
  isMouseDown = true;
});
canvas.addEventListener("mouseup", () => {
  isMouseDown = false;
});
canvas.addEventListener("mousemove", placeSand);

// Create an animation loop
function placeSand(e) {
  //only place sand if mouse is clicked
  if (isMouseDown) {
    for (let y = 0; y < cellSize; y++) {
      for (let x = 0; x < cellSize; x++) {
        grid[e.offsetY + y][e.offsetX + x] = 1;
      }
    }
  }
}

function drawSand() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      if (grid[y][x] === 1) {
        ctx.fillStyle = "white";
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }
}

function updateGrid() {
  console.log("updated...");
  for (let y = canvas.height - 1; y >= 0; y--) {
    for (let x = 0; x < canvas.width; x++) {
      if (grid[y][x] === 1 && y + 1 < canvas.height && grid[y + 1][x] === 0) {
        grid[y][x] = 0;
        grid[y + 1][x] = 1;
      }
    }
  }
}

function gameLoop() {
  drawSand();
  updateGrid();
  requestAnimationFrame(gameLoop);
}

gameLoop();
