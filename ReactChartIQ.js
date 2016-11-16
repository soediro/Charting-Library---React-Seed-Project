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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ChartWrapper = React.createClass({
	  displayName: "ChartWrapper",

	  getInitialState: function getInitialState() {
	    return {
	      ciq: null,
	      feed: "Demo"
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    var self = this;
	    var ciq = new CIQ.ChartEngine({
	      container: $$$("#chartContainer")
	    });
	    //You can add an event listener to the window,however, older browsers don't support this.
	    window.addEventListener("resize", this.updateChartContainerSize);

	    this.setState({
	      ciq: ciq
	    }, function () {
	      this.attachFeed(this.props.feed ? this.props.feed : new CIQ.QuoteFeed[this.state.feed]());
	      ciq.newChart(this.props.symbol ? this.props.symbol : "AAPL");
	    });
	  },
	  getWindowSize: function getWindowSize() {
	    return {
	      width: window.innerWidth,
	      height: window.innerHeight
	    };
	  },
	  updateChartContainerSize: function updateChartContainerSize() {
	    var windowSize = this.getWindowSize();
	    document.getElementById("chartContainer").style.width = windowSize.width + "px";
	    document.getElementById("chartContainer").style.height = windowSize.height * .90 + "px";
	    this.state.ciq.resizeChart();
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
	    var windowSize = this.getWindowSize();

	    return React.createElement(
	      "div",
	      null,
	      React.createElement(_ui2.default, { ciq: this.state.ciq ? this.state.ciq : null }),
	      React.createElement("div", { id: "chartContainer", className: "chartContainer", style: { width: windowSize.width + "px", height: windowSize.height * .90 + "px", position: "relative" } })
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

	var _themeModal = __webpack_require__(4);

	var _themeModal2 = _interopRequireDefault(_themeModal);

	var _studyModal = __webpack_require__(6);

	var _studyModal2 = _interopRequireDefault(_studyModal);

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
	                React.createElement(StudyUI, { ciq: this.state.ciq }),
	                React.createElement(ThemeUI, { ciq: this.state.ciq }),
	                React.createElement(TimeZoneButton, { ciq: this.state.ciq })
	            ),
	            React.createElement(ChartSymbol, { ciq: this.state.ciq }),
	            React.createElement(Periodicity, { ciq: this.state.ciq }),
	            React.createElement(ChartTypes, { ciq: this.state.ciq }),
	            React.createElement(Crosshairs, { ciq: this.state.ciq }),
	            React.createElement(Comparison, { ciq: this.state.ciq })
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
	        var studies = Object.keys(CIQ.Studies.studyLibrary).map(function (study, index) {
	            return React.createElement(
	                "div",
	                { key: "study" + index, className: "option", onClick: function onClick() {
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
	            React.createElement(_studyModal2.default, { ref: "studyModal" }),
	            React.createElement(
	                "span",
	                { id: "studySelect" },
	                React.createElement(
	                    "span",
	                    null,
	                    "Add Study"
	                ),
	                React.createElement(
	                    "div",
	                    { className: "menu-hover" },
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
	                { onClick: this.onOptionClick },
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

	var ThemeUI = React.createClass({
	    displayName: "ThemeUI",

	    getInitialState: function getInitialState() {
	        return {
	            themeList: [{
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
	        var self = this;
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
	                "div",
	                { key: "theme" + index, className: "option", onClick: function onClick() {
	                        self.themeSelect(theme);
	                    } },
	                React.createElement(
	                    "span",
	                    null,
	                    theme.name
	                )
	            );
	        });
	        return React.createElement(
	            "div",
	            { id: "themeSelect" },
	            React.createElement(_themeModal2.default, { ref: "themeModal", themeHelper: this.state.themeHelper ? this.state.themeHelper : null }),
	            React.createElement(
	                "span",
	                null,
	                "Select Theme"
	            ),
	            React.createElement(
	                "div",
	                { className: "menu-hover" },
	                options
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
	    var self = this;
	    function addZone(zone) {
	      zones.push(React.createElement(
	        "span",
	        { key: "zone" + zone,
	          onClick: function onClick() {
	            self.setTimeZone(zone);
	          },
	          className: "timeZoneOption", style: { "display": "inline-block" } },
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
	    if (!this.state.open) return React.createElement("div", null);
	    return React.createElement(
	      "div",
	      { id: "timezoneDialog" },
	      React.createElement(
	        "div",
	        { className: "content", style: { "maxHeight": "300px", "overflow": "scroll" } },
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

	'use strict';

	var _colorPicker = __webpack_require__(5);

	var _colorPicker2 = _interopRequireDefault(_colorPicker);

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
	        if (!this.state.open) return React.createElement('div', null);
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
	                { key: "section" + sectionindex, className: section.class },
	                React.createElement(
	                    'div',
	                    { className: 'theme-field-name' },
	                    section.section
	                ),
	                swatches
	            );
	        });
	        return React.createElement(
	            'div',
	            { id: 'themeDialog' },
	            React.createElement(_colorPicker2.default, { ref: 'colorPicker' }),
	            React.createElement(
	                'div',
	                { className: 'content' },
	                React.createElement(
	                    'div',
	                    { className: 'heading' },
	                    'Custom Theme'
	                ),
	                sections,
	                React.createElement(
	                    'div',
	                    { className: 'theme-save' },
	                    React.createElement('input', { ref: 'themeName', type: 'text', onChange: this.updateThemeName }),
	                    React.createElement(
	                        'button',
	                        { className: 'largeBtn', onClick: this.saveSettings },
	                        'Save'
	                    ),
	                    React.createElement(
	                        'button',
	                        { className: 'largeBtn', onClick: this.closeDialog },
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

/***/ },
/* 5 */
/***/ function(module, exports) {

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

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _colorPicker = __webpack_require__(5);

	var _colorPicker2 = _interopRequireDefault(_colorPicker);

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
	    if (!this.state.open || !this.state.studyHelper) return React.createElement('div', null);
	    var self = this;
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
	      React.createElement(_colorPicker2.default, { ref: 'colorPicker' }),
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

/***/ }
/******/ ]);