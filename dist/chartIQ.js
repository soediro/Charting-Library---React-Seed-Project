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
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
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
var Dispatcher = __webpack_require__(10);
var EventEmitter = __webpack_require__(11).EventEmitter;
var assign = __webpack_require__(15);

var constants = {
    "ADD_COMPARISON_SERIES": "ADD_COMPARISON_SERIES",
    "REMOVE_COMPARISON_SERIES": "REMOVE_COMPARISON_SERIES"
};

var ChartStore = assign({}, EventEmitter.prototype, {
    initialize: function initialize() {},
    values: { comparisons: [] },
    getComparisons: function getComparisons() {
        return this.values.comparisons;
    },
    addComparison: function addComparison(series) {
        this.values.comparisons.push(series);
    },
    removeComparison: function removeComparison(series) {
        var index = this.values.comparisons.indexOf(series, 0);
        if (index > -1) {
            this.values.comparisons.splice(index, 1);
        }
    },
    addListener: function addListener(events, callback) {
        for (var i = 0; i < events.length; i++) {
            this.on(events[i], callback);
        }
    },
    removeListener: function removeListener(events, callback) {
        for (var i = 0; i < events.length; i++) {
            this.removeListener(events[i], callback);
        }
    }
});

Dispatcher.register(function (action) {
    var actions = {
        "ADD_COMPARISON_SERIES": function ADD_COMPARISON_SERIES() {
            ChartStore.addComparison(action.data);
            ChartStore.emit("comparisonsChange");
        },
        "REMOVE_COMPARISON_SERIES": function REMOVE_COMPARISON_SERIES() {
            ChartStore.removeComparison(action.data);
            ChartStore.emit("comparisonsChange");
        }

    };
    if (actions[action.actionType]) {
        actions[action.actionType]();
    }
});

var Actions = {
    addComparisonSeries: function addComparisonSeries(comparisons) {
        Dispatcher.dispatch({
            actionType: constants.ADD_COMPARISON_SERIES,
            data: comparisons
        });
    },
    removeComparisonSeries: function removeComparisonSeries(comparisons) {
        Dispatcher.dispatch({
            actionType: constants.REMOVE_COMPARISON_SERIES,
            data: comparisons
        });
    }
};
exports.ChartStore = ChartStore;
exports.Actions = Actions;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _UI = __webpack_require__(8);

var _UI2 = _interopRequireDefault(_UI);

var _template = __webpack_require__(9);

var _template2 = _interopRequireDefault(_template);

