"use strict";

console.log("blah");
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*var screens = document.querySelectorAll(".screen")

screens.forEach.call( screens, (screen) => {
	console.log(screen);
	screen.style.display = "none";
});
*/

var ScreenSystem = function () {
	function ScreenSystem(container) {
		_classCallCheck(this, ScreenSystem);

		this.container = container;

		this.currentScreen = null;
	}

	_createClass(ScreenSystem, [{
		key: 'setScreen',
		value: function setScreen(nextScreen) {

			this.previousScreen = this.currentScreen;
			this.currentScreen = nextScreen;

			if (this.previousScreen) {
				this.removeScreen(this.previousScreen.display);
			}

			this.container.appendChild(this.currentScreen.display);
			this.currentScreen.enter(this.setScreen.bind(this));
		}
	}, {
		key: 'removeScreen',
		value: function removeScreen(previousScreen) {
			this.container.removeChild(previousScreen);
		}
	}]);

	return ScreenSystem;
}();

var Screen = function () {
	function Screen() {
		_classCallCheck(this, Screen);

		this.display = null;
	}

	_createClass(Screen, [{
		key: 'enter',
		value: function enter() {}
	}, {
		key: 'exit',
		value: function exit() {}
	}, {
		key: 'update',
		value: function update() {}
	}]);

	return Screen;
}();

var IntroScreen = function (_Screen) {
	_inherits(IntroScreen, _Screen);

	function IntroScreen() {
		_classCallCheck(this, IntroScreen);

		var _this = _possibleConstructorReturn(this, (IntroScreen.__proto__ || Object.getPrototypeOf(IntroScreen)).call(this));

		_this.display = document.querySelector('.template').content.querySelector('.introScreen').cloneNode(true);
		_this.button = _this.display.querySelector('.playButton');

		return _this;
	}

	_createClass(IntroScreen, [{
		key: 'enter',
		value: function enter(exitCallback) {

			this.exitCallback = exitCallback;
			this.button.addEventListener('click', this.navigate.bind(this));
		}
	}, {
		key: 'navigate',
		value: function navigate(e) {
			this.exitCallback(characterScreen);
		}
	}]);

	return IntroScreen;
}(Screen);

var introScreen = new IntroScreen();

var CharacterScreen = function (_Screen2) {
	_inherits(CharacterScreen, _Screen2);

	function CharacterScreen() {
		_classCallCheck(this, CharacterScreen);

		var _this2 = _possibleConstructorReturn(this, (CharacterScreen.__proto__ || Object.getPrototypeOf(CharacterScreen)).call(this));

		_this2.display = document.querySelector('.template').content.querySelector('.characterScreen').cloneNode(true);
		_this2.button = _this2.display.querySelector('.playButton');

		return _this2;
	}

	_createClass(CharacterScreen, [{
		key: 'enter',
		value: function enter(exitCallback) {

			this.exitCallback = exitCallback;
			this.button.addEventListener('click', this.navigate.bind(this));
		}
	}, {
		key: 'navigate',
		value: function navigate(e) {
			this.exitCallback(gameScreen);
		}
	}]);

	return CharacterScreen;
}(Screen);

var characterScreen = new CharacterScreen();

var GameScreen = function (_Screen3) {
	_inherits(GameScreen, _Screen3);

	function GameScreen() {
		_classCallCheck(this, GameScreen);

		var _this3 = _possibleConstructorReturn(this, (GameScreen.__proto__ || Object.getPrototypeOf(GameScreen)).call(this));

		_this3.display = document.querySelector('.template').content.querySelector('.gameScreen').cloneNode(true);
		return _this3;
	}

	_createClass(GameScreen, [{
		key: 'enter',
		value: function enter(exitCallback) {

			this.exitCallback = exitCallback;
		}
	}]);

	return GameScreen;
}(Screen);

var gameScreen = new GameScreen();

var mainContaint = document.querySelector(".app");
console.log(mainContaint);
var AppScreens = new ScreenSystem(mainContaint);

AppScreens.setScreen(introScreen);