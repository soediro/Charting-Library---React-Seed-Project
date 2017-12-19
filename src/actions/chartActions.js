import createTypes from 'redux-create-action-types'

/*
 * action types
 */
const Types = createTypes(
    'CHANGE_CHART_DATA',
    'SET_CHART_TYPE',
    'SET_CONTAINER',
    'SET_SYMBOL',
    'SET_REFRESH_INTERVAL',
    'ADD_COMPARISON',
    'ADD_STUDY',
    'REMOVE_COMPARISON',
    'REMOVE_STUDY',
    'SET_SPAN',
    'CHANGE_CONTAINER_SIZE',
    'SET_PERIODICITY',
    'TOGGLE_DRAWING',
    'TOGGLE_CROSSHAIRS',
    'TOGGLE_TIMEZONE_MODAL'
);

export default Types;

/*
 * action creators
 */

export function setChartContainer(container){
    return { type: 'SET_CONTAINER', container: container };
}

export function addComparison(symbol, params){
    return { type: 'ADD_COMPARISON', symbol:symbol, params: params}
}

export function removeComparison(comparison){
    return { type: 'REMOVE_COMPARISON', comparison:comparison }
}

export function toggleDrawing(visibility){
    return { type: 'TOGGLE_DRAWING', isVisible:visibility }
}

export function toggleCrosshairs(){
    return { type: 'TOGGLE_CROSSHAIRS' }
}

export function toggleTimezoneModal(){
    return { type: 'TOGGLE_TIMEZONE_MODAL' }
}

export function setSpan(span, multiplier){
    let params = {
        span: span,
        multiplier: multiplier
    }
    return { type:'SET_SPAN', params }
}

export function changeContainerSize(size){
    return { type: 'CHANGE_CONTAINER_SIZE', size: size }
}

export function changingChartData(isChanging){
    return {type: 'CHANGE_CHART_DATA', changing: isChanging }
}

export function setPeriodicityWithLoader(periodicity){
    //Using redux-thunk to dispatch multiple actions with a timeout
    //to emmulate an async call. This is to give the ChartEngine
    //time to adjust the chart
    return dispatch => Promise.all([
        dispatch(changingChartData(true)),
        dispatch(setPeriodicity(periodicity)),
        setTimeout(() => {
            dispatch(changingChartData(false))
        }, 1000)
    ])
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

export function setRefreshInterval(interval){
    return { type: 'SET_REFRESH_INTERVAL', interval: interval }
}

export function setSymbol(symbol){
    return { type: 'SET_SYMBOL', symbol: symbol }
}

export function addStudy(study){
    return { type: 'ADD_STUDY', study: study }
}

export function removeStudy(params){
    return { type: 'REMOVE_STUDY', params: params }
}