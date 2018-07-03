(function() {

    // Matter aliases
    var Engine = Matter.Engine,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Body = Matter.Body,
        Composite = Matter.Composite,
        Composites = Matter.Composites,
        Common = Matter.Common,
        Constraint = Matter.Constraint,
        RenderPixi = Matter.RenderPixi,
        Events = Matter.Events,
        Bounds = Matter.Bounds,
        Vector = Matter.Vector,
        Vertices = Matter.Vertices,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Query = Matter.Query;
        Grid = Matter.Grid;
        Render = Matter.Render;
        Axes = Matter.Axes;

    // MatterTools aliases
    if (window.MatterTools) {
        var Gui = MatterTools.Gui,
            Inspector = MatterTools.Inspector;
    }

    var Demo = {};

    var _engine,
        _gui,
        _inspector,
        _sceneName,
        _mouseConstraint,
        _sceneEvents = [],
        _useInspector = window.location.hash.indexOf('-inspect') !== -1,
        _isMobile = /(ipad|iphone|ipod|android)/gi.test(navigator.userAgent),
        hasStarted = false;
    
    // initialise the demo
    Demo.init = function() {
        var container = document.getElementById('canvas-container');
        var startButton = document.getElementById('conveyor_startGame');
        startButton.addEventListener('click', Demo.startDemo);

        // some example engine options
        var options = {
            positionIterations: 6,
            velocityIterations: 4,
            enableSleeping: false
        };

        // create a Matter engine
        // NOTE: this is actually Matter.Engine.create(), see the aliases at top of this file
        _engine = Engine.create(container, options);

        // add a mouse controlled constraint
        _mouseConstraint = MouseConstraint.create(_engine);
        World.add(_engine.world, _mouseConstraint);

        // run the engine
        Engine.run(_engine);

        // default scene function name
        _sceneName = 'conveyor';
        
        // get the scene function name from hash
        if (window.location.hash.length !== 0) 
            _sceneName = window.location.hash.replace('#', '').replace('-inspect', '');

        // set up a scene with bodies
        Demo[_sceneName]();

        // set up demo interface (see end of this file)
        Demo.initControls();
    };

    // call init when the page has loaded fully

    if (window.addEventListener) {
        window.addEventListener('load', Demo.init);
        
    } else if (window.attachEvent) {
        window.attachEvent('load', Demo.init);
    }

    Demo.startDemo = function() {
        hasStarted = true;
        document.getElementById('conveyorGame_display').style.display = "none";
        document.getElementById('conveyorGame_loadingGif').style.display = 'block';
    }
    
    Demo.conveyor = function() {
        Demo.reset();
        var _world = _engine.world,
            scoreTally = document.getElementById('conveyorGame_score'),
            score = 0,
            defectiveCount = 0;

        //set canvas size and composite bounds
        _engine.render.canvas.width = 1200;
        _engine.render.canvas.height = 800;
        _engine.render.bounds.max.x = 1200;
        _engine.render.bounds.max.y = 800;
        _world.bounds.max.x = 1200;
        _world.bounds.max.y = 800;

        var i = 0;
        var gearStackTop = Composites.stack(250, 250, 25, 1, 0, 0, function(x, y, column, row) {
            i+=2;
            return Bodies.polygon(x - 15, y + i, 7, 20, { isStatic:true, render: { sprite: { texture:'./img/belt-wheel.png', xScale: .35, yScale: .35 }} });
        });
        var gearStackMiddle = Composites.stack(400, 500, 25, 1, 0, 0, function(x, y, column, row) {
            i+=2;
            return Bodies.polygon(x - 15, y - i, 7, 20, { isStatic:true, render: { sprite: { texture:'./img/belt-wheel.png', xScale: .35, yScale: .35 }} });
        });
        var gearStackBottom = Composites.stack(250, 450, 25, 1, 0, 0, function(x, y, column, row) {
            i+=2;
            return Bodies.polygon(x - 15, y + i, 7, 20, { isStatic:true, render: { sprite: { texture:'./img/belt-wheel.png', xScale: .35, yScale: .35 }} });
        });

        //conveyor borders
        World.add(_world, Bodies.rectangle(950, 350, 5, 100, { isStatic:true, render: { fillStyle: "#222" }}));
        World.add(_world, Bodies.rectangle(240, 500, 5, 100, { isStatic:true, render: { fillStyle: "#222" } }));

        //funnel borders
        World.add(_world, Bodies.rectangle(960, 650, 5, 100, { isStatic:true, angle: Math.PI * .2, render: { fillStyle: "#222" }}));
        World.add(_world, Bodies.rectangle(830, 665, 5, 70, { isStatic:true, angle: Math.PI * .8, render: { fillStyle: "#222" } }));
        var calculateHitBox = Bodies.rectangle(890, 740, 120, 5, {isStatic:true, render: { lineWidth: 0, strokeStyle: "#FFF", fillStyle: "#FFF"}});
        World.add(_world, gearStackTop);
        World.add(_world, gearStackMiddle);
        World.add(_world, gearStackBottom);
        World.add(_world, calculateHitBox); // id = 83

        var funnel = Bodies.circle(880, 660, 0, { render: { sprite:{ texture: "./img/funnel.png", xScale: 1.2, yScale:1.2 }}});
        var pipe = Bodies.circle(550, 40, 0, { render: { sprite:{ texture: "./img/pipe.png", xScale: 1.2, yScale:1.2 }}});
        World.add(_world, pipe);
        World.add(_world, funnel);


        // var item = Bodies.circle(100, 50, 30, { friction:.5, restitution:.5, isGood:false });
        // World.add(_world, item);

        function startInterval() { 
            return window.setInterval(function() {
                var isGood = true;
                if (Math.random() > .5) {
                    var isGood = false;
                }
                World.add(_world, Bodies.polygon(Math.floor(Math.random()*(450 - 200 + 1) + 450), 50, Math.floor(Math.random()*(9 - 4 + 1) + 4),Math.floor(Math.random()*(30 - 20 + 1) + 20), { 
                    friction:.5, 
                    restitution:.5, 
                    mass: 2, 
                    isGood:isGood, 
                    render: { fillStyle: isGood ? "#6aaf6a" : "#C44D58" }
                }));
                Composite.remove(_world, funnel);
                Composite.remove(_world, pipe);
                World.add(_world, funnel);
                World.add(_world, pipe);
            }, 500);
        }

        var intervalStarted = false;
        var startDelay = 300;
        var gameInterval = null;
        _sceneEvents.push(
            Events.on(_engine, 'afterRender', function(event) {
                if (!intervalStarted && startDelay < 0 && _engine.timing.fps > 30 && hasStarted) {
                    gameInterval = startInterval();
                    intervalStarted = true;
                    document.getElementById('conveyorGame_loadingGif').style.display = 'none';
                } else {
                    startDelay--;
                }
                gearStackTop.bodies.forEach(function(element, index){
                    Body.rotate(element, 0.1);
                });
                gearStackMiddle.bodies.forEach(function(element, index){
                    Body.rotate(element, -0.1);
                });
                gearStackBottom.bodies.forEach(function(element, index){
                    Body.rotate(element, 0.1);
                });
            })
        );

        _sceneEvents.push(
            Events.on(_engine, 'collisionStart', function(event) {

                var objectId;
                var otherObjectId;
                var pairs = event.pairs;
                for (var i = 0; i < pairs.length; i++) {
                    var pair = pairs[i];
                    
                    if (pair.bodyA.id > 82) {
                        objectId = pair.bodyA.id;
                        otherObjectId = pair.bodyB.id;
                    } else {
                        objectId = pair.bodyB.id;
                        otherObjectId = pair.bodyA.id;
                    }

                    switch(otherObjectId) {
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                            var myObject = Composite.get(_world, objectId, 'body');
                            switch(myObject.isGood) {
                                case true:
                                    score--;
                                    scoreTally.innerHTML = score;
                                    break;
                            }
                            Composite.remove(_world, myObject);
                            break;
                        default:
                            switch(objectId) {
                                case 87:
                                    var myObject = Composite.get(_world, otherObjectId, 'body');
                                    switch(myObject.isGood) {
                                        case true:
                                            score++;
                                            scoreTally.innerHTML = score;
                                            break;
                                        case false:
                                            score-=2;
                                            defectiveCount++;
                                            scoreTally.innerHTML = score;
                                            if (defectiveCount === 5) {
                                                World.clear(_world);
                                                Engine.clear(_engine);
                                                clearInterval(gameInterval);
                                                var displayBox = document.getElementById('conveyorGame_display');
                                                displayBox.innerHTML = "";
                                                displayBox.style.display = 'block';
                                                var h2 = document.createElement('h2');
                                                var h2_2 = document.createElement('h2');
                                                var text = document.createTextNode("GAME OVER");
                                                var text2 = document.createTextNode("Score: " + score);
                                                h2.appendChild(text);
                                                h2_2.appendChild(text2);
                                                displayBox.appendChild(h2);
                                                displayBox.appendChild(h2_2);
                                                return;
                                            }
                                            break;
                                    }
                                    Composite.remove(_world, myObject);
                                    break;
                                default:
                                    var myObject = Composite.get(_world, objectId, 'body');
                                    if (myObject.position.y < 320) {
                                        Body.applyForce(myObject, {x:0, y:0}, {x:.01, y:0});
                                    } else if (myObject.position.y > 320 && myObject.position.y < 480) {
                                        Body.applyForce(myObject, {x:1200, y:0}, {x:-.01, y:0});
                                    } else if (myObject.position.y > 480 && myObject.position.y < 590) {
                                        Body.applyForce(myObject, {x:0, y:0}, {x:.01, y:0});
                                    } else if (myObject.position.y > 590) {
                                        Body.applyForce(myObject, {x:0, y:0}, {x:0, y:0.1});
                                    }
                                    break;
                            }
                            break;
                    }
                }
            })      
        );
    };

    // the functions for the demo interface and controls below

    Demo.initControls = function() {
        var demoReset = document.getElementById('demo-reset');

        // create a Matter.Gui
        if (!_isMobile && Gui) {
            _gui = Gui.create(_engine);

            // need to add mouse constraint back in after gui clear or load is pressed
            Events.on(_gui, 'clear load', function() {
                _mouseConstraint = MouseConstraint.create(_engine);
                World.add(_engine.world, _mouseConstraint);
            });
        }

        // create a Matter.Inspector
        if (!_isMobile && Inspector && _useInspector) {
            _inspector = Inspector.create(_engine);

            Events.on(_inspector, 'import', function() {
                _mouseConstraint = MouseConstraint.create(_engine);
                World.add(_engine.world, _mouseConstraint);
            });

            Events.on(_inspector, 'play', function() {
                _mouseConstraint = MouseConstraint.create(_engine);
                World.add(_engine.world, _mouseConstraint);
            });

            Events.on(_inspector, 'selectStart', function() {
                _mouseConstraint.constraint.render.visible = false;
            });

            Events.on(_inspector, 'selectEnd', function() {
                _mouseConstraint.constraint.render.visible = true;
            });
        }

        // go fullscreen when using a mobile device
        if (_isMobile) {
            var body = document.body;

            body.className += ' is-mobile';
            _engine.render.canvas.addEventListener('touchstart', Demo.fullscreen);

            var fullscreenChange = function() {
                var fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled;

                // delay fullscreen styles until fullscreen has finished changing
                setTimeout(function() {
                    if (fullscreenEnabled) {
                        body.className += ' is-fullscreen';
                    } else {
                        body.className = body.className.replace('is-fullscreen', '');
                    }
                }, 2000);
            };

            document.addEventListener('webkitfullscreenchange', fullscreenChange);
            document.addEventListener('mozfullscreenchange', fullscreenChange);
            document.addEventListener('fullscreenchange', fullscreenChange);
        }
        
        demoReset.addEventListener('click', function(e) {
            location.reload();
        });
    };

    Demo.fullscreen = function(){
        var _fullscreenElement = _engine.render.canvas;
        
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
            if (_fullscreenElement.requestFullscreen) {
                _fullscreenElement.requestFullscreen();
            } else if (_fullscreenElement.mozRequestFullScreen) {
                _fullscreenElement.mozRequestFullScreen();
            } else if (_fullscreenElement.webkitRequestFullscreen) {
                _fullscreenElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        }
    };
    
    Demo.reset = function() {
        var _world = _engine.world;
        
        World.clear(_world);
        Engine.clear(_engine);

        // clear scene graph (if defined in controller)
        var renderController = _engine.render.controller;
        if (renderController.clear)
            renderController.clear(_engine.render);

        // clear all scene events
        for (var i = 0; i < _sceneEvents.length; i++)
            Events.off(_engine, _sceneEvents[i]);

        if (_mouseConstraint.events) {
            for (i = 0; i < _sceneEvents.length; i++)
                Events.off(_mouseConstraint, _sceneEvents[i]);
        }

        if (_world.events) {
            for (i = 0; i < _sceneEvents.length; i++)
                Events.off(_world, _sceneEvents[i]);
        }

        _sceneEvents = [];

        // reset id pool
        Common._nextId = 0;

        // reset random seed
        Common._seed = 0;

        // reset mouse offset and scale (only required for Demo.views)
        Mouse.setScale(_mouseConstraint.mouse, { x: 1, y: 1 });
        Mouse.setOffset(_mouseConstraint.mouse, { x: 0, y: 0 });

        _engine.enableSleeping = false;
        _engine.world.gravity.y = 1;
        _engine.world.gravity.x = 0;
        _engine.timing.timeScale = 1;

        World.add(_world, [
            Bodies.rectangle(600, -25, 1200, 50, { isStatic: true }),
            Bodies.rectangle(600, 825, 1200, 50, { isStatic: true }),
            Bodies.rectangle(-25, 400, 50, 1000, { isStatic: true }),
            Bodies.rectangle(1225, 400, 50, 1000, { isStatic: true })
        ]);

        _mouseConstraint = MouseConstraint.create(_engine);
        World.add(_world, _mouseConstraint);
        
        var renderOptions = _engine.render.options;
        renderOptions.wireframes = false;
        renderOptions.hasBounds = false;
        renderOptions.showDebug = false;
        renderOptions.showBroadphase = false;
        renderOptions.showBounds = false;
        renderOptions.showVelocity = false;
        renderOptions.showCollisions = false;
        renderOptions.showAxes = false;
        renderOptions.showPositions = false;
        renderOptions.showAngleIndicator = false;
        renderOptions.showIds = false;
        renderOptions.showShadows = false;
        // renderOptions.background = './img/factoryBG.jpg';
        renderOptions.background = '#FFF';

        if (_isMobile)
            renderOptions.showDebug = true;
    };
})();