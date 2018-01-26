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
    'REMOVE_COMPARISON',
    'CHANGE_CONTAINER_SIZE',
    'CHANGE_VECTOR_PARAMS',
    'CHANGE_VECTOR_STYLE',
    'CHANGE_VECTOR_LINE_PARAMS',
    'SET_PERIODICITY',
    'TOGGLE_CROSSHAIRS',
    'TOGGLE_TIMEZONE_MODAL',
    'SET_TIME_ZONE',
    'DRAW'
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

export function toggleCrosshairs(){
    return { type: 'TOGGLE_CROSSHAIRS' }
}

export function toggleTimezoneModal(){
    return { type: 'TOGGLE_TIMEZONE_MODAL' }
}

export function setTimeZone(zone){
  return { type: 'SET_TIME_ZONE', zone: zone }
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

export function changeContainerSize(size){
    return { type: 'CHANGE_CONTAINER_SIZE', size: size }
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
			console.log(state.chart.ciq.layout)
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

export function setRefreshInterval(interval){
    return { type: 'SET_REFRESH_INTERVAL', interval: interval }
}

export function setSymbol(symbol){
    return { type: 'SET_SYMBOL', symbol: symbol }
}

export function draw(){
    return { type: 'DRAW' }
}