var _ChartStore = __webpack_require__(1);

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
      feed: "Demo",
      service: null,
      chartSeries: []

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
        ciq: ciq,
        service: new _template2.default().makeFeed()
      }, function () {
        this.state.ciq.setPeriodicityV2(1, 5);
        this.attachFeed(this.state.service);
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
      var newSeries = this.state.ciq.addSeries(symbolComparison, {
        isComparison: false,
        color: getRandomColor(),
        data: {
          useDefaultQuoteFeed: true
        }
      });
      console.log("set state");
      this.setState({ chartSeries: this.state.chartSeries.push(newSeries) });
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
      console.log("this.state.chartSeries", this.state.chartSeries);
      return React.createElement(
        "div",
        null,
        React.createElement(_UI2.default, { ciq: this.state.ciq ? this.state.ciq : null }),
        React.createElement(
          "div",
          { className: "ciq-chart-area" },
          React.createElement(
            "div",
            { id: "chartContainer", className: "chartContainer" },
            React.createElement(Legend, { ciq: this.state.ciq })
          )
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


var Legend = React.createClass({
  displayName: "Legend",

  getInitialState: function getInitialState() {
    return {
      comparisons: _ChartStore.ChartStore.getComparisons()
    };
  },
  onStoreChange: function onStoreChange() {
    this.setState({ comparisons: _ChartStore.ChartStore.getComparisons() });
  },
  componentWillMount: function componentWillMount() {
    _ChartStore.ChartStore.addListener(["comparisonsChange"], this.onStoreChange);
  },
  componentWillUnmount: function componentWillUnmount() {
    _ChartStore.ChartStore.removeListener(["comparisonsChange"], this.onStoreChange);
  },

  removeSeries: function removeSeries(comparison) {
    console.log("click here");
    _ChartStore.Actions.removeComparisonSeries(comparison);
    this.props.ciq.removeSeries(comparison.display, this.props.ciq.ciq);
  },
  render: function render() {
    var self = this;
    console.log("this.state.comparisons ", this.state.comparisons);
    if (!this.state.comparisons || this.state.comparisons.length === 0) return React.createElement("span", null);

    var comparisons = this.state.comparisons.map(function (comparison, i) {
      return React.createElement(
        "div",
        { className: "comparisonWrapper", key: "comp" + i },
        React.createElement("div", { className: "chartSeriesColor", style: { "backgroundColor": comparison.parameters.color } }),
        React.createElement(
          "div",
          { className: "chartSeries" },
          comparison.display
        ),
        React.createElement(
          "div",
          { className: "deleteSeries", onClick: function onClick() {
              self.removeSeries(comparison);
            } },
          " x"
        )
      );
    });

    return React.createElement(
      "div",
      { className: "comparisons" },
      comparisons
    );
  }
});

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
        "div",
        { className: "quick-link", key: i, onClick: function onClick() {
            self.setSpan(range.span, range.multiplier);
          } },
        range.display
      );
    });
    return React.createElement(
      "div",
      null,
      ranges
    );
  }
});

/***/ }),
/* 4 */
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
			label: 'Bar'
		}, {
			type: 'candle',
			label: 'Candle'
		}, {
			type: 'colored_bar',
			label: 'Colored bar'
		}, {
			type: 'hollow_candle',
			label: 'Hollow candle'
		}, {
			type: 'line',
			label: 'Line'
		}, {
			type: 'mountain',
			label: 'Mountain'
		}, {
			type: 'volume_candle',
			label: 'Volume candle'
		}, {
			type: 'heikinashi',
			label: 'Heikin-Ashi'
		}, {
			type: 'kagi',
			label: 'Kagi',
			aggregationEdit: {
				title: 'Set Reversal Percentage',
				inputs: [{
					lookup: 'kagi',
					label: 'Kagi'
				}]
			}
		}, {
			type: 'linebreak',
			label: 'Line break',
			aggregationEdit: {
				title: 'Set Price Lines',
				inputs: [{
					lookup: 'priceLines',
					label: 'Price line'
				}]
			}
		}, {
			type: 'renko',
			label: 'Renko',
			aggregationEdit: {
				title: 'Set Range',
				inputs: [{
					lookup: 'renko',
					label: 'Renko'
				}]
			}
		}, {
			type: 'rangebars',
			label: 'Range bars',
			aggregationEdit: {
				title: 'Set Range',
				inputs: [{
					lookup: 'range',
					label: 'Range'
				}]
			}
		}, {
			type: 'pandf',
			label: 'Point & figure',
			aggregationEdit: {
				title: 'Set Point & Figure Parameters',
				inputs: [{
					lookup: 'pandf.box',
					label: 'Box'
				}, {
					lookup: 'pandf.reversal',
					label: 'Reversal'
				}]
			}
		}]
	}
};

/***/ }),
/* 5 */
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
      { key: "select" + input.heading, className: 'inputs dialog-item' },
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
      { key: type + input.value, className: 'inputs dialog-item' },
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
        { key: "output" + index, className: 'outputs dialog-item' },
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
      { className: 'dialog-overlay', id: 'studyDialog' },
      React.createElement(_ColorPicker2.default, { ref: 'colorPicker' }),
      React.createElement(
        'div',
        { className: 'dialog' },
        React.createElement(
          'h3',
          null,
          this.state.studyHelper ? this.state.studyHelper.title : ""
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
            { className: 'parameters dialog-item' },
            params
          )
        ),
        React.createElement(
          'button',
          { className: 'pull-right', onClick: this.updateStudy },
          'Save'
        )
      )
    );
  }
});

