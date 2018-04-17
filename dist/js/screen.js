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

			console.log(this.currentScreen);
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

function log() {
	console.log("work plz");
}

var MainScreen = function (_Screen) {
	_inherits(MainScreen, _Screen);

	function MainScreen() {
		_classCallCheck(this, MainScreen);

		var _this = _possibleConstructorReturn(this, (MainScreen.__proto__ || Object.getPrototypeOf(MainScreen)).call(this));

		_this.display = document.querySelector('.template').content.querySelector('.mainScreen').cloneNode(true);
		_this.button = _this.display.querySelector('button');

		return _this;
	}

	_createClass(MainScreen, [{
		key: 'enter',
		value: function enter(exitCallback) {

			this.exitCallback = exitCallback;

			console.log(this.button);
			this.button.addEventListener('click', this.navigate.bind(this));
		}
	}, {
		key: 'navigate',
		value: function navigate(e) {
			console.log("yeah");
			this.exitCallback(secondScreen);
		}
	}]);

	return MainScreen;
}(Screen);

var mainScreen = new MainScreen();

var SecondScreen = function (_Screen2) {
	_inherits(SecondScreen, _Screen2);

	function SecondScreen() {
		_classCallCheck(this, SecondScreen);

		var _this2 = _possibleConstructorReturn(this, (SecondScreen.__proto__ || Object.getPrototypeOf(SecondScreen)).call(this));

		_this2.display = document.querySelector('.template').content.querySelector('.secondScreen').cloneNode(true);
		return _this2;
	}

	_createClass(SecondScreen, [{
		key: 'enter',
		value: function enter(exitCallback) {

			this.exitCallback = exitCallback;
		}
	}]);

	return SecondScreen;
}(Screen);

var secondScreen = new SecondScreen();

var mainContaint = document.querySelector(".app");
var AppScreens = new ScreenSystem(mainContaint);

AppScreens.setScreen(mainScreen);