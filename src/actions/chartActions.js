import createTypes from 'redux-create-action-types';

/*
 * action types
 */
const Types = createTypes(
    'CHANGE_CHART_DATA',
    'SET_CHART_TYPE',
    'SET_CONTAINER',
    'IMPORT_LAYOUT',
    'IMPORT_DRAWINGS',
    'SET_SYMBOL',
    'ADD_COMPARISON',
    'REMOVE_COMPARISON',
    "SHARE_CHART",
    "SET_SHARE_STATUS",
    'CHANGE_VECTOR_PARAMS',
    'CHANGE_VECTOR_STYLE',
    'CHANGE_VECTOR_LINE_PARAMS',
    'TOGGLE_AXIS_LABELS',
    'SET_PERIODICITY',
    'TOGGLE_CROSSHAIRS',
    'TOGGLE_TIMEZONE_MODAL',
    'DRAW',
    'DRAWINGS_CHANGED',
    'CREATE_UNDO_STAMP',
    'UPDATE_UNDO_STAMPS',
    'UNDO',
    'REDO',
    'CLEAR'
);

export default Types;

/*
 * action creators
 */

export function setChartContainer(container){
    return (dispatch, getState) => {

			let getCurrentComparisons = (ciq)=> {
				return Object.keys(ciq.chart.series).
				filter((s)=>ciq.chart.series[s].parameters.isComparison).
				map((s)=>ciq.chart.series[s])
			}

        return Promise.all([
            dispatch(setContainer(container)),
            dispatch(changingChartData(true)),
            setTimeout(() => {
								dispatch(importDrawings())
								dispatch(addComparison(getCurrentComparisons(getState().chart.ciq)))
                dispatch(changingChartData(false))
            }, 2500)
        ]);
    }
}

export function setContainer(container){
    return { type: 'SET_CONTAINER', container: container };
}

export function importDrawings(){
    return { type: 'IMPORT_DRAWINGS' }
}

export function addComparisonAndSave(symbol, params){
    return (dispatch, getState) => {
        let state = getState();
        return Promise.all([
            state.chart.ciq.addSeries(symbol, params, (err, series) => {
                dispatch(addComparison(series));
                dispatch(saveLayout());
            })
        ]);
    };
}

export function addComparison(series){
    return { type: 'ADD_COMPARISON', series: series }
}

export function removeComparisonAndSave(comparison){
    return (dispatch) => {
        return Promise.all([
            dispatch(removeComparison(comparison)),
            dispatch(saveLayout())
        ]);
    };
}

export function removeComparison(comparison){
    return { type: 'REMOVE_COMPARISON', comparison:comparison }
}

export function toggleCrosshairsAndSave(){
    return (dispatch) => {
        return Promise.all([
            dispatch(toggleCrosshairs()),
            dispatch(saveLayout())
        ]);
    };
}

export function toggleCrosshairs(){
    return { type: 'TOGGLE_CROSSHAIRS' }
}

export function toggleTimezoneModal(){
    return { type: 'TOGGLE_TIMEZONE_MODAL' }
}

export function setTimeZone(zone){
    return (dispatch, getState) => {
        let state = getState();
        return Promise.all([
            state.chart.ciq.setTimeZone(null, zone),
            dispatch(changingChartData(true)),
            setTimeout(() => {
                dispatch(draw()),
                dispatch(saveLayout()),
                dispatch(changingChartData(false))
            }, 1500)
        ]);
    }
}

export function setSpanWithLoader(multiplier, base, interval, period, timeUnit){

	var params = {
		multiplier: multiplier,
		base: base
	};

	if (interval) {
		params.periodicity = {
			interval: interval,
			period: period || 1,
			timeUnit: timeUnit
		}
	}

	return (dispatch, getState) => {
		var state = getState()
		return Promise.all([
            dispatch(changingChartData(true)),
            state.chart.ciq.setSpan(params, () => {
                dispatch(changingChartData(false))
                dispatch(setPeriodicity(
                    {
                        period: state.chart.ciq.layout.period,
                        interval: state.chart.ciq.layout.interval,
                        timeUnit: state.chart.ciq.layout.timeUnit
                    }
                ))
            })
        ])
    }
}

export function shareChart(){
  return { type:'SHARE_CHART'}
}

export function setShareStatus(status, msg){
  return { type:'SET_SHARE_STATUS', status: status, msg: msg}
}

export function changingChartData(isChanging){
    return { type: 'CHANGE_CHART_DATA', changing: isChanging }
}

export function changeVectorParams(tool){
    return { type: 'CHANGE_VECTOR_PARAMS', tool: tool }
}

export function changeVectorLineParams(weight, pattern){
    return { type: 'CHANGE_VECTOR_LINE_PARAMS', weight: weight, pattern: pattern }
}

