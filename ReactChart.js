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

	var _themeModal = __webpack_require__(4);

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

	    componentWillMount: function componentWillMount() {},
	    componentWillUpdate: function componentWillUpdate(nextProp, nextState) {
	        /// Catch new props here
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
	    },
	    render: function render() {
	        console.log("Chart Render Here");
	        return React.createElement(
	            "div",
	            null,
	            React.createElement(_ui2.default, { ciq: this.state.ciq }),
	            React.createElement(_themeModal2.default, null),
	            React.createElement("div", { id: "chartContainer", style: { width: "800px", height: "500px", position: "relative" } })
	        );
	    }
	});

	ReactDOM.render(React.createElement(ChartWrapper, null), document.getElementById('chartHere'));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _React$createClass;

	var _ui = __webpack_require__(2);

	var _ui2 = _interopRequireDefault(_ui);

	var _timezoneModal = __webpack_require__(3);

	var _timezoneModal2 = _interopRequireDefault(_timezoneModal);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
	            "div",
	            null,
	            React.createElement(
	                "div",
	                { className: "" },
	                React.createElement(
	                    "span",
	                    { id: "studySelect", style: { display: "inline-block" } },
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
	                    "span",
	                    { id: "themeSelect", style: { display: "inline-block" } },
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
	                React.createElement(TimeZoneButton, null)
	            ),
	            React.createElement(ChartSymbol, { ciq: this.state.ciq }),
	            React.createElement(Periodicity, { ciq: this.state.ciq }),
	            React.createElement(ChartTypes, { ciq: this.state.ciq }),
	            React.createElement(Crosshairs, { ciq: this.state.ciq }),
	            React.createElement(Comparison, { ciq: this.state.ciq })
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
	            { style: { display: "inline-block" } },
	            React.createElement(_timezoneModal2.default, { ref: "modal", ciq: this.state.ciq }),
	            " ",
	            React.createElement(
	                "button",
	                { onClick: this.onClick },
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
	            React.createElement("input", { id: "symbolInput", type: "text", defaultValue: this.state.symbol, onChange: function onChange(event) {
	                    self.onChange(event.nativeEvent);
	                } }),
	            React.createElement(
	                "button",
	                { onClick: this.onOptionClick },
	                "Set Symbol"
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
	                "div",
	                { key: "period" + index, className: "option", onClick: function onClick() {
	                        self.onOptionClick(item.period, item.interval, index);
	                    } },
	                React.createElement(
	                    "span",
	                    null,
	                    item.label
	                )
	            );
	        });

	        return React.createElement(
	            "div",
	            { id: "periodicitySelect" },
	            React.createElement(
	                "span",
	                null,
	                this.state.activeOption ? this.state.activeOption.label : null
	            ),
	            React.createElement(
	                "div",
	                { className: "menu-hover" },
	                options
	            )
	        );
	    }
	});

	var ChartTypes = React.createClass((_React$createClass = {
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
	                ciq: nextProps.ciq
	            });
	        }
	    }
	}, _defineProperty(_React$createClass, "componentWillReceiveProps", function componentWillReceiveProps(nextProps) {
	    if (nextProps.ciq) {
	        return this.setState({
	            ciq: nextProps.ciq,
	            activeOption: this.getCurrentOption(nextProps.ciq.layout)
	        });
	    }
	}), _defineProperty(_React$createClass, "getCurrentOption", function getCurrentOption(layout) {
	    for (var i = 0; i < _ui2.default.chartTypes.types.length; i++) {
	        var option = _ui2.default.chartTypes.types[i];
	        if (layout.chartType === option.type) {
	            return option;
	        }
	    }
	    return _ui2.default.chartTypes.types[0];
	}), _defineProperty(_React$createClass, "render", function render() {
	    var self = this;
	    console.log("layout", this.state.ciq ? this.state.ciq.layout : "no layout");
	    var options = _ui2.default.chartTypes.types.map(function (item, index) {
	        return React.createElement(
	            "div",
	            { key: "type" + index, className: "option", onClick: function onClick() {
	                    self.onOptionClick(item, index);
	                } },
	            React.createElement(
	                "span",
	                null,
	                item.label
	            )
	        );
	    });

	    return React.createElement(
	        "div",
	        { id: "chartTypeSelect" },
	        React.createElement(
	            "span",
	            null,
	            this.state.activeOption ? this.state.activeOption.label : this.state.activeOption
	        ),
	        React.createElement(
	            "div",
	            { className: "menu-hover" },
	            options
	        )
	    );
	}), _React$createClass));
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
	            React.createElement("input", { onChange: function onChange(event) {
	                    self.compareChange(event.nativeEvent);
	                }, id: "symbolCompareInput", type: "text" }),
	            React.createElement(
	                "button",
	                null,
	                "Add Comparison"
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
	            React.createElement(
	                "button",
	                { onClick: this.onClick },
	                "Crosshairs"
	            )
	        );
	    }
	});

	module.exports = UI;

/***/ },
/* 2 */
/***/ function(module, exports) {

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

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	var TimeZone = React.createClass({
	  displayName: "TimeZone",

	  getInitialState: function getInitialState() {
	    var zones = [];
	    for (var zone in CIQ.timeZoneMap) {
	      zones.push(React.createElement(
	        "span",
	        { key: "zone" + zone, className: "timeZoneOption", style: { "display": "inline-block" } },
	        CIQ.timeZoneMap[zone]
	      ));
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
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.ciq) {
	      return this.setState({
	        ciq: nextProps.ciq
	      });
	    }
	  },

	  render: function render() {
	    var self = this;
	    if (!this.state.open) return React.createElement("div", null);
	    return React.createElement(
	      "div",
	      { id: "timezoneDialog" },
	      React.createElement(
	        "div",
	        { className: "content", style: { "max-height": "500px", "overflow": "scroll" } },
	        React.createElement(
	          "h2",
	          { className: "center" },
	          "Time Zones"
	        ),
	        React.createElement(
	          "div",
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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _colorPicker = __webpack_require__(5);

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
	            open: false
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
/* 5 */
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