module.exports = StudyModal;

/***/ }),
/* 6 */
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
/* 7 */
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ui = __webpack_require__(4);

var _ui2 = _interopRequireDefault(_ui);

var _TimezoneModal = __webpack_require__(7);

var _TimezoneModal2 = _interopRequireDefault(_TimezoneModal);

var _ThemeModal = __webpack_require__(6);

var _ThemeModal2 = _interopRequireDefault(_ThemeModal);

var _StudyModal = __webpack_require__(5);

var _StudyModal2 = _interopRequireDefault(_StudyModal);

var _ChartStore = __webpack_require__(1);

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
                    React.createElement(ChartSymbol, { ciq: this.state.ciq }),
                    React.createElement(Comparison, { ciq: this.state.ciq })
                ),
                React.createElement(
                    "div",
                    { className: "right" },
                    React.createElement(Periodicity, { ciq: this.state.ciq }),
                    React.createElement(ChartTypes, { ciq: this.state.ciq }),
                    React.createElement(StudyUI, { ciq: this.state.ciq }),
                    React.createElement(ThemeUI, { ciq: this.state.ciq }),
                    React.createElement(Crosshairs, { ciq: this.state.ciq }),
                    React.createElement(TimeZoneButton, { ciq: this.state.ciq })
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
                { id: "studySelect" },
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
            React.createElement("button", { className: "timezone-btn", onClick: this.onClick })
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
        this.setState({
            symbol: null
        });
        this.refs["symbolInput"].value = "";
    },
    onChange: function onChange(event) {
        this.setState({
            symbol: event.target.value
        });
    },
    onFocus: function onFocus() {
        this.refs["inputWrapper"].style.backgroundColor = '#233542';
    },
    onBlur: function onBlur() {
        this.refs["inputWrapper"].style.backgroundColor = '#151f28';
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
            React.createElement(
                "div",
                { ref: "inputWrapper", className: "inputWrapper" },
                React.createElement("input", { ref: "symbolInput", id: "symbolInput", type: "text", placeholder: "Enter Symbol",
                    onChange: function onChange(event) {
                        self.onChange(event.nativeEvent);
                    },
                    onFocus: function onFocus() {
                        self.onFocus();
                    },
                    onBlur: function onBlur() {
                        self.onBlur();
                    } }),
                React.createElement("div", { className: "symbol-btn", onClick: this.onOptionClick })
            )
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
            symbol: null,
            chartSeries: []
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
        var newSeries = this.state.ciq.addSeries(this.state.symbol, {
            isComparison: true,
            color: getRandomColor(),
            data: {
                useDefaultQuoteFeed: true
            }
        });
        this.setState({
            symbol: null
        });
        this.refs["compareInput"].value = "";
        _ChartStore.Actions.addComparisonSeries(newSeries);
    },
    onFocus: function onFocus() {
        this.refs["inputWrapper"].style.backgroundColor = '#233542';
    },
    onBlur: function onBlur() {
        this.refs["inputWrapper"].style.backgroundColor = '#151f28';
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
            React.createElement(
                "div",
                { ref: "inputWrapper", className: "inputWrapper" },
                React.createElement("input", { ref: "compareInput", onChange: function onChange(event) {
                        self.compareChange(event.nativeEvent);
                    },
                    onFocus: function onFocus() {
                        self.onFocus();
                    },
                    onBlur: function onBlur() {
                        self.onBlur();
                    }, id: "symbolCompareInput", placeholder: "Add Comparison", type: "text" }),
                React.createElement("div", { className: "comparison-btn", onClick: this.onOptionClick })
            )
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
        var cName = "crosshair-btn ";
        cName += this.state.ciq ? this.state.ciq.layout.crosshair ? "active" : "" : "";
        return React.createElement(
            "span",
            null,
            " ",
            React.createElement("button", { className: cName, onClick: this.onClick })
        );
    }
});

