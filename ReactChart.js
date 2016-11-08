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
	        return React.createElement(
	            "div",
	            null,
	            React.createElement(_ui2.default, { ciq: this.state.ciq ? this.state.ciq : null }),
	            React.createElement("div", { id: "chartContainer", style: {
	                    width: "800px",
	                    height: "500px",
	                    position: "relative"
	                } })
	        );
	    }
	});

	ReactDOM.render(React.createElement(ChartWrapper, null), document.getElementById('chartHere'));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _themeModal = __webpack_require__(2);

	var _themeModal2 = _interopRequireDefault(_themeModal);

	var _studyModal = __webpack_require__(4);

	var _studyModal2 = _interopRequireDefault(_studyModal);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var UI = React.createClass({
	    displayName: "UI",

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    render: function render() {
	        return React.createElement(
	            "div",
	            { className: "" },
	            React.createElement(StudyUI, null),
	            React.createElement(ThemeUI, { ciq: this.props.ciq ? this.props.ciq : null }),
	            React.createElement(
	                "button",
	                null,
	                "Select Timezone"
	            )
	        );
	    }
	});

	var StudyUI = React.createClass({
	    displayName: "StudyUI",

	    getInitialState: function getInitialState() {
	        return {
	            ciq: null,
	            studyHelper: null
	        };
	    },
	    addStudy: function addStudy(study) {
	        var studyHelper = CIQ.Studies.DialogHelper({
	            name: study,
	            stx: this.state.ciq
	        });

	        ciq.callbacks.studyOverlayEdit = this.ctrl.openModal;
	        ciq.callbacks.studyPanelEdit = this.openModal;
	        CIQ.Studies.addStudy(this.state.ciq, ctrl.studyHelper.name, ctrl.studyHelper.libraryEntry.inputs, ctrl.studyHelper.libraryEntry.outputs, ctrl.studyHelper.libraryEntry.parameters);
	        this.setState({
	            studyHelper: studyHelper
	        });
	    },
	    openModal: function openModal() {
	        this.refs.studyModal.open();
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        if (nextProps.ciq) {
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
	            "div",
	            { id: "studySelect" },
	            React.createElement(_studyModal2.default, { ref: "studyModal" }),
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

	//ng-repeat="theme in cqNgUi.themes" ng-click="cqNgUi.handleThemeSelect(theme)"
	//ng-repeat="study in cqNgUi.studies.list | orderBy:study" ng-click="cqNgUi.launchStudyDialog(study)"
	//ng-click="cqNgUi.launchTimezoneDialog()"
	module.exports = UI;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _colorPicker = __webpack_require__(3);

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
/* 3 */
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
/* 4 */
/***/ function(module, exports) {

	"use strict";

	var StudyModal = React.createClass({
	    displayName: "StudyModal",

	    getInitialState: function getInitialState() {
	        return {
	            open: false,
	            studyHelper: {}
	        };
	    },
	    open: function open(studyHelper) {
	        this.setState({
	            open: true,
	            studyHelper: studyHelper
	        });
	    },

	    render: function render() {
	        if (!this.state.open) return React.createElement("div", null);
	        return React.createElement(
	            "div",
	            { id: "studyDialog" },
	            React.createElement(
	                "div",
	                { className: "content" },
	                React.createElement(
	                    "div",
	                    { className: "heading" },
	                    this.studyHelper ? this.studyHelper.Name : ""
	                ),
	                React.createElement("div", { id: "inputs" }),
	                React.createElement("div", { id: "outputs" }),
	                React.createElement("div", { id: "parameters" }),
	                React.createElement(
	                    "button",
	                    { className: "largeBtn" },
	                    "Save"
	                )
	            )
	        );
	    }
	});

	module.exports = StudyModal;

/***/ }
/******/ ]);