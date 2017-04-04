var Dispatcher = require('./Dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


const constants = {
    "ADD_COMPARISON_SERIES": "ADD_COMPARISON_SERIES",
    "REMOVE_COMPARISON_SERIES": "REMOVE_COMPARISON_SERIES",
    "TOGGLE_DRAWING_TOOLBAR": "TOGGLE_DRAWING_TOOLBAR"
};

var ChartStore = assign({}, EventEmitter.prototype, {
    initialize: function () {
    },
    values: { comparisons: [], toolbarActive:false },
    getComparisons: function () {
        return this.values.comparisons;
    },
    addComparison: function (series) {
        this.values.comparisons.push(series);
    },
    removeComparison: function (series) {
        var index = this.values.comparisons.indexOf(series, 0);
        if (index > -1) {
            this.values.comparisons.splice(index, 1);
        }
    },
    addListener: function (events, callback) {
        for (var i = 0; i < events.length; i++) {
            this.on(events[i], callback);
        }
    },
    removeListener: function (events, callback) {
        for (var i = 0; i < events.length; i++) {
            this.removeListener(events[i], callback);
        }
    },
    toggleDrawingToolbar:function(){
        this.values.toolbarActive=!this.values.toolbarActive;
    },
    getToolbarStatus:function(){
        return this.values.toolbarActive;
    }
});

Dispatcher.register(function (action) {
    var actions = {
        "ADD_COMPARISON_SERIES": function () {
            ChartStore.addComparison(action.data);
            ChartStore.emit("comparisonsChange");
        },
        "REMOVE_COMPARISON_SERIES": function () {
            ChartStore.removeComparison(action.data);
            ChartStore.emit("comparisonsChange");
        },
        "TOGGLE_DRAWING_TOOLBAR":function () {
            ChartStore.toggleDrawingToolbar();
            ChartStore.emit("drawingToolbarChange");
        }
    };
    if (actions[action.actionType]) {
        actions[action.actionType]();
    }
});

var Actions = {
    addComparisonSeries: function (comparisons) {
        Dispatcher.dispatch({
            actionType: constants.ADD_COMPARISON_SERIES,
            data: comparisons
        });
    },
    removeComparisonSeries: function (comparisons) {
        Dispatcher.dispatch({
            actionType: constants.REMOVE_COMPARISON_SERIES,
            data: comparisons
        });
    },
    toggleDrawingToolbar: function (){
        Dispatcher.dispatch({
          actionType: constants.TOGGLE_DRAWING_TOOLBAR,
        });
    }
};
export { ChartStore, Actions }