var ThemeUI = React.createClass({
    displayName: "ThemeUI",

    getInitialState: function getInitialState() {
        return {
            themeList: [{
                "name": "Default",
                "settings": // the default theme settings
                {
                    "chart": {
                        "Axis Text": { "color": "rgba(186,189,192,1)" },
                        "Background": { "color": "rgba(28,42,53,1)" },
                        "Grid Dividers": { "color": "rgba(153,153,153,1)" },
                        "Grid Lines": { "color": "rgba(32,48,60,1)" }
                    },
                    "chartTypes": {
                        "Candle/Bar": {
                            "down": { "border": "rgba(0,0,0,1)", "color": "rgba(184,44,12,1)", "wick": "rgba(0,0,0,1)" },
                            "up": { "border": "rgba(0,0,0,1)", "color": "rgba(140,193,118,1)", "wick": "rgba(0,0,0,1)" }
                        },
                        "Line": { "color": "rgba(0,0,0,1)" },
                        "Mountain": { "color": "rgba(102,202,196,0.498039)" }
                    }
                }
            }, {
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ChartService = function () {
	// the quotefeed object

	function ChartService() {
		_classCallCheck(this, ChartService);

		this.quotefeedSimulator = {};

		// -------------------------------------------------------------------------------------------
		// Copyright 2012-2017 by ChartIQ, Inc
		// -------------------------------------------------------------------------------------------
		// SAMPLE QUOTEFEED IMPLEMENTATION -- Connects charts to ChartIQ Simulator
		// ****** To implement your own quotefeed, use this as your template *******
		///////////////////////////////////////////////////////////////////////////////////////////////////////////

		// -------------------------------------------------------------------------------------------
		// Copyright 2012-2017 by ChartIQ, Inc
		// -------------------------------------------------------------------------------------------

		/*    eslint   */ /*   jshint   */
		/* globals CIQ */ /* global CIQ */

		/**
   * Convenience function for generating a globally unique id (GUID).
   * See http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
   * @private
   */
		this.quotefeedSimulator.generateGUID = function () {
			var d = new Date().getTime();
			if (window.performance && typeof window.performance.now === "function") {
				d += window.performance.now(); //use high-precision timer if available
			}
			var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
				var r = (d + Math.random() * 16) % 16 | 0;
				d = Math.floor(d / 16);
				return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
			});
			return uuid;
		};

		this.quotefeedSimulator.url = "http://simulator.chartiq.com/datafeed";
		this.quotefeedSimulator.url += "?session=" + this.quotefeedSimulator.generateGUID(); // add on unique sessionID required by ChartIQ simulator;

		// called by chart to fetch initial data
		this.quotefeedSimulator.fetchInitialData = function (symbol, suggestedStartDate, suggestedEndDate, params, cb) {
			var queryUrl = this.url + "&identifier=" + symbol + "&startdate=" + suggestedStartDate.toISOString() + "&enddate=" + suggestedEndDate.toISOString() + "&interval=" + params.interval + "&period=" + params.period;
			var that = this;
			CIQ.postAjax(queryUrl, null, function (status, response) {
				// process the HTTP response from the datafeed
				if (status == 200) {
					// if successful response from datafeed
					var newQuotes = that.formatChartData(response);
					cb({ quotes: newQuotes, attribution: { source: "simulator", exchange: "RANDOM" } }); // return the fetched data; init moreAvailable to enable pagination
				} else {
					// else error response from datafeed
					cb({ error: status }); // specify error in callback
				}
			});
		};

		// called by chart to fetch update data
		this.quotefeedSimulator.fetchUpdateData = function (symbol, startDate, params, cb) {
			var queryUrl = this.url + "&identifier=" + symbol + "&startdate=" + startDate.toISOString() + "&interval=" + params.interval + "&period=" + params.period;
			var that = this;
			CIQ.postAjax(queryUrl, null, function (status, response) {
				// process the HTTP response from the datafeed
				if (status == 200) {
					// if successful response from datafeed
					var newQuotes = that.formatChartData(response);
					cb({ quotes: newQuotes, attribution: { source: "simulator", exchange: "RANDOM" } }); // return the fetched data
				} else {
					// else error response from datafeed
					cb({ error: status }); // specify error in callback
				}
			});
		};

		// called by chart to fetch pagination data
		this.quotefeedSimulator.fetchPaginationData = function (symbol, suggestedStartDate, endDate, params, cb) {
			var queryUrl = this.url + "&identifier=" + symbol + "&startdate=" + suggestedStartDate.toISOString() + "&enddate=" + endDate.toISOString() + "&interval=" + params.interval + "&period=" + params.period;
			var that = this;
			CIQ.postAjax(queryUrl, null, function (status, response) {
				// process the HTTP response from the datafeed
				if (status == 200) {
					// if successful response from datafeed
					var newQuotes = that.formatChartData(response);
					cb({ quotes: newQuotes, attribution: { source: "simulator", exchange: "RANDOM" } }); // return fetched data (and set moreAvailable)
				} else {
					// else error response from datafeed
					cb({ error: status }); // specify error in callback
				}
			});
		};

		// utility function to format data for chart input; given simulator was designed to work with library, very little formatting is needed
		this.quotefeedSimulator.formatChartData = function (response) {
			var feeddata = JSON.parse(response);
			var newQuotes = [];
			for (var i = 0; i < feeddata.length; i++) {
				newQuotes[i] = {};
				newQuotes[i].DT = new Date(feeddata[i].DT);
				newQuotes[i].Open = feeddata[i].Open;
				newQuotes[i].High = feeddata[i].High;
				newQuotes[i].Low = feeddata[i].Low;
				newQuotes[i].Close = feeddata[i].Close;
				newQuotes[i].Volume = feeddata[i].Volume;
			}
			return newQuotes;
		};
	}

	_createClass(ChartService, [{
		key: 'makeFeed',
		value: function makeFeed() {
			return this.quotefeedSimulator;
		}
	}]);

	return ChartService;
}();

exports.default = ChartService;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Dispatcher = __webpack_require__(13).Dispatcher;

module.exports = new Dispatcher();

/***/ }),
/* 11 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports.Dispatcher = __webpack_require__(14);


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Dispatcher
 * 
 * @preventMunge
 */



exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var invariant = __webpack_require__(12);

var _prefix = 'ID_';

/**
 * Dispatcher is used to broadcast payloads to registered callbacks. This is
 * different from generic pub-sub systems in two ways:
 *
 *   1) Callbacks are not subscribed to particular events. Every payload is
 *      dispatched to every registered callback.
 *   2) Callbacks can be deferred in whole or part until other callbacks have
 *      been executed.
 *
 * For example, consider this hypothetical flight destination form, which
 * selects a default city when a country is selected:
 *
 *   var flightDispatcher = new Dispatcher();
 *
 *   // Keeps track of which country is selected
 *   var CountryStore = {country: null};
 *
 *   // Keeps track of which city is selected
 *   var CityStore = {city: null};
 *
 *   // Keeps track of the base flight price of the selected city
 *   var FlightPriceStore = {price: null}
 *
 * When a user changes the selected city, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'city-update',
 *     selectedCity: 'paris'
 *   });
 *
 * This payload is digested by `CityStore`:
 *
 *   flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'city-update') {
 *       CityStore.city = payload.selectedCity;
 *     }
 *   });
 *
 * When the user selects a country, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'country-update',
 *     selectedCountry: 'australia'
 *   });
 *
 * This payload is digested by both stores:
 *
 *   CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       CountryStore.country = payload.selectedCountry;
 *     }
 *   });
 *
 * When the callback to update `CountryStore` is registered, we save a reference
 * to the returned token. Using this token with `waitFor()`, we can guarantee
 * that `CountryStore` is updated before the callback that updates `CityStore`
 * needs to query its data.
 *
 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       // `CountryStore.country` may not be updated.
 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
 *       // `CountryStore.country` is now guaranteed to be updated.
 *
 *       // Select the default city for the new country
 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
 *     }
 *   });
 *
 * The usage of `waitFor()` can be chained, for example:
 *
 *   FlightPriceStore.dispatchToken =
 *     flightDispatcher.register(function(payload) {
 *       switch (payload.actionType) {
 *         case 'country-update':
 *         case 'city-update':
 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
 *           FlightPriceStore.price =
 *             getFlightPriceStore(CountryStore.country, CityStore.city);
 *           break;
 *     }
 *   });
 *
 * The `country-update` payload will be guaranteed to invoke the stores'
 * registered callbacks in order: `CountryStore`, `CityStore`, then
 * `FlightPriceStore`.
 */

var Dispatcher = (function () {
  function Dispatcher() {
    _classCallCheck(this, Dispatcher);

    this._callbacks = {};
    this._isDispatching = false;
    this._isHandled = {};
    this._isPending = {};
    this._lastID = 1;
  }

  /**
   * Registers a callback to be invoked with every dispatched payload. Returns
   * a token that can be used with `waitFor()`.
   */

  Dispatcher.prototype.register = function register(callback) {
    var id = _prefix + this._lastID++;
    this._callbacks[id] = callback;
    return id;
  };

  /**
   * Removes a callback based on its token.
   */

  Dispatcher.prototype.unregister = function unregister(id) {
    !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.unregister(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
    delete this._callbacks[id];
  };

  /**
   * Waits for the callbacks specified to be invoked before continuing execution
   * of the current callback. This method should only be used by a callback in
   * response to a dispatched payload.
   */

  Dispatcher.prototype.waitFor = function waitFor(ids) {
    !this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Must be invoked while dispatching.') : invariant(false) : undefined;
    for (var ii = 0; ii < ids.length; ii++) {
      var id = ids[ii];
      if (this._isPending[id]) {
        !this._isHandled[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Circular dependency detected while ' + 'waiting for `%s`.', id) : invariant(false) : undefined;
        continue;
      }
      !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
      this._invokeCallback(id);
    }
  };

  /**
   * Dispatches a payload to all registered callbacks.
   */

  Dispatcher.prototype.dispatch = function dispatch(payload) {
    !!this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.') : invariant(false) : undefined;
    this._startDispatching(payload);
    try {
      for (var id in this._callbacks) {
        if (this._isPending[id]) {
          continue;
        }
        this._invokeCallback(id);
      }
    } finally {
      this._stopDispatching();
    }
  };

  /**
   * Is this Dispatcher currently dispatching.
   */

  Dispatcher.prototype.isDispatching = function isDispatching() {
    return this._isDispatching;
  };

  /**
   * Call the callback stored with the given id. Also do some internal
   * bookkeeping.
   *
   * @internal
   */

  Dispatcher.prototype._invokeCallback = function _invokeCallback(id) {
    this._isPending[id] = true;
    this._callbacks[id](this._pendingPayload);
    this._isHandled[id] = true;
  };

  /**
   * Set up bookkeeping needed when dispatching.
   *
   * @internal
   */

  Dispatcher.prototype._startDispatching = function _startDispatching(payload) {
    for (var id in this._callbacks) {
      this._isPending[id] = false;
      this._isHandled[id] = false;
    }
    this._pendingPayload = payload;
    this._isDispatching = true;
  };

  /**
   * Clear bookkeeping used for dispatching.
   *
   * @internal
   */

  Dispatcher.prototype._stopDispatching = function _stopDispatching() {
    delete this._pendingPayload;
    this._isDispatching = false;
  };

  return Dispatcher;
})();

module.exports = Dispatcher;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ChartWrapper = __webpack_require__(3);

var _ChartWrapper2 = _interopRequireDefault(_ChartWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

ReactDOM.render(React.createElement(_ChartWrapper2.default, null), document.getElementById('chartHere'));

/***/ })
/******/ ]);