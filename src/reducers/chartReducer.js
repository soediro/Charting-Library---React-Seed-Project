//action types
import Types from '../actions/chartActions';

//create a demo date feed
import FeedService from '../feeds/template'
let service = new FeedService().makeFeed()

//initial state
const initialState = {
    ciq: null,
    service:service,
    chartType: null,
    refreshInterval: 1,
    symbol: 'AAPL',
    showDrawingToolbar: false,
    showCrosshairs: false,
    showTimezoneModal: false,
    chartSeries: [],
    comparisons: [],
    periodicity:{
        period: 1,
        interval: "day"
    },
    showPeriodicityLoader: false
}

const chart = (state = initialState, action) => {
    switch(action.type){
        case Types.SET_CONTAINER:
            let ciq = new CIQ.ChartEngine({
                container: action.container
            })
            ciq.attachQuoteFeed(state.service, state.refreshInterval)
            ciq.newChart(state.symbol)
            return Object.assign({}, state, {
                ciq: ciq
            })
        case Types.SET_CHART_TYPE:
            if ((action.chartType.aggregationEdit && state.ciq.layout.aggregationType != action.chartType.type) || action.chartType.type == 'heikinashi'){
                state.ciq.setChartType('candle')
                state.ciq.setAggregationType(type)
            } else {
                state.ciq.setAggregationType(null)
                state.ciq.setChartType(action.chartType.type)
            }
            return Object.assign({}, state, {
                chartType: action.chartType.type
            })
        case Types.ADD_COMPARISON:
            let newSeries = state.ciq.addSeries(action.symbol, action.params);
            let oldComparisons = state.comparisons;
            oldComparisons.push(newSeries);
            return Object.assign({}, state, {
                comparisons: oldComparisons
            })
        case Types.REMOVE_COMPARISON:
            let index = state.comparisons.indexOf(action.comparison);
            return Object.assign({}, state, {
                comparisons: state.comparisons.splice(index, 1)
            })
        case Types.TOGGLE_TIMEZONE_MODAL:
            return Object.assign({}, state, {
                showTimezoneModal: !state.showTimezoneModal
            })
        case Types.TOGGLE_CROSSHAIRS:
            state.ciq.layout.crosshair=!state.showCrosshairs
            return Object.assign({}, state, {
                showCrosshairs: !state.showCrosshairs
            })
        case Types.CHANGE_CHART_DATA:
            return Object.assign({}, state, {
                isLoadingPeriodicity: action.changing
            })
        case Types.CHANGE_VECTOR_PARAMS:
            let style = state.ciq.canvasStyle('stx_annotation')
            if (style) {
				state.ciq.currentVectorParameters.annotation.font.size = style.size
				state.ciq.currentVectorParameters.annotation.font.family = style.family
				state.ciq.currentVectorParameters.annotation.font.style = style.style
				state.ciq.currentVectorParameters.annotation.font.weight = style.weight
            }
            state.ciq.changeVectorType(action.tool)
            return state
        case Types.CHANGE_VECTOR_STYLE:
            let type = action.styleType,
            styleClass = 'normal'

            if (type==="bold"){
                type = 'fontWeight'
                if(!action.style.bold) styleClass = 'bold'
            }else if (type==="italic"){
                type = "fontStyle"
                if(!action.style.italic) styleClass = 'italic'
            }else if(type==="family"){
                type = "fontFamily"
                if(action.style.family) styleClass = action.family
            }
            else return state

            state.ciq.changeVectorParameter(type, styleClass)
            return state
        case Types.SET_PERIODICITY:
            state.ciq.setPeriodicityV2(action.periodicity.period, action.periodicity.interval);
            return Object.assign({}, state, {
                periodicity:{
                    period: action.periodicity.period,
                    interval: action.periodicity.interval
                }
            })
        case Types.SET_SYMBOL:
            return Object.assign({}, state, {
                symbol: action.symbol
            })
        case Types.SET_REFRESH_INTERVAL:
            return Object.assign({}, state, {
                interval: refreshInterval
            })
        case Types.ADD_STUDY:
            CIQ.Studies.addStudy(state.ciq, action.study)
            return state
        case Types.REMOVE_STUDY:
            CIQ.Studies.removeStudy(params.stx, params.sd)
            return state
        case Types.DRAW:
            state.ciq.draw()
            return state
        default:
            return state
    }       
}

export default chart;
