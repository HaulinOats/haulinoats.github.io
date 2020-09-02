// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine
});

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);
var bottomBound = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
var topBound = Bodies.rectangle(400, 0, 810, 40, {isStatic: true});
var leftBound = Bodies.rectangle(0, 300, 40, 600, {isStatic: true});
var rightBound = Bodies.rectangle(800, 300, 40, 600, {isStatic: true});

// add all of the bodies to the world
World.add(engine.world, [
  boxA, 
  boxB, 
  bottomBound, 
  topBound,
  leftBound,
  rightBound
]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);