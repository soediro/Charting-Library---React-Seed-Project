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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var colorPickerColors = ["ffffff", "ffd0cf", "ffd9bb", "fff56c", "eaeba3", "d3e8ae", "adf3ec", "ccdcfa", "d9c3eb", "efefef", "eb8b87", "ffb679", "ffe252", "e2e485", "c5e093", "9de3df", "b1c9f8", "c5a6e1", "cccccc", "e36460", "ff9250", "ffcd2b", "dcdf67", "b3d987", "66cac4", "97b8f7", "b387d7", "9b9b9b", "dd3e39", "ff6a23", "faaf3a", "c9d641", "8bc176", "33b9b0", "7da6f5", "9f6ace", "656565", "b82c0b", "be501b", "e99b54", "97a030", "699158", "00a99d", "5f7cb8", "784f9a", "343434", "892008", "803512", "ab611f", "646c20", "46603a", "007e76", "3e527a", "503567", "000000", "5c1506", "401a08", "714114", "333610", "222f1d", "00544f", "1f2a3c", "281a33"];

var ColorPicker = React.createClass({
    displayName: "ColorPicker",

    getInitialState: function getInitialState() {
        return {
            open: false,
            onColorPick: null,
            top: 0,
            left: 0
        };
    },
    setColor: function setColor(color) {
        if (this.state.onColorPick) {
            this.state.onColorPick(color);
        }
        this.closeDialog();
    },
    openDialog: function openDialog(top, left, callback) {
        this.setState({
            open: true,
            top: top,
            left: left,
            onColorPick: callback
        });
    },
    closeDialog: function closeDialog() {
        this.setState({
            open: false
        });
    },
    render: function render() {
        var self = this;
        var colorEls = colorPickerColors.map(function (color, index) {
            return React.createElement(
                "li",
                { key: "color" + index },
                React.createElement(
                    "a",
                    { href: "#", title: color, onClick: function onClick() {
                            self.setColor(color);
                        }, style: {
                            background: "#" + color
                        } },
                    color
                )
            );
        });

        return React.createElement(
            "div",
            { id: "colorPicker", style: {
                    'top': this.state.top,
                    'left': this.state.left,
                    'display': this.state.open ? 'block' : 'none'
                } },
            React.createElement(
                "div",
                { className: "color-picker-options" },
                React.createElement(
                    "ul",
                    null,
                    colorEls
                )
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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _UI = __webpack_require__(6);

var _UI2 = _interopRequireDefault(_UI);

var _demoFeed = __webpack_require__(7);

var _demoFeed2 = _interopRequireDefault(_demoFeed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//This just loads the feed into the CIQ engine


var ChartWrapper = function (_React$Component) {
  _inherits(ChartWrapper, _React$Component);

  function ChartWrapper(props) {
    _classCallCheck(this, ChartWrapper);

    var _this = _possibleConstructorReturn(this, (ChartWrapper.__proto__ || Object.getPrototypeOf(ChartWrapper)).call(this, props));

    _this.state = {
      ciq: null,
      feed: "Demo"
    };
    return _this;
  }

  _createClass(ChartWrapper, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var self = this;
      var ciq = new CIQ.ChartEngine({
        container: $$$("#chartContainer")
      });
      //You can add an event listener to the window,however, older browsers don't support this.
      window.addEventListener("resize", function () {
        self.updateChartContainerSize();
      });

      this.setState({
        ciq: ciq
      }, function () {
        this.state.ciq.setPeriodicityV2(1, 5);
        this.attachFeed(this.props.feed ? this.props.feed : new CIQ.QuoteFeed[this.state.feed]());
        ciq.newChart(this.props.symbol ? this.props.symbol : "AAPL");
      });
    }
  }, {
    key: "getWindowSize",
    value: function getWindowSize() {
      return {
        width: window.innerWidth,
        height: window.innerHeight
      };
    }
  }, {
    key: "updateChartContainerSize",
    value: function updateChartContainerSize() {

      var windowSize = this.getWindowSize();
      document.getElementById("chartContainer").style.width = windowSize.width + "px";
      document.getElementById("chartContainer").style.height = windowSize.height * .85 + "px";
      this.state.ciq.resizeChart();
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {}
  }, {
    key: "componentWillUpdate",
    value: function componentWillUpdate(nextProp, nextState) {
      /// Catch new props here
    }
  }, {
    key: "setPeriodicity",
    value: function setPeriodicity(period, interval) {
      this.state.ciq.setPeriodicityV2(period, interval);
    }
  }, {
    key: "setChartType",
    value: function setChartType(type) {
      if (type.aggregationEdit && this.state.ciq.layout.aggregationType != type.type || type.type == 'heikinashi') {
        this.state.ciq.setChartType('candle');
        this.state.ciq.setAggregationType(type.type);
      } else {
        this.state.ciq.setChartType(type.type);
        this.state.ciq.setAggregationType('ohlc');
      }
    }
  }, {
    key: "toggleCrosshairs",
    value: function toggleCrosshairs() {
      var state = this.state.ciq.layout.crosshair;
      this.state.ciq.layout.crosshair = !state;
    }
  }, {
    key: "changeSymbol",
    value: function changeSymbol(symbol) {
      this.state.ciq.newChart(symbol);
    }
  }, {
    key: "addComparison",
    value: function addComparison(symbolComparison) {
      function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
      this.state.ciq.addSeries(symbolComparison, {
        isComparison: false,
        color: getRandomColor(),
        data: {
          useDefaultQuoteFeed: true
        }
      });
    }
  }, {
    key: "attachFeed",
    value: function attachFeed(feed) {

      this.state.ciq.attachQuoteFeed(feed, {
        refreshInterval: 1
      });
    }
  }, {
    key: "render",
    value: function render() {
      var windowSize = this.getWindowSize();

      return React.createElement(
        "div",
        null,
        React.createElement(_UI2.default, { ciq: this.state.ciq ? this.state.ciq : null }),
        React.createElement(
          "div",
          { className: "ciq-chart-area" },
          React.createElement("div", { id: "chartContainer", className: "chartContainer" })
        ),
        React.createElement(
          "div",
          { className: "ciq-footer" },
          React.createElement(BottomUI, { ciq: this.state.ciq ? this.state.ciq : null })
        )
      );
    }
  }]);

  return ChartWrapper;
}(React.Component);

exports.default = ChartWrapper;


var rangeConfig = [{
  display: "All",
  span: "all",
  "multiplier": 1
}, {
  display: "5y",
  span: "year",
  "multiplier": 5
}, {
  display: "1y",
  span: "year",
  "multiplier": 1
}, {
  display: "YTD",
  span: "YTD",
  "multiplier": 1
}, {
  "display": "3m",
  span: "month",
  "multiplier": 3
}, {
  display: "1m",
  span: "month",
  "multiplier": 1
}, {
  display: "5d",
  span: "day",
  "multiplier": 5
}, {
  display: "1d",
  span: "day",
  "multiplier": 1
}];

var BottomUI = React.createClass({
  displayName: "BottomUI",
  getInitialState: function getInitialState() {
    return {
      ciq: null
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.ciq) {
      return this.setState({
        ciq: nextProps.ciq
      });
    }
  },
  setSpan: function setSpan(span, multiplier) {
    if (this.state.ciq) this.state.ciq.setSpan({ span: span, multiplier: multiplier });
  },
  render: function render() {
    var self = this;
    var ranges = rangeConfig.map(function (range, i) {
      return React.createElement(
        "ciq-button",
        { "class": "quick-link", key: i, onClick: function onClick() {
            self.setSpan(range.span, range.multiplier);
          } },
        range.display
      );
    });
    return React.createElement(
      "ciq-UI-Wrapper",
      null,
      React.createElement(
        "div",
        { className: "right" },
        ranges
      )
    );
  }
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	"periodicity": {
		"options": [{
			"period": 1,
			"interval": 1,
			"label": "1 Min"
		}, {
			"period": 1,
			"interval": 3,
			"label": "3 Min"
		}, {
			"period": 1,
			"interval": 5,
			"label": "5 Min"
		}, {
			"period": 1,
			"interval": 10,
			"label": "10 Min"
		}, {
			"period": 3,
			"interval": 5,
			"label": "15 Min"
		}, {
			"period": 1,
			"interval": 30,
			"label": "30 Min"
		}, {
			"period": 2,
			"interval": 30,
			"label": "1 Hour"
		}, {
			"period": 8,
			"interval": 30,
			"label": "4 Hour"
		}, {
			"period": 1,
			"interval": "day",
			"label": "1 Day"
		}, {
			"period": 2,
			"interval": "day",
			"label": "2 Day"
		}, {
			"period": 3,
			"interval": "day",
			"label": "3 Day"
		}, {
			"period": 5,
			"interval": "day",
			"label": "5 Day"
		}, {
			"period": 10,
			"interval": "day",
			"label": "10 Day"
		}, {
			"period": 20,
			"interval": "day",
			"label": "20 Day"
		}, {
			"period": 1,
			"interval": "week",
			"label": "1 Wk"
		}, {
			"period": 1,
			"interval": "month",
			"label": "1 Mon"
		}]
	},
	chartTypes: {
		types: [{
			type: 'bar',
			label: 'bar'
		}, {
			type: 'candle',
			label: 'candle'
		}, {
			type: 'colored_bar',
			label: 'colored bar'
		}, {
			type: 'hollow_candle',
			label: 'hollow candle'
		}, {
			type: 'line',
			label: 'line'
		}, {
			type: 'mountain',
			label: 'mountain'
		}, {
			type: 'volume_candle',
			label: 'volume candle'
		}, {
			type: 'heikinashi',
			label: 'Heikin-Ashi'
		}, {
			type: 'kagi',
			label: 'kagi',
			aggregationEdit: {
				title: 'Set Reversal Percentage',
				inputs: [{
					lookup: 'kagi',
					label: 'kagi'
				}]
			}
		}, {
			type: 'linebreak',
			label: 'line break',
			aggregationEdit: {
				title: 'Set Price Lines',
				inputs: [{
					lookup: 'priceLines',
					label: 'price line'
				}]
			}
		}, {
			type: 'renko',
			label: 'renko',
			aggregationEdit: {
				title: 'Set Range',
				inputs: [{
					lookup: 'renko',
					label: 'renko'
				}]
			}
		}, {
			type: 'rangebars',
			label: 'range bars',
			aggregationEdit: {
				title: 'Set Range',
				inputs: [{
					lookup: 'range',
					label: 'range'
				}]
			}
		}, {
			type: 'pandf',
			label: 'point & figure',
			aggregationEdit: {
				title: 'Set Point & Figure Parameters',
				inputs: [{
					lookup: 'pandf.box',
					label: 'box'
				}, {
					lookup: 'pandf.reversal',
					label: 'reversal'
				}]
			}
		}]
	}
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ColorPicker = __webpack_require__(0);

var _ColorPicker2 = _interopRequireDefault(_ColorPicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StudyModal = React.createClass({
  displayName: 'StudyModal',

  getInitialState: function getInitialState() {
    return {
      open: false,
      studyHelper: {},
      outputs: {},
      inputs: {},
      parameters: {}

    };
  },
  open: function open(params) {
    var studyHelper = new CIQ.Studies.DialogHelper(params);
    this.setState({
      open: true,
      studyHelper: studyHelper,
      outputs: studyHelper.outputs,
      inputs: studyHelper.inputs,
      params: studyHelper.parameters
    });
  },
  close: function close(studyHelper) {
    this.setState({
      open: false
    });
  },
  updateStudy: function updateStudy(color, params) {

    var currentInputs = {};
    var currentOutputs = {};
    var currentParams = {};
    for (var i = 0; i < this.state.inputs.length; i++) {
      currentInputs[this.state.inputs[i].name] = this.state.inputs[i].value;
    }
    for (var x = 0; x < this.state.outputs.length; x++) {
      currentOutputs[this.state.outputs[x].name] = this.state.outputs[x].color;
    }
    for (var y = 0; y < this.state.params.length; y++) {
      currentParams[this.state.params[y].name + 'Value'] = this.state.params[y].value;
      currentParams[this.state.params[y].name + 'Color'] = this.state.params[y].color;
    }

    this.state.studyHelper.updateStudy({ inputs: currentInputs, outputs: currentOutputs, parameters: currentParams });
    this.close();
  },
  createSelectInput: function createSelectInput(input) {
    var inputOptions = [];
    for (var option in input.options) {
      inputOptions.push(React.createElement(
        'option',
        { key: "option" + option },
        option
      ));
    }
    return React.createElement(
      'div',
      { key: "select" + input.heading, className: 'inputs' },
      React.createElement(
        'select',
        null,
        inputOptions
      ),
      React.createElement(
        'div',
        null,
        input.heading
      )
    );
  },
  createOtherInput: function createOtherInput(input, type) {
    return React.createElement(
      'div',
      { key: type + input.value, className: 'inputs' },
      React.createElement('input', { type: type, defaultValue: input.value }),
      React.createElement(
        'div',
        null,
        input.heading
      )
    );
  },

  openColorPicker: function openColorPicker(output, target) {
    var self = this;

    var targetBounds = target.getBoundingClientRect();

    this.refs.colorPicker.openDialog(targetBounds.top, targetBounds.left, function (color) {
      output.color = CIQ.hexToRgba('#' + color);
      self.forceUpdate();
    });
  },
  render: function render() {
    var self = this;

    if (!this.state.open || !this.state.studyHelper) return React.createElement('span', null);
    var inputs = this.state.inputs.map(function (input, index) {
      if (input.type === "select") return self.createSelectInput(input);
      return self.createOtherInput(input, input.type);
    });

    var outputs = this.state.outputs.map(function (output, index) {
      return React.createElement(
        'div',
        { key: "output" + index, className: 'outputs' },
        output.color ? React.createElement('div', { style: { "backgroundColor": output.color }, className: 'color-picker-swatch output',
          onClick: function onClick(event) {
            self.openColorPicker(output, event.target);
          } }) : React.createElement('div', null),
        React.createElement(
          'div',
          null,
          output.heading
        )
      );
    });
    var params = this.state.params.map(function (param, index) {
      React.createElement(
        'div',
        null,
        param.color ? React.createElement('div', { style: { "backgroundColor": param.color }, className: 'color-picker-swatch param',
          onClick: function onClick(event) {
            self.openColorPicker(param, event.target);
          } }) : React.createElement('div', null),
        React.createElement('input', { type: param.name === "studyOverZones" ? "checkbox" : "number" }),
        React.createElement(
          'div',
          null,
          param.heading
        )
      );
    });

    return React.createElement(
      'div',
      { id: 'studyDialog' },
      React.createElement(_ColorPicker2.default, { ref: 'colorPicker' }),
      React.createElement(
        'div',
        { className: 'content' },
        React.createElement(
          'div',
          { className: 'heading' },
          this.state.studyHelper ? this.state.studyHelper.Name : ""
        ),
        React.createElement(
          'div',
          { id: 'inputs' },
          inputs
        ),
        React.createElement(
          'div',
          { id: 'outputs' },
          outputs
        ),
        React.createElement(
          'div',
          { id: 'parameters' },
          React.createElement(
            'div',
            { className: 'parameters' },
            params
          )
        ),
        React.createElement(
          'button',
          { className: 'largeBtn', onClick: this.updateStudy },
          'Save'
        )
      )
    );
  }
});

module.exports = StudyModal;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ColorPicker = __webpack_require__(0);

var _ColorPicker2 = _interopRequireDefault(_ColorPicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ThemeModal = React.createClass({
    displayName: 'ThemeModal',

    getInitialState: function getInitialState() {
        return {
            open: false,
            themeHelper: null,
            themeName: null
        };
    },
    setThemeHelper: function setThemeHelper(ciq) {

        if (!ciq) return;
        var themeHelper = new CIQ.ThemeHelper({
            'stx': ciq
        });
        var self = this;
        this.setState({
            ciq: ciq,
            themeHelper: themeHelper
        }, function () {
            self.loadDefaultColors();
            self.forceUpdate();
        });
    },
    loadDefaultColors: function loadDefaultColors() {
        var self = this;
        options.map(function (section, index) {
            var swatches = section.swatches.map(function (swatch, index) {
                self.updateTheme(null, swatch.item, swatch);
            });
        });
    },

    openDialog: function openDialog(callback) {
        this.setState({
            open: true,
            callback: callback
        });
    },
    closeDialog: function closeDialog() {
        this.setState({
            open: false
        });
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        var self = this;
        if (nextProps.themeHelper) {
            this.setState({
                themeHelper: nextProps.themeHelper
            }, function () {
                self.loadDefaultColors();
                self.forceUpdate();
            });
        }
    },

    openColorPicker: function openColorPicker(swatch, target) {
        var self = this;
        var targetBounds = target.getBoundingClientRect();
        this.refs.colorPicker.openDialog(targetBounds.top, targetBounds.left, function (color) {
            self.updateTheme(color, swatch.item, swatch);
            self.forceUpdate();
        });
    },
    saveSettings: function saveSettings() {
        if (!this.state.themeName) return;
        this.closeDialog();
        if (this.state.callback) this.state.callback(this.state.themeHelper.settings, this.state.themeName);
    },
    updateTheme: function updateTheme(color, item, swatch) {
        switch (item) {
            case 'candleUp':

                if (color) {
                    this.state.themeHelper.settings.chartTypes["Candle/Bar"].up.color = CIQ.hexToRgba('#' + color);
                }
                swatch.color = this.state.themeHelper.settings.chartTypes["Candle/Bar"].up.color;
                break;
            case 'candleDown':
                if (color) this.state.themeHelper.settings.chartTypes["Candle/Bar"].down.color = CIQ.hexToRgba('#' + color);
                swatch.color = this.state.themeHelper.settings.chartTypes["Candle/Bar"].down.color;
                break;
            case 'wickUp':
                if (color) this.state.themeHelper.settings.chartTypes["Candle/Bar"].up.wick = CIQ.hexToRgba('#' + color);
                swatch.color = this.state.themeHelper.settings.chartTypes["Candle/Bar"].up.wick;
                break;
            case 'wickDown':
                if (color) this.state.themeHelper.settings.chartTypes["Candle/Bar"].down.wick = CIQ.hexToRgba('#' + color);
                swatch.color = this.state.themeHelper.settings.chartTypes["Candle/Bar"].down.wick;
                break;
            case 'borderUp':
                if (color) this.state.themeHelper.settings.chartTypes["Candle/Bar"].up.border = CIQ.hexToRgba('#' + color);
                swatch.color = this.state.themeHelper.settings.chartTypes["Candle/Bar"].up.border;
                break;
            case 'borderDown':
                if (color) this.state.themeHelper.settings.chartTypes["Candle/Bar"].down.border = CIQ.hexToRgba('#' + color);
                swatch.color = this.state.themeHelper.settings.chartTypes["Candle/Bar"].down.border;
                break;
            case 'lineBar':
                if (color) this.state.themeHelper.settings.chartTypes["Line"].color = CIQ.hexToRgba('#' + color);
                swatch.color = this.state.themeHelper.settings.chartTypes["Line"].color;
                break;
            case 'mountain':
                if (color) this.state.themeHelper.settings.chartTypes["Mountain"].color = CIQ.hexToRgba('#' + color);
                swatch.color = this.state.themeHelper.settings.chartTypes["Mountain"].color;
                break;
            case 'chartBackground':
                if (color) this.state.themeHelper.settings.chart["Background"].color = CIQ.hexToRgba('#' + color);
                swatch.color = this.state.themeHelper.settings.chart["Background"].color;
                break;
            case 'dividers':
                if (color) this.state.themeHelper.settings.chart["Grid Dividers"].color = CIQ.hexToRgba('#' + color);
                swatch.color = this.state.themeHelper.settings.chart["Grid Dividers"].color;
                break;
            case 'lines':
                if (color) this.state.themeHelper.settings.chart["Grid Lines"].color = CIQ.hexToRgba('#' + color);
                swatch.color = this.state.themeHelper.settings.chart["Grid Lines"].color;
                break;
            case 'axis':
                if (color) this.state.themeHelper.settings.chart["Axis Text"].color = CIQ.hexToRgba('#' + color);
                swatch.color = this.state.themeHelper.settings.chart["Axis Text"].color;
                break;
        }
    },
    updateThemeName: function updateThemeName(event) {
        this.setState({
            themeName: event.target.value
        });
    },

    render: function render() {
        var self = this;
        if (!this.state.open) return React.createElement('span', null);
        var sections = options.map(function (section, sectionindex) {

            var swatches = section.swatches.map(function (swatch, index) {
                return React.createElement('div', { key: "swatch" + index, style: {
                        backgroundColor: swatch.color
                    }, className: "color-picker-swatch " + swatch.class, onClick: function onClick(event) {
                        self.openColorPicker(swatch, event.target);
                    } });
            });

            return React.createElement(
                'div',
                { key: "section" + sectionindex, className: "dialog-item " + section.class },
                React.createElement(
                    'span',
                    null,
                    section.section
                ),
                swatches
            );
        });
        return React.createElement(
            'span',
            { className: 'ciq dialog-overlay' },
            React.createElement(_ColorPicker2.default, { ref: 'colorPicker' }),
            React.createElement(
                'div',
                { className: 'ciq dialog' },
                React.createElement(
                    'div',
                    { className: 'heading' },
                    'Custom Theme'
                ),
                sections,
                React.createElement(
                    'div',
                    { className: 'dialog-item theme-save' },
                    React.createElement('input', { className: 'ciq', ref: 'themeName', type: 'text', placeholder: 'Name Your Theme', onChange: this.updateThemeName }),
                    React.createElement(
                        'button',
                        { className: 'pull-right ciq', onClick: this.saveSettings },
                        'Save'
                    ),
                    React.createElement(
                        'button',
                        { className: 'pull-right ciq', onClick: this.closeDialog },
                        'Close'
                    )
                )
            )
        );
    }
});

var options = [{
    section: "Candle Color",
    class: "color",
    swatches: [{
        class: "colorDown",
        color: "",
        chartType: "Candle/Bar",
        item: "candleDown"
    }, {
        class: "colorUp",
        color: "",
        chartType: "Candle/Bar",
        item: "candleUp"
    }]
}, {
    section: "Candle Wick",
    class: "wick",
    swatches: [{
        class: "wickDown",
        color: "",
        chartType: "Candle/Bar",
        item: "wickDown"
    }, {
        class: "wickUp",
        color: "",
        chartType: "Candle/Bar",
        item: "wickUp"
    }]
}, {
    section: "Candle Border",
    class: "border",
    swatches: [{
        class: "borderDown",
        color: "",
        chartType: "Candle/Bar",
        item: "borderDown"
    }, {
        class: "borderDown",
        color: "",
        chartType: "Candle/Bar",
        item: "borderDown"
    }]
}, {
    section: "Line/Bar Chart",
    class: "lineBarChart",
    swatches: [{
        class: "lineBar",
        color: "",
        chartType: "Line",
        item: "lineBar"
    }]
}, {
    section: "Mountain Color",
    class: "mountainChart",
    swatches: [{
        class: "mountain",
        color: "",
        chartType: "Mountain",
        item: "mountain"
    }]
}, {
    section: "Background",
    class: "background",
    swatches: [{
        class: "chartBackground",
        color: "",
        chart: "Background",
        item: "chartBackground"
    }]
}, {
    section: "Grid Lines",
    class: "gridLines",
    swatches: [{
        class: "lines",
        color: "",
        chart: "Grid Lines",
        item: "lines"
    }]
}, {
    section: "Date Dividers",
    class: "dateDividers",
    swatches: [{
        class: "dividers",
        color: "",
        chart: "Grid Dividers",

        item: "dividers"
    }]
}, {
    section: "Axis Text",
    class: "axisText",
    swatches: [{
        class: "axis",
        color: "",
        chart: "Axis Text",
        item: "axis"
    }]
}];

module.exports = ThemeModal;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TimeZone = React.createClass({
  displayName: "TimeZone",

  getInitialState: function getInitialState() {
    var zones = [];
    var self = this;
    function addZone(zone) {
      zones.push(React.createElement(
        "li",
        { key: "zone" + zone,
          onClick: function onClick() {
            self.setTimeZone(zone);
          },
          className: "dialog-item" },
        zone
      ));
    }
    for (var zone in CIQ.timeZoneMap) {
      addZone(CIQ.timeZoneMap[zone]);
    }
    return {
      ciq: null,
      open: false,
      timeZones: zones
    };
  },
  toggle: function toggle() {
    this.setState({
      open: !this.state.open
    });
  },
  setTimeZone: function setTimeZone(zone) {
    this.state.ciq.setTimeZone(this.state.ciq.dataZone, "America/Costa_Rica");
    if (this.state.ciq.chart.symbol) this.state.ciq.draw();
    this.toggle();
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.ciq) {
      return this.setState({
        ciq: nextProps.ciq
      });
    }
  },

  render: function render() {
    var self = this;
    if (!this.state.open) return React.createElement("span", null);
    return React.createElement(
      "div",
      { className: "ciq dialog-overlay" },
      React.createElement(
        "div",
        { className: "ciq dialog" },
        React.createElement(
          "h3",
          { className: "center" },
          "Select Time Zone"
        ),
        React.createElement(
          "ul",
          null,
          this.state.timeZones
        ),
        React.createElement(
          "div",
          { className: "center" },
          React.createElement(
            "button",
            { onClick: this.toggle },
            "Done"
          )
        )
      )
    );
  }
});

module.exports = TimeZone;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ui = __webpack_require__(2);

var _ui2 = _interopRequireDefault(_ui);

var _TimezoneModal = __webpack_require__(5);

var _TimezoneModal2 = _interopRequireDefault(_TimezoneModal);

var _ThemeModal = __webpack_require__(4);

var _ThemeModal2 = _interopRequireDefault(_ThemeModal);

var _StudyModal = __webpack_require__(3);

var _StudyModal2 = _interopRequireDefault(_StudyModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UI = React.createClass({
    displayName: "UI",

    getInitialState: function getInitialState() {
        return {
            ciq: null
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.ciq) {
            return this.setState({
                ciq: nextProps.ciq
            });
        }
    },

    render: function render() {
        return React.createElement(
            "ciq-UI-Wrapper",
            null,
            React.createElement(
                "nav",
                { className: "ciq-nav" },
                React.createElement(
                    "div",
                    { className: "left" },
                    React.createElement(ChartSymbol, { ciq: this.state.ciq })
                ),
                React.createElement(
                    "div",
                    { className: "right" },
                    React.createElement(Periodicity, { ciq: this.state.ciq }),
                    React.createElement(ChartTypes, { ciq: this.state.ciq }),
                    React.createElement(StudyUI, { ciq: this.state.ciq }),
                    React.createElement(Crosshairs, { ciq: this.state.ciq }),
                    React.createElement(ThemeUI, { ciq: this.state.ciq }),
                    React.createElement(TimeZoneButton, { ciq: this.state.ciq }),
                    React.createElement(Comparison, { ciq: this.state.ciq })
                )
            )
        );
    }
});

var StudyUI = React.createClass({
    displayName: "StudyUI",

    getInitialState: function getInitialState() {
        return {
            ciq: null
        };
    },
    componentWillMount: function componentWillMount() {},
    addStudy: function addStudy(study) {
        CIQ.Studies.addStudy(this.state.ciq, study);
    },
    getStudyList: function getStudyList() {
        var studies = [];
        Object.keys(CIQ.Studies.studyLibrary).map(function (study, index) {
            studies.push(study);
        });
        return studies.sort();
    },
    openModal: function openModal(params) {
        this.refs.studyModal.open(params);
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        var self = this;
        if (nextProps.ciq) {
            var closure = function closure(fc) {
                return function () {
                    fc.apply(self, arguments);
                };
            };

            nextProps.ciq.callbacks.studyOverlayEdit = closure(self.openModal);
            nextProps.ciq.callbacks.studyPanelEdit = closure(self.openModal);
            this.setState({
                ciq: nextProps.ciq
            });
        }
    },

    render: function render() {
        var self = this;
        var studies = this.getStudyList().map(function (study, index) {
            return React.createElement(
                "menu-option",
                { key: "study" + index, onClick: function onClick() {
                        self.addStudy(study);
                    } },
                React.createElement(
                    "span",
                    null,
                    study
                )
            );
        });
        return React.createElement(
            "span",
            null,
            React.createElement(_StudyModal2.default, { ref: "studyModal" }),
            React.createElement(
                "menu-select",
                { className: "ciq", id: "studySelect" },
                React.createElement(
                    "span",
                    { className: "title" },
                    "Studies"
                ),
                React.createElement(
                    "menu-select-options",
                    null,
                    studies
                )
            )
        );
    }
});

var TimeZoneButton = React.createClass({
    displayName: "TimeZoneButton",

    getInitialState: function getInitialState() {
        return {
            ciq: null
        };
    },
    onClick: function onClick() {
        this.refs.modal.toggle();
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.ciq) {
            return this.setState({
                ciq: nextProps.ciq
            });
        }
    },

    render: function render() {
        var self = this;
        return React.createElement(
            "span",
            { style: {
                    display: "inline-block"
                } },
            React.createElement(_TimezoneModal2.default, { ref: "modal", ciq: this.state.ciq }),
            " ",
            React.createElement(
                "button",
                { className: "ciq timezone-btn", onClick: this.onClick },
                "Select Timezone"
            )
        );
    }
});

var ChartSymbol = React.createClass({
    displayName: "ChartSymbol",

    getInitialState: function getInitialState() {
        return {
            ciq: null,
            symbol: "AAPL"
        };
    },
    onOptionClick: function onOptionClick() {
        if (!this.state.ciq || !this.state.symbol) return;
        this.state.ciq.newChart(this.state.symbol);
    },
    onChange: function onChange(event) {
        this.setState({
            symbol: event.target.value
        });
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.ciq) {
            return this.setState({
                ciq: nextProps.ciq
            });
        }
    },

    render: function render() {
        var self = this;
        return React.createElement(
            "span",
            null,
            " ",
            React.createElement("input", { className: "ciq", id: "symbolInput", type: "text", defaultValue: this.state.symbol, onChange: function onChange(event) {
                    self.onChange(event.nativeEvent);
                } }),
            React.createElement("button", { className: "ciq symbol-btn", onClick: this.onOptionClick })
        );
    }
});

var Periodicity = React.createClass({
    displayName: "Periodicity",

    getInitialState: function getInitialState() {
        return {
            ciq: null,
            activeOption: null
        };
    },
    onOptionClick: function onOptionClick(period, interval, index) {
        if (!this.state.ciq) return;
        this.state.ciq.setPeriodicityV2(period, interval);
        this.setState({
            activeOption: _ui2.default.periodicity.options[index]
        });
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.ciq) {
            return this.setState({
                ciq: nextProps.ciq,
                activeOption: this.getCurrentOption(nextProps.ciq.layout)
            });
        }
    },
    getCurrentOption: function getCurrentOption(layout) {
        for (var i = 0; i < _ui2.default.periodicity.options.length; i++) {
            var option = _ui2.default.periodicity.options[i];
            if (layout.interval === option.interval && layout.period === option.periodicity) {
                return option;
            }
        }
    },

    render: function render() {
        var self = this;

        var options = _ui2.default.periodicity.options.map(function (item, index) {
            return React.createElement(
                "menu-option",
                { key: "period" + index, className: "option", onClick: function onClick() {
                        self.onOptionClick(item.period, item.interval, index);
                    } },
                item.label
            );
        });

        return React.createElement(
            "span",
            null,
            React.createElement(
                "menu-select",
                { id: "periodicitySelect" },
                React.createElement(
                    "span",
                    { className: "title" },
                    this.state.activeOption ? this.state.activeOption.label : null
                ),
                React.createElement(
                    "menu-select-options",
                    { className: "menu-hover" },
                    options
                )
            )
        );
    }
});

var ChartTypes = React.createClass({
    displayName: "ChartTypes",

    getInitialState: function getInitialState() {
        return {
            ciq: null,
            activeOption: null
        };
    },
    onOptionClick: function onOptionClick(type, index) {
        if (!this.state.ciq) return;
        if (type.aggregationEdit && this.state.ciq.layout.aggregationType != type.type || type.type == 'heikinashi') {
            this.state.ciq.setChartType('candle');
            this.state.ciq.setAggregationType(type.type);
        } else {
            this.state.ciq.setChartType(type.type);
        }
        this.setState({
            activeOption: _ui2.default.chartTypes.types[index]
        });
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.ciq) {
            return this.setState({
                ciq: nextProps.ciq,
                activeOption: this.getCurrentOption(nextProps.ciq.layout)
            });
        }
    },
    getCurrentOption: function getCurrentOption(layout) {
        for (var i = 0; i < _ui2.default.chartTypes.types.length; i++) {
            var option = _ui2.default.chartTypes.types[i];
            if (layout.chartType === option.type) {
                return option;
            }
        }
        return _ui2.default.chartTypes.types[0];
    },

    render: function render() {
        var self = this;
        var options = _ui2.default.chartTypes.types.map(function (item, index) {
            return React.createElement(
                "menu-option",
                { key: "type" + index, className: "option", onClick: function onClick() {
                        self.onOptionClick(item, index);
                    } },
                item.label
            );
        });

        return React.createElement(
            "menu-select",
            { id: "chartTypeSelect" },
            React.createElement(
                "span",
                { className: "title" },
                this.state.activeOption ? this.state.activeOption.label : this.state.activeOption
            ),
            React.createElement(
                "menu-select-options",
                { className: "menu-hover" },
                options
            )
        );
    }
});
var Comparison = React.createClass({
    displayName: "Comparison",

    getInitialState: function getInitialState() {
        return {
            ciq: null,
            symbol: null
        };
    },
    compareChange: function compareChange(event) {
        this.setState({
            symbol: event.target.value
        });
    },
    onOptionClick: function onOptionClick() {
        if (!this.state.ciq) return;
        function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
        this.state.ciq.addSeries(this.state.symbol, {
            isComparison: true,
            color: getRandomColor(),
            data: {
                useDefaultQuoteFeed: true
            }
        });
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.ciq) {
            return this.setState({
                ciq: nextProps.ciq
            });
        }
    },

    render: function render() {
        var self = this;
        return React.createElement(
            "span",
            null,
            " ",
            React.createElement("input", { className: "ciq", onChange: function onChange(event) {
                    self.compareChange(event.nativeEvent);
                }, id: "symbolCompareInput", placeholder: "Add Comparison", type: "text" }),
            React.createElement("button", { className: "ciq comparison-btn", onClick: this.onOptionClick })
        );
    }
});

var Crosshairs = React.createClass({
    displayName: "Crosshairs",

    getInitialState: function getInitialState() {
        return {
            ciq: null
        };
    },
    onClick: function onClick() {
        if (!this.state.ciq) return;
        this.state.ciq.layout.crosshair = !this.state.ciq.layout.crosshair;
        this.forceUpdate();
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.ciq) {
            return this.setState({
                ciq: nextProps.ciq
            });
        }
    },

    render: function render() {
        var cName = "ciq crosshair-btn ";
        cName += this.state.ciq ? this.state.ciq.layout.crosshair ? "activeBtn" : "" : "";
        return React.createElement(
            "span",
            null,
            " ",
            React.createElement(
                "button",
                { className: cName, onClick: this.onClick },
                "Crosshairs"
            )
        );
    }
});

var ThemeUI = React.createClass({
    displayName: "ThemeUI",

    getInitialState: function getInitialState() {
        return {
            themeList: [{ "name": "Default",
                "settings": // the default theme settings
                { "chart": { "Axis Text": { "color": "rgba(186,189,192,1)" },
                        "Background": { "color": "rgba(28,42,53,1)" },
                        "Grid Dividers": { "color": "rgba(153,153,153,1)" },
                        "Grid Lines": { "color": "rgba(32,48,60,1)" } },
                    "chartTypes": { "Candle/Bar": { "down": { "border": "rgba(0,0,0,1)", "color": "rgba(184,44,12,1)", "wick": "rgba(0,0,0,1)" },
                            "up": { "border": "rgba(0,0,0,1)", "color": "rgba(140,193,118,1)", "wick": "rgba(0,0,0,1)" } },
                        "Line": { "color": "rgba(0,0,0,1)" },
                        "Mountain": { "color": "rgba(102,202,196,0.498039)" } } } }, {
                "name": "+ New Theme"
            }],
            themeHelper: null
        };
    },
    setThemeHelper: function setThemeHelper(ciq) {
        if (!ciq) return;
        var themeHelper = new CIQ.ThemeHelper({
            'stx': ciq
        });
        this.setState({
            ciq: ciq,
            themeHelper: themeHelper
        });
    },
    themeSelect: function themeSelect(theme) {
        if (theme.name === "+ New Theme") {
            return this.openThemeModal();
        }
        this.updateTheme(theme.settings);
    },
    openThemeModal: function openThemeModal() {
        this.refs.themeModal.openDialog(this.addTheme);
    },
    addTheme: function addTheme(theme, themeName) {
        this.state.themeList.push({
            name: themeName,
            settings: theme
        });
        this.setState({
            themeList: this.state.themeList
        });
        this.updateTheme(theme);
    },
    updateTheme: function updateTheme(theme) {
        var c = CIQ.clone(theme);
        this.state.themeHelper.settings = c;
        this.state.themeHelper.update();
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.ciq) {
            this.setThemeHelper(nextProps.ciq);
        }
    },

    render: function render() {
        var self = this;
        var options = this.state.themeList.map(function (theme, index) {
            return React.createElement(
                "menu-option",
                { key: "theme" + index, className: "option", onClick: function onClick() {
                        self.themeSelect(theme);
                    } },
                theme.name
            );
        });
        return React.createElement(
            "span",
            null,
            React.createElement(_ThemeModal2.default, { ref: "themeModal", themeHelper: this.state.themeHelper ? this.state.themeHelper : null }),
            React.createElement(
                "menu-select",
                { id: "themeSelect" },
                React.createElement(
                    "span",
                    { className: "title" },
                    "Select Theme"
                ),
                React.createElement(
                    "menu-select-options",
                    null,
                    options
                )
            )
        );
    }
});

module.exports = UI;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* Copy and paste CIQ.QuoteFeed.CopyAndPasteMe. Change "CopyAndPasteMe" to the name
of your quote service. Then implement the fetch() method based on the included comments */

CIQ.QuoteFeed.Demo = function () {};

CIQ.QuoteFeed.Demo.ciqInheritsFrom(CIQ.QuoteFeed.Subscriptions);

/**
 * This is a demo version of fetch. You will need to create one for your own quote feed that behaves similarly.
 * @memberOf CIQ.QuoteFeed.Demo
 */
CIQ.QuoteFeed.Demo.prototype.fetchFromSource = function (params, cb) {

	if (params.startDate && params.endDate) {
		//date range
		if (params.interval == "minute" || params.interval == "second" || params.interval == "millisecond") {
			this.generateIntradayRange(params, cb);
		} else {
			this.generateDaily(params, cb);
		}
		return;
	} else if (params.startDate) {
		// new update
		if (params.interval == "minute" || params.interval == "second" || params.interval == "millisecond") {
			this.update(params, cb);
		} else {
			cb({
				error: "CIQ.QuoteFeed.Demo does not support updates for daily charts"
			});
		}
		return;
	} else if (params.endDate) {
		// pagination

		if (params.interval == "minute" || params.interval == "second" || params.interval == "millisecond") {
			this.loadMore(params, cb);
		} else {
			cb({
				error: "CIQ.QuoteFeed.Demo does not support loadMore for daily charts"
			});
		}
		return;
	} else {
		// initial load
		if (params.interval == "minute" || params.interval == "second" || params.interval == "millisecond") {
			this.generateIntraday(params, cb);
		} else {
			this.generateDaily(params, cb);
		}
		return;
	}
};

/**
 * Creates a random update. Note that updates are returned as an array. You should check params.startDate to decide
 * the starting point for an update.
 * @memberOf CIQ.QuoteFeed.Demo
 */
CIQ.QuoteFeed.Demo.prototype.update = function (params, cb) {
	// market closed return empty update.
	if (!this.market.isOpen()) {
		cb({
			quotes: [],
			attribution: {
				source: "demo",
				exchange: "RANDOM"
			}
		});
		return;
	}

	var masterData = params.stx.chart.masterData;
	var current = masterData[masterData.length - 1];
	var previous = masterData[masterData.length - 2];

	var ms = this.market.marketZoneNow().getTime();
	var divisor = 60 * 1000;
	if (params.interval == "second") divisor = 1000;
	if (params.interval == "millisecond") divisor = 1;
	ms = ms - ms % (params.period * divisor); // move to evenly divided bar
	var now = new Date(ms);

	var newQuote = {};
	newQuote.DT = now; // Or set newQuote.Date if you have a string form date
	var field = params.symbol;
	if (!current[field]) {
		if (previous[field]) current = previous; // get series which might be lagging behind a bar
		else field = "Close";
	}
	newQuote.Close = Math.round((current[field] - (Math.random() - 0.5) * 0.8) * 100) / 100;

	if (ms == masterData[masterData.length - 1].DT.getTime()) {
		if (field == "Close") {
			newQuote.Open = current.Open;
			newQuote.High = Math.max(current.High, newQuote.Close);
			newQuote.Low = Math.min(current.Low, newQuote.Close);
		} else {
			newQuote.Open = Math.round((current[field] - (Math.random() - 0.5) * 0.8) * 100) / 100;
			newQuote.High = Math.max(newQuote.Open, newQuote.Close);
			newQuote.Low = Math.min(newQuote.Open, newQuote.Close);
		}
		newQuote.Volume = current.Volume + Math.round(Math.random() * 1000);
	} else {
		newQuote.Open = newQuote.High = newQuote.Low = newQuote.Close;
		newQuote.Volume = 1000;
	}
	cb({
		quotes: [newQuote],
		attribution: {
			source: "demo",
			exchange: "RANDOM"
		}
	});
};

CIQ.QuoteFeed.Demo.prototype.randomQuote = function (seed) {
	var Open = seed - (Math.random() - 0.5) * 2;
	var Close = seed - (Math.random() - 0.5) * 2;
	var High = Math.max(seed - (Math.random() - 0.5) * 2, Open, Close);
	var Low = Math.min(seed - (Math.random() - 0.5) * 2, Open, Close);
	var newQuote = {
		Open: Math.round(Open * 100) / 100,
		Close: Math.round(Close * 100) / 100,
		High: Math.round(High * 100) / 100,
		Low: Math.round(Low * 100) / 100
	};
	// Reasonable random volume generator. Higher volumes for red candles.
	if (newQuote.Close < newQuote.Open) {
		newQuote.Volume = 1000000 + Math.round(Math.random() * 1500000);
	} else {
		newQuote.Volume = 1000000 + Math.round(Math.random() * 300000);
	}
	return newQuote;
};

/**
 * Creates daily data for the chart
 * @memberOf CIQ.QuoteFeed.Demo
 */
CIQ.QuoteFeed.Demo.prototype.generateDaily = function (params, cb) {
	function setQuotes(response) {
		var varName = response.substr(0, response.indexOf("="));
		var valueToParse = response.substring(response.indexOf(varName + "=") + (varName + "=").length, response.length - 1);
		try {
			return JSON.parse(valueToParse.replace(/,0+/g, ",0").replace(/,[.]/g, ",0.").replace(/;/g, ""));
		} catch (e) {
			return [];
		}
	}

	var symbol = params.symbol.toUpperCase();
	if (symbol.charAt(0) != "^" && CIQ.Market.Symbology.isForexSymbol(symbol)) symbol = "^" + symbol;
	var url = "https://demoquotes.chartiq.com/" + symbol.replace(/\//g, "-");
	CIQ.postAjax(url, null, function (status, response) {
		if (status != 200) {
			cb({
				error: status
			});
			return;
		}
		var quotes = setQuotes(response);
		var newQuotes = [];
		for (var i = 0; i < quotes.length; i++) {
			newQuotes[i] = {};
			newQuotes[i].Date = quotes[i][0]; // Or set newQuotes[i].DT if you have a JS Date
			newQuotes[i].Open = quotes[i][1];
			newQuotes[i].High = quotes[i][2];
			newQuotes[i].Low = quotes[i][3];
			newQuotes[i].Close = quotes[i][4];
			newQuotes[i].Volume = quotes[i][5];
			newQuotes[i].Adj_Close = quotes[i][6];
		}
		params.noUpdate = true; //Daily demo quotes do not support updates
		cb({
			quotes: newQuotes,
			moreAvailable: false,
			attribution: {
				source: "demo",
				exchange: "RANDOM"
			}
		}); // set moreAvailable to true so that the chart will request more when scrolling into the past. Set to false if at the end of data.
	});
};

/**
 * Creates a random intraday chart (uses CIQ.Market to be market hours aware)
 * @memberOf CIQ.QuoteFeed.Demo
 */
CIQ.QuoteFeed.Demo.prototype.generateIntraday = function (params, cb) {

	if (params.stx.marketFactory) {
		params.stx.setMarket(params.stx.marketFactory(params.symbolObject), params.stx.chart);
	}
	this.market = params.stx.chart.market;

	var seed = 155.43;
	var quotes = [];
	var ticksToLoad = params.ticks * 3; // load extra to fill up space before chart
	if (ticksToLoad > 2000) ticksToLoad = 2000; // demo data could be slow for very large data sets since it recursively calls iter.previous() wich is not inteded to be uses this way normally
	if (isNaN(ticksToLoad)) ticksToLoad = params.stx.chart.dataSet.length;

	var ms = this.market.marketZoneNow().getTime();
	var divisor = 60 * 1000;
	if (params.interval == "second") divisor = 1000;
	if (params.interval == "millisecond") divisor = 1;
	ms = ms - ms % (params.period * divisor); // move to evenly divided bar
	var now = new Date(ms);

	var iter = this.market.newIterator({
		'begin': now,
		'interval': params.stx.layout.interval,
		'periodicity': 1, //params.stx.layout.periodicity, // allways do 1 since this is the raw data. The agregation will happen upon data returned.
		'timeUnit': params.stx.layout.timeUnit,
		'inZone': params.stx.dataZone,
		'outZone': params.stx.dataZone
	});

	if (!this.market.isOpen()) now = iter.previous();
	// if we are only loading market hours, we may reach today's date before the number of max ticks.
	// So we go backwards based on ticks and not date, then reverse the array.
	for (var i = 0; i < ticksToLoad; i++) {
		var newQuote = this.randomQuote(seed);
		newQuote.DT = new Date(now);
		newQuote.Volume = Math.round(newQuote.Volume * params.period / 500);
		quotes.push(newQuote);
		now = iter.previous();
		seed = newQuote.Close;
	}

	cb({
		quotes: quotes.reverse(),
		moreAvailable: true,
		attribution: {
			source: "demo",
			exchange: "RANDOM"
		}
	}); // set moreAvailable to true so that the chart will request more when scrolling into the past. Set to false if at the end of data.
};

/**
 * Creates a random intraday range of data for a chart
 * @memberOf CIQ.QuoteFeed.Demo
 */
CIQ.QuoteFeed.Demo.prototype.generateIntradayRange = function (params, cb) {

	var seed = 155.43;
	var quotes = [];

	var now = new Date(params.startDate);

	var iter = this.market.newIterator({
		'begin': now,
		'interval': params.stx.layout.interval,
		'periodicity': 1, //params.stx.layout.periodicity,
		'timeUnit': params.stx.layout.timeUnit,
		'inZone': params.stx.dataZone,
		'outZone': params.stx.dataZone
	});

	while (now <= params.endDate) {
		var newQuote = this.randomQuote(seed);
		newQuote.DT = new Date(now);
		newQuote.Volume = Math.round(newQuote.Volume * params.period / 500);
		quotes.push(newQuote);
		now = iter.next();
		seed = newQuote.Close;
	}

	cb({
		quotes: quotes,
		moreAvailable: true,
		attribution: {
			source: "demo",
			exchange: "RANDOM"
		}
	});
};

/**
 * Loads more random data when the user scrolls back.
 * @memberOf CIQ.QuoteFeed.Demo
 */
CIQ.QuoteFeed.Demo.prototype.loadMore = function (params, cb) {
	var firstQuote = params.chart.masterData[0];
	var i;
	for (i = 0; i < params.chart.masterData.length; i++) {
		if (params.chart.masterData[i].DT.getTime() >= params.endDate.getTime()) {
			firstQuote = params.chart.masterData[i];
			if (firstQuote[params.symbol] || firstQuote.Close) break;
		}
	}
	var field = params.symbol;
	if (!firstQuote[field]) field = "Close";
	var seed = firstQuote[field];
	var quotes = [];

	var iter = this.market.newIterator({
		'begin': params.endDate,
		'interval': params.stx.layout.interval,
		'periodicity': 1, //params.stx.layout.periodicity,
		'timeUnit': params.stx.layout.timeUnit,
		'inZone': params.stx.dataZone,
		'outZone': params.stx.dataZone
	});

	var now = new Date(iter.previous());
	for (i = 0; i < params.ticks; i++) {
		var newQuote = this.randomQuote(seed);
		newQuote.DT = new Date(now);
		if (params.interval == "minute") newQuote.Volume = Math.round(newQuote.Volume * params.period / 500);
		quotes.push(newQuote);
		now = iter.previous();
		seed = newQuote.Close;
	}
	quotes.reverse();
	cb({
		quotes: quotes,
		moreAvailable: params.chart.masterData.length < 100000,
		attribution: {
			source: "demo",
			exchange: "RANDOM"
		}
	}); // set moreAvailable to true so that the chart will request more when scrolling into the past. Set to false if at the end of data.
};

CIQ.QuoteFeed.ChartIQEOD = function (urlQuick, urlFull) {
	this.urlQuick = urlQuick;
	this.urlFull = urlFull;
};

CIQ.QuoteFeed.ChartIQEOD.ciqInheritsFrom(CIQ.QuoteFeed);

/**
 * EOD quotes from ChartIQ. You'll need to get a valid url from ChartIQ to use this.
 * @memberOf CIQ.QuoteFeed.ChartIQEOD
 */
CIQ.QuoteFeed.ChartIQEOD.prototype.fetch = function (params, cb) {
	function setQuotes(response) {
		var varName = response.substr(0, response.indexOf("="));
		var valueToParse = response.substring(response.indexOf(varName + "=") + (varName + "=").length, response.length - 1);
		try {
			return JSON.parse(valueToParse.replace(/,0+/g, ",0").replace(/,[.]/g, ",0.").replace(/;/g, ""));
		} catch (e) {
			return [];
		}
	}

	if (params.startDate && !params.endDate) {
		cb({
			error: "CIQ.QuoteFeed.ChartIQEOD does not support updates for daily charts"
		});
		return;
	}
	if (params.endDate && !params.loadMoreReplace) {
		cb({
			error: "CIQ.QuoteFeed.ChartIQEOD does not support loadMore for daily charts"
		});
		return;
	}
	if (params.interval == "minute") {
		cb({
			error: "CIQ.QuoteFeed.ChartIQEOD does not support intraday charts"
		});
		return;
	}
	var symbol = params.symbol.toUpperCase();
	if (symbol.charAt(0) != "^" && CIQ.Market.Symbology.isForexSymbol(symbol)) symbol = "^" + symbol;
	var url = this.urlQuick;
	var moreAvailable = true;
	if (params.endDate && params.loadMoreReplace) url = this.urlFull;else if ((new Date().getTime() - 1333238400000) / 86400000 < params.ticks) url = this.urlFull; // start predates quick cache
	if (url == this.urlFull) {
		delete params.endDate;
		moreAvailable = false;
	}
	if (!url) url = this.urlQuick + "/pts";
	var self = this;
	CIQ.postAjax(url + "/" + symbol.replace(/\//g, "-").toUpperCase(), null, function (status, response) {
		if (status != 200) {
			cb({
				error: status
			});
			return;
		}
		var quotes = setQuotes(response);
		var newQuotes = [];
		for (var i = 0; i < quotes.length; i++) {
			newQuotes[i] = {};
			newQuotes[i].Date = quotes[i][0]; // Or set newQuotes[i].DT if you have a JS Date
			newQuotes[i].Open = quotes[i][1];
			newQuotes[i].High = quotes[i][2];
			newQuotes[i].Low = quotes[i][3];
			newQuotes[i].Close = quotes[i][4];
			newQuotes[i].Volume = quotes[i][5];
			newQuotes[i].Adj_Close = quotes[i][6];
		}
		var result = {
			quotes: newQuotes,
			moreAvailable: moreAvailable,
			attribution: {
				source: "chartiq",
				exchange: "EOD"
			}
		};
		var now = new Date().getTime();
		if (!result.quotes.length || now - CIQ.strToDate(result.quotes[result.quotes.length - 1].Date).getTime() > 24 * 60 * 60 * 1000) {
			if (self.realTimeHook) return self.realTimeHook(params, result, cb);
		}
		cb(result);
	});
};

/** You can override this function to fetch a RT update from a different source
 * @memberOf CIQ.QuoteFeed.ChartIQEOD
 */
CIQ.QuoteFeed.ChartIQEOD.prototype.realTimeHook = function (params, result, cb) {
	cb(result);
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ChartWrapper = __webpack_require__(1);

var _ChartWrapper2 = _interopRequireDefault(_ChartWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

ReactDOM.render(React.createElement(_ChartWrapper2.default, null), document.getElementById('chartHere'));

/***/ })
/******/ ]);