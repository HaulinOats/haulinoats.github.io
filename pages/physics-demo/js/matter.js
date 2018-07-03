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
        _isMobile = /(ipad|iphone|ipod|android)/gi.test(navigator.userAgent);
    
    // initialise the demo

    Demo.init = function() {
        var container = document.getElementById('canvas-container');

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
        _sceneName = 'portfolio';
        
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
    
    Demo.portfolio = function() {
        var _world = _engine.world,
            boxLink = document.getElementById('boxLink');
        
        Demo.reset();

        //pointer arrow
        World.add(_world, Bodies.circle(530, 130, 0, { isStatic: true, render: { sprite: { texture: './img/pointer-arrow.png', xScale: .5, yScale:.5 }}}));
        World.add(_world, Bodies.circle(230, 420, 0, { isStatic: true, angle: Math.PI * -1, render: { sprite: { texture: './img/pointer-arrow.png', xScale: .5, yScale:.5}}}));

        //'throw object here' and 'place text here' pngs
        World.add(_world, Bodies.circle(400, 110, 0, {isStatic: true, render: { sprite: { texture: './img/throw-text.png' }}}));
        World.add(_world, Bodies.circle(350, 440, 0, {isStatic: true, render: { sprite: { texture: './img/place-text.png' }}}));
        World.add(_world, Bodies.circle(220, 220, 0, {isStatic: true, render: { sprite: { texture: './img/bubble.png' }}}));
        
        //images/links for box placement event
        var boxImage = Bodies.circle(220, 210, 0, {isStatic: true});
        World.add(_world, boxImage);

        //block
        var block = Bodies.rectangle(150, 50, 50, 50, { friction: 0.001, restitution: 0.8,  density: 0.001, chambfer:1, changeCount:0, render: { sprite: { texture: "./img/brett.jpg" } } });
        World.add(_world, block);

        //create lines for funnel/machine/gears
        World.add(_world, Bodies.rectangle(500, 205, 5, 80, { isStatic: true, angle: Math.PI * -0.25 }));
        World.add(_world, Bodies.rectangle(640, 205, 5, 80, { isStatic: true, angle: Math.PI * 0.25 }));
        World.add(_world, Bodies.rectangle(470, 320, 5, 200, { isStatic: true }));
        World.add(_world, Bodies.rectangle(670, 320, 5, 200, { isStatic: true }));
        World.add(_world, Bodies.rectangle(505, 400, 69, 1, { isStatic: true, angle: Math.PI * 0.1 }));
        World.add(_world, Bodies.rectangle(635, 400, 69, 1, { isStatic: true, angle: Math.PI * -0.1 }));
        var gears = [];
        gears.push(Bodies.polygon(495, 270, 5, 25, { isStatic: true, angle: 0, render: { sprite: { texture: './img/gear-small-black.png'}}}));
        gears.push(Bodies.polygon(500, 370, 5, 25, { isStatic: true, angle: 0, render: { sprite: { texture: './img/gear-small-black.png'}}}));
        gears.push(Bodies.polygon(635, 370, 5, 25, { isStatic: true, angle: 0, render: { sprite: { texture: './img/gear-small-black.png'}}}));
        gears.push(Bodies.polygon(645, 270, 5, 25, { isStatic: true, angle: 0, render: { sprite: { texture: './img/gear-small-black.png'}}}));
        World.add(_world, gears);
            
        //machine graphic placement
        World.add(_world, Bodies.circle(570, 300, 0, { isStatic: true, render: { sprite: { texture: './img/machine.png'}}})); 

        //drop box bounds
        World.add(_world, Bodies.rectangle(107, 370, 5, 90, { isStatic: true }));
        World.add(_world, Bodies.rectangle(193, 370, 5, 90, { isStatic: true }));
        World.add(_world, Bodies.rectangle(150, 415, 85, 5, { isStatic: true }));

        //Link area
        World.add(_world, Bodies.rectangle(180, 530, 300, 75, { isStatic: true, render : { sprite: { texture: "./img/link-box.png", xScale: .87, yScale: .5}}}));

        //drop box image
        World.add(_world, Bodies.circle(150, 370, 0, { isStatic: true, render: { sprite: { texture: './img/placement-box.png' }}}));

        var machineIsTouching = false;
        var boxIsTouching = false;

        _sceneEvents.push(
            Events.on(_engine, 'afterRender', function(event) {
                var mouse = _mouseConstraint.mouse,
                    context = _engine.render.context,
                    bodies = Composite.allBodies(_world),
                    machineEventArea = { startPoint: { x: 560, y: 250 }, endPoint: { x: 580, y: 250} },
                    boxEventArea = { startPoint: { x: 125, y: 400 }, endPoint: { x: 175, y: 400} },
                    machineCollisions = Query.ray(bodies, machineEventArea.startPoint, machineEventArea.endPoint),
                    boxCollisions = Query.ray(bodies, boxEventArea.startPoint, boxEventArea.endPoint);
                
                context.beginPath();
                context.moveTo(machineEventArea.startPoint.x, machineEventArea.startPoint.y);
                context.lineTo(machineEventArea.endPoint.x, machineEventArea.endPoint.y);

                context.beginPath();
                context.moveTo(boxEventArea.startPoint.x, boxEventArea.startPoint.y);
                context.lineTo(boxEventArea.endPoint.x, boxEventArea.endPoint.y);

                gears.forEach(function(element, index) {
                    Body.rotate(element, 0.1);
                })

                if (machineCollisions.length > 0) {
                    if (!machineIsTouching) {
                        switch(block.changeCount) {
                            case 0:
                                block.render.sprite.texture = "./img/twitter.png";
                                block.changeCount = 1;
                                break;
                            case 1:
                                block.render.sprite.texture = "./img/fb.jpg";
                                block.changeCount = 2;
                                break;
                            case 2:
                                block.render.sprite.texture = "./img/youtube-icon.png";
                                block.changeCount = 3;
                                break;
                            case 3:
                                block.render.sprite.texture = "./img/brett.jpg";
                                block.changeCount = 0;
                                break;
                        }
                        machineIsTouching = true;
                    }
                } else {
                    if (machineIsTouching) {
                        machineIsTouching = false;
                    }
                }

                if (boxCollisions.length > 0) {
                    if (!boxIsTouching) {
                        if (block.isSleeping) {
                            switch(block.changeCount) {
                                case 0:
                                    boxImage.render.sprite.texture = './img/bdc-event.svg';
                                    boxImage.render.sprite.xScale = 0.5;
                                    boxImage.render.sprite.yScale = 0.5;
                                    boxLink.setAttribute('href', "http://www.BrettDavidConnolly.com");
                                    boxLink.innerHTML = "http://www.BrettDavidConnolly.com";
                                    break;
                                case 1:
                                    boxImage.render.sprite.texture = './img/twitter-event.svg';
                                    boxImage.render.sprite.xScale = 0.5;
                                    boxImage.render.sprite.yScale = 0.5;
                                    boxLink.setAttribute('href', "http://www.twitter.com/brettdconnolly");
                                    boxLink.innerHTML = "www.twitter.com/brettdconnolly";
                                    break;
                                case 2:
                                    boxImage.render.sprite.texture = './img/fb-event.svg';
                                    boxImage.render.sprite.xScale = 0.3;
                                    boxImage.render.sprite.yScale = 0.3;
                                    boxLink.setAttribute('href', "http://www.facebook.com/brett84c");
                                    boxLink.innerHTML = "www.facebook.com/brett84c";
                                    break;
                                case 3:
                                    boxImage.render.sprite.texture = './img/youtube-event.svg';
                                    boxImage.render.sprite.xScale = 0.1;
                                    boxImage.render.sprite.yScale = 0.1;
                                    boxLink.setAttribute('href', "http://www.youtube.com/brett84c");
                                    boxLink.innerHTML = "www.youtube.com/brett84c";
                                    break;
                            }
                            boxIsTouching = true;
                        }
                    }
                } else {
                    if (boxIsTouching) {
                        boxIsTouching = false;
                    }
                }
            })
        );
    
        var renderOptions = _engine.render.options;
        _engine.enableSleeping = true;
        renderOptions.showSleeping = false;
        renderOptions.wireframes = false;
        renderOptions.background = './img/grid.png';
        renderOptions.showAngleIndicator = false;
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
            Demo['portfolio']();
            Gui.update(_gui);
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

        var offset = 5;
        World.add(_world, [
            Bodies.rectangle(400, -offset, 800.5 + 2 * offset, 50.5, { isStatic: true }),
            Bodies.rectangle(400, 600 + offset, 800.5 + 2 * offset, 50.5, { isStatic: true }),
            Bodies.rectangle(800 + offset, 300, 50.5, 600.5 + 2 * offset, { isStatic: true }),
            Bodies.rectangle(-offset, 300, 50.5, 600.5 + 2 * offset, { isStatic: true })
        ]);

        _mouseConstraint = MouseConstraint.create(_engine);
        World.add(_world, _mouseConstraint);
        
        var renderOptions = _engine.render.options;
        renderOptions.wireframes = true;
        renderOptions.hasBounds = false;
        renderOptions.showDebug = false;
        renderOptions.showBroadphase = false;
        renderOptions.showBounds = false;
        renderOptions.showVelocity = false;
        renderOptions.showCollisions = false;
        renderOptions.showAxes = false;
        renderOptions.showPositions = false;
        renderOptions.showAngleIndicator = true;
        renderOptions.showIds = false;
        renderOptions.showShadows = false;
        renderOptions.background = '#fff';

        if (_isMobile)
            renderOptions.showDebug = true;
    };

})();