export function changeVectorStyle(type, style){
    return { type: 'CHANGE_VECTOR_STYLE', styleType: type, style: style }
}

export function setPeriodicityWithLoader(periodicity){
	return (dispatch, getState) => {
		var state = getState()
		return Promise.all([
		dispatch(changingChartData(true)),
		state.chart.ciq.setPeriodicity(periodicity, () => {
			dispatch(changingChartData(false))
			dispatch(setPeriodicity(
				{
					period: state.chart.ciq.layout.period,
					interval: state.chart.ciq.layout.interval,
					timeUnit: state.chart.ciq.layout.timeUnit
				}
			))
		})
	])
}
}

export function setPeriodicity(periodicity){
    return { type: 'SET_PERIODICITY', periodicity:periodicity }
}

export function setChartTypeWithLoader(type){
    //Using redux-thunk to dispatch multiple actions with a timeout
    //to emmulate an async call. This is to give the ChartEngine
    //time to adjust the chart
    return dispatch => Promise.all([
        dispatch(changingChartData(true)),
        dispatch(setChartType(type)),
        setTimeout(() => {
            dispatch(changingChartData(false))
        }, 1000)
    ])
}

export function setChartType(type){
    return { type: 'SET_CHART_TYPE', chartType: type }
}

export function setSymbolAndSave(symbol){
    return (dispatch, getState) => {
        let state = getState();
        if(symbol && symbol !== null){
            return Promise.all([
                state.chart.ciq.newChart(symbol, null, state.ciq, () => {
                    dispatch(setSymbol(symbol));
                    dispatch(saveLayout());
                })
            ]);
        }
        return;
    };
}

export function setSymbol(symbol){
    return { type: 'SET_SYMBOL', symbol: symbol }
}

export function draw(){
    return { type: 'DRAW' }
}

export function createUndoStamp(before, after){
    return (dispatch, getState) => {
        let state = getState();
        state.chart.ciq.undoStamp(before, after);
        state.chart.ciq.undoStamps.pop();
        console.log(state.chart.ciq.undoStamps)
        dispatch(updateUndoStamps());
    }
}

export function updateUndoStamps(){
    return { type: 'UPDATE_UNDO_STAMPS' }
}

export function undo(){
    return (dispatch, getState) => {
        let state = getState();
        state.chart.ciq.undoLast();
        dispatch(undid());
    };
}

export function undid(){
    return { type: 'UNDO' }
}

export function redo(){
    return (dispatch, getState) => {
        let state = getState();

        // before = state.chart.ciq.drawingObjects;
        state.chart.ciq.drawingObjects=state.chart.oldDrawings;
        // let after = state.chart.ciq.drawingObjects;
        dispatch(redid());
        // return Promise.all([
        //     dispatch(createUndoStamp(before, after)),
        //     dispatch(redid()),
        //     dispatch(saveLayout())
        // ]);
    }
}

export function redid(){
    return { type: 'REDO' }
}

export function clear(){
    return (dispatch, getState) => {
        let state = getState();
        // oldDrawings = state.chart.ciq.drawingObjects;
        state.chart.ciq.clearDrawings();
        // return Promise.all([
        //     dispatch(createUndoStamp(oldDrawings, [])),
        //     dispatch(saveLayout()),
        //     dispatch(cleared())
        // ]);
    };
}

// export function cleared(){
//     return { type: 'CLEAR' }
// }

export function drawingsChanged(params){
    console.log('drawingsChanged: ', params);
    return (dispatch, getState) => {
        let state = getState(),
        oldDrawings = state.chart.drawings;
        let tmp = params.drawings;
        if(tmp.length===0){
            CIQ.localStorage.removeItem(state.chart.ciq.chart.symbol);
        }else{
            CIQ.localStorageSetItem(state.chart.ciq.chart.symbol, tmp);
        }
        if (tmp.length!==0) {
            console.log('creating undo stamp with oldDrawings: ', oldDrawings, ' and tmp: ', tmp);
            return Promise.all([
                dispatch(changeDrawings()),
                dispatch(createUndoStamp(oldDrawings, tmp)),
                dispatch(saveLayout())
            ]);
        } else {
            console.log('not creating undo stamp');
            dispatch(changeDrawings());
            return dispatch(saveLayout());
        }
    }
}

export function changeDrawings(){
    return { type: 'DRAWINGS_CHANGED' }
}

export function saveLayout(){
    return (dispatch, getState) => {
        let state = getState(),
        savedLayout = JSON.stringify(state.chart.ciq.exportLayout({ withSymbols: true }));
        CIQ.localStorageSetItem("myChartLayout", savedLayout);
        CIQ.localStorageSetItem('myChartPreferences', JSON.stringify(state.chart.ciq.exportPreferences()));
    }
}
