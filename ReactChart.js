/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ui = __webpack_require__(1);

	var _ui2 = _interopRequireDefault(_ui);

	var _themeModal = __webpack_require__(2);

	var _themeModal2 = _interopRequireDefault(_themeModal);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ChartWrapper = React.createClass({
	    displayName: "ChartWrapper",
	    getInitialState: function getInitialState() {
	        return {
	            ciq: null
	        };
	    },
	    componentDidMount: function componentDidMount() {
	        var ciq = new CIQ.ChartEngine({
	            container: $$$("#chartContainer")
	        });
	        this.setState({
	            ciq: ciq
	        }, function () {
	            this.attachFeed(this.props.feed ? this.props.feed : new CIQ.QuoteFeed["Demo"]());
	            ciq.newChart(this.props.symbol ? this.props.symbol : "AAPL");
	        });
	    },
	    render: function render() {
	        return React.createElement(
	            "div",
	            null,
	            React.createElement(_ui2.default, null),
	            React.createElement(_themeModal2.default, null),
	            React.createElement(Chart, { ciq: this.state.ciq })
	        );
	    }
	});

	var ChartWrapper = React.createClass({
	    displayName: "ChartWrapper",

	    getInitialState: function getInitialState() {
	        return {
	            ciq: null
	        };
	    },
	    componentDidMount: function componentDidMount() {
	        var ciq = new CIQ.ChartEngine({
	            container: $$$("#chartContainer")
	        });
	        this.setState({
	            ciq: ciq
	        }, function () {
	            this.attachFeed(this.props.feed ? this.props.feed : new CIQ.QuoteFeed["Demo"]());
	            ciq.newChart(this.props.symbol ? this.props.symbol : "AAPL");
	        });
	    },

	    componentWillMount: function componentWillMount() {},
	    componentWillUpdate: function componentWillUpdate(nextProp, nextState) {
	        /// Catch new props here
	    },
	    render: function render() {
	        console.log("Chart Render Here");
	        return React.createElement(
	            "div",
	            null,
	            React.createElement(_ui2.default, null),
	            React.createElement(_themeModal2.default, null),
	            React.createElement("div", { id: "chartContainer", style: { width: "800px", height: "500px", position: "relative" } })
	        );
	    },
	    setPeriodicity: function setPeriodicity(period, interval) {
	        this.state.ciq.setPeriodicityV2(period, interval);
	    },
	    setChartType: function setChartType(type) {
	        if (type.aggregationEdit && this.state.ciq.layout.aggregationType != type.type || type.type == 'heikinashi') {
	            this.state.ciq.setChartType('candle');
	            this.state.ciq.setAggregationType(type.type);
	        } else {
	            this.state.ciq.setChartType(type.type);
	            this.state.ciq.setAggregationType('ohlc');
	        }
	    },
	    toggleCrosshairs: function toggleCrosshairs() {
	        var state = this.state.ciq.layout.crosshair;
	        this.state.ciq.layout.crosshair = !state;
	    },
	    changeSymbol: function changeSymbol(symbol) {
	        this.state.ciq.newChart(symbol);
	    },
	    addComparison: function addComparison(symbolComparison) {
	        function getRandomColor() {
	            var letters = '0123456789ABCDEF';
	            var color = '#';
	            for (var i = 0; i < 6; i++) {
	                color += letters[Math.floor(Math.random() * 16)];
	            }
	            return color;
	        }
	        this.state.ciq.addSeries(symbolComparison, {
	            isComparison: true,
	            color: getRandomColor(),
	            data: {
	                useDefaultQuoteFeed: true
	            }
	        });
	    },
	    attachFeed: function attachFeed(feed) {

	        this.state.ciq.attachQuoteFeed(feed);
	    }
	});

	ReactDOM.render(React.createElement(ChartWrapper, null), document.getElementById('chartHere'));

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	var UI = React.createClass({
	  displayName: "UI",

	  getInitialState: function getInitialState() {
	    return {};
	  },
	  render: function render() {
	    return React.createElement(
	      "div",
	      { className: "" },
	      React.createElement(
	        "div",
	        { id: "studySelect" },
	        React.createElement(
	          "span",
	          null,
	          "Add Study"
	        ),
	        React.createElement(
	          "div",
	          { className: "menu-hover" },
	          React.createElement(
	            "div",
	            { className: "option" },
	            React.createElement("span", null)
	          )
	        )
	      ),
	      React.createElement(
	        "div",
	        { id: "themeSelect" },
	        React.createElement(
	          "span",
	          null,
	          "Select Theme"
	        ),
	        React.createElement(
	          "div",
	          { className: "menu-hover" },
	          React.createElement(
	            "div",
	            { className: "option" },
	            React.createElement("span", null)
	          )
	        )
	      ),
	      React.createElement(
	        "button",
	        null,
	        "Select Timezone"
	      )
	    );
	  }
	});
	//ng-repeat="theme in cqNgUi.themes" ng-click="cqNgUi.handleThemeSelect(theme)"
	//ng-repeat="study in cqNgUi.studies.list | orderBy:study" ng-click="cqNgUi.launchStudyDialog(study)"
	//ng-click="cqNgUi.launchTimezoneDialog()"
	module.exports = UI;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _colorPicker = __webpack_require__(3);

	var _colorPicker2 = _interopRequireDefault(_colorPicker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var options = [{
	    section: "Candle Color",
	    class: "color",
	    swatches: [{
	        class: "colorDown",
	        color: "",
	        item: "candleDown"
	    }, {
	        class: "colorUp",
	        color: "",
	        item: "candleUp"
	    }]
	}, {
	    section: "Candle Wick",
	    class: "wick",
	    swatches: [{
	        class: "wickDown",
	        color: "",
	        item: "wickDown"
	    }, {
	        class: "wickUp",
	        color: "",
	        item: "wickUp"
	    }]
	}, {
	    section: "Candle Border",
	    class: "border",
	    swatches: [{
	        class: "borderDown",
	        color: "",
	        item: "borderDown"
	    }, {
	        class: "borderDown",
	        color: "",
	        item: "borderDown"
	    }]
	}, {
	    section: "Line/Bar Chart",
	    class: "lineBarChart",
	    swatches: [{
	        class: "lineBar",
	        color: "",
	        item: "lineBar"
	    }]
	}, {
	    section: "Mountain Color",
	    class: "mountainChart",
	    swatches: [{
	        class: "mountain",
	        color: "",
	        item: "mountain"
	    }]
	}, {
	    section: "Background",
	    class: "background",
	    swatches: [{
	        class: "chartBackground",
	        color: "",
	        item: "chartBackground"
	    }]
	}, {
	    section: "Grid Lines",
	    class: "gridLines",
	    swatches: [{
	        class: "lines",
	        color: "",
	        item: "lines"
	    }]
	}, {
	    section: "Date Dividers",
	    class: "dateDividers",
	    swatches: [{
	        class: "dividers",
	        color: "",
	        item: "dividers"
	    }]
	}, {
	    section: "Axis Text",
	    class: "axisText",
	    swatches: [{
	        class: "axis",
	        color: "",
	        item: "axis"
	    }]
	}];

	var ThemeModal = React.createClass({
	    displayName: "ThemeModal",

	    getInitialState: function getInitialState() {
	        return {
	            caller: false,
	            open: true
	        };
	    },
	    setColor: function setColor(color) {
	        console.log("color", color);
	    },
	    openDialog: function openDialog() {
	        this.setState({
	            open: true
	        });
	    },
	    closeDialog: function closeDialog() {
	        this.setState({
	            open: false
	        });
	    },
	    openColorPicker: function openColorPicker(item) {},

	    render: function render() {
	        var self = this;
	        if (!this.state.open) return React.createElement("div", null);
	        console.log("here");
	        var sections = options.map(function (section, index) {

	            var swatches = section.swatches.map(function (swatch, index) {
	                return React.createElement("div", { style: { backgroundColor: swatch.color }, className: "color-picker-swatch " + swatch.class, onClick: function onClick() {
	                        self.openColorPicker(swatch.item);
	                    } });
	            });

	            return React.createElement(
	                "div",
	                { className: section.class },
	                React.createElement(
	                    "div",
	                    { className: "theme-field-name" },
	                    section.section
	                ),
	                swatches
	            );
	        });
	        console.log("here123");
	        return React.createElement(
	            "div",
	            { id: "themeDialog" },
	            React.createElement(
	                "div",
	                { className: "content" },
	                React.createElement(
	                    "div",
	                    { className: "heading" },
	                    "Custom Theme"
	                ),
	                sections,
	                React.createElement(
	                    "div",
	                    { className: "theme-save" },
	                    React.createElement("input", { type: "text" }),
	                    React.createElement(
	                        "button",
	                        { className: "largeBtn" },
	                        "Save"
	                    ),
	                    React.createElement(
	                        "button",
	                        { className: "largeBtn" },
	                        "Close"
	                    )
	                )
	            )
	        );
	    }
	});

	module.exports = ThemeModal;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	var colorPickerColors = ["ffffff", "ffd0cf", "ffd9bb", "fff56c", "eaeba3", "d3e8ae", "adf3ec", "ccdcfa", "d9c3eb", "efefef", "eb8b87", "ffb679", "ffe252", "e2e485", "c5e093", "9de3df", "b1c9f8", "c5a6e1", "cccccc", "e36460", "ff9250", "ffcd2b", "dcdf67", "b3d987", "66cac4", "97b8f7", "b387d7", "9b9b9b", "dd3e39", "ff6a23", "faaf3a", "c9d641", "8bc176", "33b9b0", "7da6f5", "9f6ace", "656565", "b82c0b", "be501b", "e99b54", "97a030", "699158", "00a99d", "5f7cb8", "784f9a", "343434", "892008", "803512", "ab611f", "646c20", "46603a", "007e76", "3e527a", "503567", "000000", "5c1506", "401a08", "714114", "333610", "222f1d", "00544f", "1f2a3c", "281a33"];

	var ColorPicker = React.createClass({
	    displayName: "ColorPicker",

	    getInitialState: function getInitialState() {
	        return {
	            caller: false,
	            open: true
	        };
	    },
	    setColor: function setColor(color) {
	        console.log("color", color);
	    },
	    openDialog: function openDialog() {
	        this.setState({ open: true });
	    },
	    closeDialog: function closeDialog() {
	        this.setState({ open: false });
	    },
	    render: function render() {
	        var self = this;
	        var colorEls = colorPickerColors.map(function (color, index) {
	            console.log(color);
	            return React.createElement(
	                "li",
	                null,
	                React.createElement(
	                    "a",
	                    { href: "#", title: color, onClick: function onClick() {
	                            self.setColor(color);
	                        }, style: { background: "#" + color } },
	                    color
	                )
	            );
	        });

	        return React.createElement(
	            "div",
	            { id: "colorPicker", style: { 'top': 0, 'left': 0, 'display': this.state.open ? 'block' : 'none' } },
	            React.createElement(
	                "div",
	                { className: "color-picker-options" },
	                colorEls
	            )
	        );
	    }
	});

	var ThemeDialog = React.createClass({
	    displayName: "ThemeDialog",

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    render: function render() {

	        return React.createElement("div", null);
	    }
	});

	module.exports = ColorPicker;

/***/ }
/******/ ]);