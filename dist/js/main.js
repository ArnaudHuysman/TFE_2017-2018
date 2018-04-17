'use strict';

var Colors = {
  orange: 0xE53D00,
  yellow: 0xFFE900,
  white: 0xFCFFF7,
  blue: 0x21A0A0,
  blueDark: 0x046865
};

var Player = {
  isRightClick: false,
  isLeftClick: false,
  targetPos: { x: 0, y: 0 }
};

var Game = {
  collidableMesh: [],
  enemies: []
};

window.addEventListener('load', init, false);

/*---------------------------------------------------------------
                           CAMERA
-----------------------------------------------------------------*/

var scene, scene2, camera, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH, renderer, container, raycaster, plane, intersectPoint;

function createScene() {

  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  scene = new THREE.Scene();
  //scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 30;
  nearPlane = 1;
  farPlane = 10000;

  camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

  camera.position.z = 600;
  camera.position.y = -600;

  //camera.rotation.x = -0.85;

  camera.lookAt(new THREE.Vector3(0, 0, 0));

  plane = new THREE.Plane(new THREE.Vector3(1, 0, 0), 10);
  intersectPoint = new THREE.Vector3();

  renderer = new THREE.WebGLRenderer({
    alpha: true,

    antialias: true
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(WIDTH, HEIGHT);

  renderer.shadowMap.enabled = true;

  raycaster = new THREE.Raycaster();

  container = document.getElementById('world');
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', handleWindowResize, false);
}

function handleWindowResize() {
  // update height and width of the renderer and the camera
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
}

/*---------------------------------------------------------------
                           LIGHT
-----------------------------------------------------------------*/

var hemisphereLight, shadowLight;

function createLights() {
  /*hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9);
    shadowLight = new THREE.DirectionalLight(0xffffff, .9);
    shadowLight.position.set(150,350,350);
  */
  var light = new THREE.PointLight(0xffffff);
  light.position.set(0, -600, 600);
  scene.add(light);

  //scene.add(hemisphereLight);
  //scene.add(shadowLight);
}

/*---------------------------------------------------------------
                           OBJECT
-----------------------------------------------------------------*/

var direction = null;

function handleKeyBoardDown(e) {
  switch (e.keyCode) {
    case 37:
      e.preventDefault();
      direction = "left";
      break;
    case 38:
      e.preventDefault();

      direction = "up";

      break;
    case 39:
      e.preventDefault();

      direction = "right";

      break;
    case 40:
      e.preventDefault();

      direction = "down";

      break;
  }
}

function handleKeyBoardUp(e) {
  //direction = null;
}

var mousePos = new THREE.Vector2(0, 0);

var mouseProjectPos = new THREE.Vector3(0, 0, 0);

var rightClick = {
  x: 0,
  z: 0
};

function handleMouseMove(event) {
  var tx = -1 + event.clientX / WIDTH * 2;
  var ty = 1 - event.clientY / HEIGHT * 2;
  mousePos = { x: tx, y: ty };

  mouseProjectPos = toWorldPosition(event, mousePos);
}

function toScreenPosition(obj, camera) {
  var vector = new THREE.Vector3();

  var widthHalf = 0.5 * renderer.context.canvas.width;
  var heightHalf = 0.5 * renderer.context.canvas.height;

  obj.updateMatrixWorld();
  vector.setFromMatrixPosition(obj.matrixWorld);
  vector.project(camera);

  vector.x = vector.x * widthHalf + widthHalf;
  vector.y = -(vector.y * heightHalf) + heightHalf;

  return {
    x: vector.x,
    y: vector.y
  };
};

function toWorldPosition(event, mouse) {
  var vector = new THREE.Vector3();

  vector.set(mouse.x, mouse.y, 0.5);

  vector.unproject(camera);

  var dir = vector.sub(camera.position).normalize();
  var distance = -(camera.position.z - 50) / dir.z;
  var pos = camera.position.clone().add(dir.multiplyScalar(distance));
  return pos;
}

function onDocumentMouseDown(event) {

  event.preventDefault();

  raycaster.setFromCamera(mousePos, camera);

  var intersects = raycaster.intersectObjects(mapTiles);

  if (intersects.length > 0) {

    Player.targetPos.x = intersects[0].point.x;
    Player.targetPos.y = intersects[0].point.y;
  }
}

function onRightClick(event) {

  event.preventDefault();

  raycaster.setFromCamera(mousePos, camera);

  var intersects = raycaster.intersectObjects(mapTiles);

  if (intersects.length > 0) {

    rightClick.x = intersects[0].point.x;
    rightClick.y = intersects[0].point.y;
  }

  char.bulletFactory.create();
}

/*function hitTest(){

  var ennemi = blobl;
  var boxEnnemi = new THREE.Box3().setFromObject(ennemi.mesh);

  for (var i = 0; i < Game.collidableMesh.length; i++) {

    var bullet = Game.collidableMesh[i];
    var boxBullet = new THREE.Box3().setFromObject(bullet.mesh);

    var collision = boxEnnemi.intersectsBox(boxBullet);
    
    if (collision) console.log(collision);
    
  }

}*/

var enemiesCollision;

function init() {
  //document.addEventListener('keydown', handleKeyBoardDown, false);
  //document.addEventListener('keyup', handleKeyBoardUp, false);
  document.addEventListener('mousemove', handleMouseMove, false);

  document.body.addEventListener('mousedown', function (e) {

    if (e.button === 0) {
      Player.isLeftClick = true;
      onDocumentMouseDown(e);
    } else if (e.button === 2) {
      Player.isRightClick = true;
      onRightClick(e);
    }
  }, false);

  document.body.addEventListener('mouseup', function (e) {
    if (e.button === 0) {
      Player.isLeftClick = false;
    } else if (e.button === 2) {
      Player.isRightClick = false;
    }
  }, false);

  document.addEventListener('contextmenu', function (event) {
    return event.preventDefault();
  });

  createScene();
  createLights();

  createBoardGame();
  createCharacter();
  //createDrilling();

  enemiesCollision = new CollisionEngine();

  setTimeout(function () {
    enemiesSpawn();
  }, 2000);

  loop();
}

var deltaTime,
    mvtTime = 0,
    newTime = Date.now(),
    oldTime = Date.now();

var score = 0;

function loop() {

  deltaTime = newTime - oldTime;
  oldTime = newTime;
  newTime = Date.now();

  mvtTime += deltaTime;

  animateCharacter(char.body);

  enemiesCollision.testCollision();

  char.bulletFactory.update();
  for (var i = 0; i < Game.enemies.length; i++) {
    Game.enemies[i].update();
  }

  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bullet = function () {
  function Bullet(width, height, depth, color) {
    _classCallCheck(this, Bullet);

    this.geom = new THREE.BoxGeometry(width, height, depth, 1, 1, 1);
    this.mat = new THREE.MeshPhongMaterial({ color: color, flatShading: true });

    this.mesh = new THREE.Mesh(this.geom, this.mat);

    this.mvt = {
      x: 0,
      z: 0
    };
  }

  _createClass(Bullet, [{
    key: "update",
    value: function update() {
      this.mesh.position.x += this.mvt.x * 5;
      this.mesh.position.y += this.mvt.y * 5;
    }
  }]);

  return Bullet;
}();

var BulletFactory = function () {
  function BulletFactory() {
    _classCallCheck(this, BulletFactory);

    this.bullets = [];
  }

  _createClass(BulletFactory, [{
    key: "create",
    value: function create() {

      var bullet = new Bullet(2, 2, 2, 0xffffff);
      bullet.mesh.position.z = 12;
      bullet.mesh.position.x = char.mesh.position.x;
      bullet.mesh.position.y = char.mesh.position.y;
      var diffX = rightClick.x - bullet.mesh.position.x;
      var diffY = rightClick.y - bullet.mesh.position.y;

      var theta = Math.atan2(diffY, diffX);

      bullet.mvt.x = Math.cos(theta);

      bullet.mvt.y = Math.sin(theta);

      scene.add(bullet.mesh);
      Game.collidableMesh.push(bullet);
      this.bullets.push(bullet);
    }
  }, {
    key: "update",
    value: function update() {
      for (var i = 0; i < this.bullets.length; i++) {
        this.bullets[i].update();
      }
    }
  }]);

  return BulletFactory;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CharColors = {
    mainColor: 0x0a2444,
    outlinerColor: 0xd90368
};

var speedRot = 0.03;

var Bodypart = function Bodypart(width, height, depth, color, name) {
    _classCallCheck(this, Bodypart);

    this.object = new THREE.Object3D();

    this.geom = new THREE.BoxGeometry(width, depth, height, 1, 1, 1);
    this.mat = new THREE.MeshPhongMaterial({ color: color, flatShading: true });

    this.mesh = new THREE.Mesh(this.geom, this.mat);
    //this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;

    this.outlinerMat = new THREE.MeshBasicMaterial({ color: CharColors.outlinerColor, side: THREE.BackSide });
    this.outliner = new THREE.Mesh(this.geom, this.outlinerMat);

    this.outliner.scale.multiplyScalar(1.1);

    this.object.add(this.mesh);
    this.object.add(this.outliner);

    this.name = name;
};

var Leg = function (_Bodypart) {
    _inherits(Leg, _Bodypart);

    function Leg(width, height, depth, color, name) {
        _classCallCheck(this, Leg);

        var _this = _possibleConstructorReturn(this, (Leg.__proto__ || Object.getPrototypeOf(Leg)).call(this, width, height, depth, color, name));

        _this.mesh.geometry.translate(0, 0, -1);
        _this.mesh.position.z = -2;
        _this.outliner.position.z = 2.7;
        _this.mesh.position.x = _this.name == "leftLeg" ? -0.9 : 0.9;

        _this.outliner.position.set(_this.mesh.position.x, _this.mesh.position.y, _this.mesh.position.z);

        _this.mvt = _this.name == "leftLeg" ? "backward" : "forward";
        _this.rot = _this.name == "leftLeg" ? -speedRot : speedRot;

        return _this;
    }

    _createClass(Leg, [{
        key: "move",
        value: function move() {

            if (this.object.rotation.x > 0.3 && this.mvt == "forward") {
                this.rot = -speedRot;
                this.mvt = "backward";
            } else if (this.object.rotation.x < -0.3 && this.mvt == "backward") {
                this.rot = speedRot;
                this.mvt = "forward";
            }

            this.object.rotation.x += this.rot;
        }
    }]);

    return Leg;
}(Bodypart);

var Arm = function (_Bodypart2) {
    _inherits(Arm, _Bodypart2);

    function Arm(width, height, depth, color, name) {
        _classCallCheck(this, Arm);

        var _this2 = _possibleConstructorReturn(this, (Arm.__proto__ || Object.getPrototypeOf(Arm)).call(this, width, height, depth, color, name));

        _this2.mesh.geometry.translate(0, 0, -1.2);
        _this2.mesh.position.z = 0.6;
        _this2.mesh.position.x = _this2.name == "leftArm" ? -2.4 : 2.4;

        _this2.outliner.position.set(_this2.mesh.position.x, _this2.mesh.position.y, _this2.mesh.position.z);

        _this2.mvt = _this2.name == "rightArm" ? "backward" : "forward";
        _this2.rot = _this2.name == "rightArm" ? -speedRot : speedRot;

        return _this2;
    }

    _createClass(Arm, [{
        key: "move",
        value: function move() {

            if (this.object.rotation.x > 0.3 && this.mvt == "forward") {
                this.rot = -speedRot;

                this.mvt = "backward";
            } else if (this.object.rotation.x < -0.3 && this.mvt == "backward") {
                this.rot = speedRot;
                this.mvt = "forward";
            }

            this.object.rotation.x += this.rot;
        }
    }]);

    return Arm;
}(Bodypart);

var Head = function (_Bodypart3) {
    _inherits(Head, _Bodypart3);

    function Head(width, height, depth, color, name) {
        _classCallCheck(this, Head);

        var _this3 = _possibleConstructorReturn(this, (Head.__proto__ || Object.getPrototypeOf(Head)).call(this, width, height, depth, color, name));

        _this3.mesh.position.z = 4.0;

        _this3.outliner.position.set(_this3.mesh.position.x, _this3.mesh.position.y, _this3.mesh.position.z);
        _this3.rightEye = new Bodypart(0.8, 0.8, 0.8, 0xFFFFFF, "rightEye");
        _this3.rightEye.mesh.position.x += 1;
        _this3.rightEye.mesh.position.y -= 2.3;
        _this3.rightEye.mesh.position.z += 0.8;

        _this3.mesh.add(_this3.rightEye.mesh);

        _this3.leftEye = new Bodypart(0.8, 0.8, 0.8, 0xFFFFFFF, "leftEye");
        _this3.leftEye.mesh.position.x += -1;
        _this3.leftEye.mesh.position.y -= 2.3;
        _this3.leftEye.mesh.position.z += 0.8;

        _this3.mesh.add(_this3.leftEye.mesh);

        _this3.mvt = "up";
        _this3.headMvt = 0.025;

        return _this3;
    }

    _createClass(Head, [{
        key: "move",
        value: function move() {
            if (this.object.position.z > 4.1 && this.mvt == "up") {
                this.headMvt = -0.025;
                this.mvt = "down";
            } else if (this.object.position.z < 3.8 && this.mvt == "down") {
                this.headMvt = 0.025;
                this.mvt = "up";
            }

            this.object.position.z += this.headMvt;
        }
    }]);

    return Head;
}(Bodypart);

// Body Class

var Body = function (_Bodypart4) {
    _inherits(Body, _Bodypart4);

    function Body(width, height, depth, color, name) {
        _classCallCheck(this, Body);

        var _this4 = _possibleConstructorReturn(this, (Body.__proto__ || Object.getPrototypeOf(Body)).call(this, width, height, depth, color, name));

        _this4.mvt = false;
        _this4.movable = [];

        _this4.object.rotation.set(-Math.PI / 2, 0, 0);

        // Head
        _this4.head = new Head(4.8, 4.8, 4.8, CharColors.mainColor, "head");

        _this4.object.add(_this4.head.mesh);
        _this4.object.add(_this4.head.outliner);

        _this4.movable.push(_this4.head);

        // Legs
        _this4.leftLeg = new Leg(1.6, 1, 1.8, CharColors.mainColor, "leftLeg");
        _this4.rightLeg = new Leg(1.6, 1, 1.8, CharColors.mainColor, "rightLeg");

        _this4.object.add(_this4.leftLeg.object);
        _this4.object.add(_this4.rightLeg.object);

        _this4.movable.push(_this4.leftLeg, _this4.rightLeg);

        // Arms
        _this4.leftArm = new Arm(0.8, 2.4, 1, CharColors.mainColor, "leftArm");
        _this4.rightArm = new Arm(0.8, 2.4, 1, CharColors.mainColor, "rightArm");

        _this4.object.add(_this4.leftArm.object);
        _this4.object.add(_this4.rightArm.object);

        _this4.movable.push(_this4.leftArm, _this4.rightArm);

        return _this4;
    }

    _createClass(Body, [{
        key: "update",
        value: function update() {}
    }, {
        key: "move",
        value: function move() {

            this.head.move();

            for (var i = 0; i < this.movable.length; i++) {

                this.movable[i].move();
            }
        }
    }]);

    return Body;
}(Bodypart);

/*
* Character Class
*   - Body
*   - Name
*/

var Char = function () {
    function Char(name) {
        _classCallCheck(this, Char);

        this.mesh = new THREE.Object3D();
        this.mesh.name = "character";
        this.name = name;

        this.state = "still";
        this.mvt = "false";

        this.body = new Body(4, 4, 2.8, CharColors.mainColor);

        /* this.body.mesh.rotation.x = Math.PI/2;
         this.body.mesh.rotation.y = Math.PI/2;*/

        this.mesh.add(this.body.object);

        this.bulletFactory = new BulletFactory();
    }

    _createClass(Char, [{
        key: "move",
        value: function move() {
            this.body.move();

            if (Player.isLeftClick || this.body.mvt) {
                var diffX = Player.targetPos.x - this.mesh.position.x;
                var diffY = Player.targetPos.y - this.mesh.position.y;

                var theta = Math.atan2(diffY, diffX);

                var mvtX = Math.cos(theta);
                var mvtY = Math.sin(theta);

                this.mesh.position.x += mvtX * 1;
                this.mesh.position.y += mvtY * 1;

                if (Math.ceil(Player.targetPos.x / 10) == Math.ceil(this.mesh.position.x / 10) && Math.ceil(Player.targetPos.y / 10) == Math.ceil(this.mesh.position.y / 10)) {

                    this.body.mvt = false;
                } else {
                    this.body.mvt = true;
                }
            }

            var lookAtPoint = new THREE.Vector3(mouseProjectPos.x, mouseProjectPos.y, 12);

            this.mesh.up = new THREE.Vector3(0, 0, 1);
            this.mesh.lookAt(lookAtPoint);
        }
    }]);

    return Char;
}();

var char;

function createCharacter() {
    char = new Char();

    char.body.mesh.geometry.center();
    char.mesh.position.z = 12;

    char.mesh.scale.set(1.5, 1.5, 1.5);

    scene.add(char.mesh);
}

function animateCharacter(body) {

    char.move();
}
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Enemy = function () {
  function Enemy(width, height, depth, color, name) {
    _classCallCheck(this, Enemy);

    this.geom = new THREE.BoxGeometry(width, height, depth, 1, 1, 1);
    this.mat = new THREE.MeshPhongMaterial({ color: color, flatShading: true });

    this.mesh = new THREE.Mesh(this.geom, this.mat);
    //this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;
    this.name = name;
    this.collison = false;
    this.objectInCollision = null;
    this.mvt = true;
  }

  _createClass(Enemy, [{
    key: "update",
    value: function update() {

      if (this.collision) this.hitAction(this.objectInColllision);

      if (this.mvt) this.move();
    }
    //Animation of movement and attack

  }, {
    key: "animation",
    value: function animation() {}

    //Movement towards target

  }, {
    key: "move",
    value: function move(speed, target) {

      var diffX = 0 - this.mesh.position.x;
      var diffY = 0 - this.mesh.position.y;

      var theta = Math.atan2(diffY, diffX);

      var mvtX = Math.cos(theta);
      var mvtY = Math.sin(theta);

      this.mesh.position.x += mvtX * 1;
      this.mesh.position.y += mvtY * 1;

      if (Math.ceil(Player.targetPos.x / 10) == Math.ceil(this.mesh.position.x / 10) && Math.ceil(Player.targetPos.y / 10) == Math.ceil(this.mesh.position.y / 10)) {

        this.mvt = false;
      } else {
        this.mvt = true;
      }
    }
  }, {
    key: "hitAction",
    value: function hitAction(hitableObjects) {

      this.mvt = false;

      TweenMax.to(this.mesh.position, 1, {
        z: 50,
        repeat: 2,
        yoyo: true
      });
    }
  }]);

  return Enemy;
}();

var SimpleEnemy = function (_Enemy) {
  _inherits(SimpleEnemy, _Enemy);

  function SimpleEnemy(width, height, depth, color, name) {
    _classCallCheck(this, SimpleEnemy);

    return _possibleConstructorReturn(this, (SimpleEnemy.__proto__ || Object.getPrototypeOf(SimpleEnemy)).call(this, width, height, depth, color, name));
  }

  _createClass(SimpleEnemy, [{
    key: "animation",
    value: function animation() {}
  }]);

  return SimpleEnemy;
}(Enemy);

function removeSelf() {
  console.log("remove");
  /*scene.remove(obj.mesh);
    let index = Game.enemies.indexOf(obj);
  
    if (index >= 0)
    {
      Game.enemies.splice(index,1);
    }
    enemiesCollision.removeBody(obj);
      obj.collision = false;
    obj.objectInColllision = null;*/
}

var blobl;

function enemiesSpawn() {

  blobl = new SimpleEnemy(4, 4, 4, 0x99C24D, "blobl");
  blobl.mesh.position.x += 150;
  blobl.mesh.position.y += 150;
  blobl.mesh.position.z += 10;
  blobl.mesh.scale.set(2, 2, 2);

  scene.add(blobl.mesh);
  Game.enemies.push(blobl);
  enemiesCollision.addBody(blobl);
  //Game.collidableMesh.push(blobl.mesh);
}
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//-------------------------- Board Game -----------------------------//


var BoardGame = function BoardGame() {
  _classCallCheck(this, BoardGame);

  this.mesh = new THREE.Object3D();
  this.tileSize = 12;
  this.size = 32;
  var geom = new THREE.BoxGeometry(this.tileSize, this.tileSize, this.tileSize);

  var tampon = 0;
  var tampon2 = 0;

  for (var i = 0; i < 32; i++) {
    if (i < 16) tampon += 1;else tampon -= 1;
    for (var j = 0; j < 32; j++) {
      if (j < 16) tampon2 += 1;else tampon2 -= 1;
      for (var k = 0; k < 1 /*((tampon)*(tampon2)*1.2)/(Math.random()*16)*/; k++) {

        var c = new THREE.Mesh(geom, new THREE.MeshPhongMaterial({ color: 0x5f5f5f, flatShading: true }));
        c.position.x = i * (this.tileSize * 1.05);
        c.position.y = j * (this.tileSize * 1.05);
        c.position.z = -k * (this.tileSize * 1.05);

        c.castShadow = true;
        c.receiveShadow = true;

        this.mesh.add(c);

        mapTiles.push(c);
      }
    }
  }
};

var board,
    mapTiles = [];

function createBoardGame() {
  board = new BoardGame(Colors.blue);
  //board.mesh.rotation.y = Math.PI/4;
  board.mesh.translateX(-16 * (board.tileSize * 1.05));
  board.mesh.translateY(-16 * (board.tileSize * 1.05));

  scene.add(board.mesh);
}

// Drill on map's center

var drillingMachine;

var DrillingMachine = function DrillingMachine() {
  _classCallCheck(this, DrillingMachine);

  this.geom = new THREE.BoxGeometry(24, 24, 24, 1, 1, 1);
  this.mesh = new THREE.Mesh(this.geom, new THREE.MeshBasicMaterial({ color: 0x18206F, side: THREE.BackSide }));
};

function createDrilling() {
  drillingMachine = new DrillingMachine();
  drillingMachine.mesh.position.z += 50;
  scene.add(drillingMachine.mesh);
}
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//ElementCollisionEngine

var CollisionEngine = function () {
	function CollisionEngine() {
		_classCallCheck(this, CollisionEngine);

		this.bodies = [];
	}

	_createClass(CollisionEngine, [{
		key: "testCollision",
		value: function testCollision() {
			for (var i = 0; i < this.bodies.length; i++) {
				var target = this.bodies[i];
				var targetBox = new THREE.Box3().setFromObject(target.mesh);

				for (var j = 0; j < Game.collidableMesh.length; j++) {
					var bullet = Game.collidableMesh[j];
					var bulletBox = new THREE.Box3().setFromObject(bullet.mesh);

					var collision = targetBox.intersectsBox(bulletBox);

					if (collision) {
						this.bodies[i].collision = true;
						this.bodies[i].objectInCollision = Game.collidableMesh[j];
					}
				}
			}
		}
	}, {
		key: "addBody",
		value: function addBody(obj) {
			this.bodies.push(obj);
		}
	}, {
		key: "removeBody",
		value: function removeBody(obj) {
			var index = this.bodies.indexOf(obj);

			if (index >= 0) {
				this.bodies.splice(index, 1);
			}
		}
	}]);

	return CollisionEngine;
}();