//action types
import Types from '../actions/chartActions'

//create a demo date feed
import ChartService from '../feeds/ChartService'
let service = new ChartService().makeFeed()

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
        interval: 1,
        timeUnit: 'day'
    },
    showPeriodicityLoader: false
}

const chart = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_CONTAINER:
      let ciq = new CIQ.ChartEngine({
        container: action.container
      })
      ciq.attachQuoteFeed(state.service, {refreshInterval:state.refreshInterval})
            ciq.setMarketFactory(CIQ.Market.Symbology.factory);
            // new CIQ.ExtendedHours({stx:stxx, filter:true});
      ciq.newChart(state.symbol)
      return Object.assign({}, state, {
        ciq: ciq
      })
    case Types.SET_CHART_TYPE:
            if ((action.chartType.aggregationEdit && state.ciq.layout.aggregationType != action.chartType.type) || action.chartType.type === 'heikinashi'){
        state.ciq.setChartType('candle')
                state.ciq.setAggregationType(action.chartType.type)
      } else {
        state.ciq.setAggregationType(null)
        state.ciq.setChartType(action.chartType.type)
      }
            state.ciq.draw()
      return Object.assign({}, state, {
        chartType: action.chartType.type
      })
    case Types.ADD_COMPARISON:
      let newSeries = state.ciq.addSeries(action.symbol, action.params);
            let oldComparisons = state.comparisons;
            oldComparisons.push(newSeries);
            let newComparisons = state.comparisons.concat([newSeries]);
      return Object.assign({}, state, {
                comparisons: newComparisons
      })
    case Types.REMOVE_COMPARISON:
            newComparisons = state.comparisons.filter(comp=>comp.id!==action.comparison)
      return Object.assign({}, state, {
                comparisons: newComparisons
      })
    case Types.TOGGLE_TIMEZONE_MODAL:
      return Object.assign({}, state, {
        showTimezoneModal: !state.showTimezoneModal
      })
        case Types.SET_TIME_ZONE:
            if(action.zone){
              state.ciq.setTimeZone(null, action.zone)
            } else {
              state.ciq.displayZone=null;
              state.ciq.setTimeZone();
            }
            if(state.ciq.displayInitialized) state.ciq.draw();
            return Object.assign({}, state);
    case Types.TOGGLE_CROSSHAIRS:
      state.ciq.layout.crosshair = !state.showCrosshairs
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
    case Types.CHANGE_VECTOR_LINE_PARAMS:
      state.ciq.currentVectorParameters.lineWidth = action.weight
      state.ciq.currentVectorParameters.pattern = action.pattern
      return state
    case Types.CHANGE_VECTOR_STYLE:
      let type = action.styleType

      if (type === "bold") {
        state.ciq.currentVectorParameters.annotation.font.weight = !action.style.bold ? "bold" : "normal"
      } else if (type === "italic") {
        state.ciq.currentVectorParameters.annotation.font.style = !action.style.italic ? "italic" : "normal"
      } else if (type === "family") {
        state.ciq.currentVectorParameters.annotation.font.family = action.style.family
      } else if (type === "size") {
        state.ciq.currentVectorParameters.annotation.font.size = action.style.size + 'px'
      } else if (type === "lineColor") {
        state.ciq.currentVectorParameters.currentColor = CIQ.hexToRgba('#' + action.style.color)
      } else if (type === "fillColor") {
        state.ciq.currentVectorParameters.fillColor = CIQ.hexToRgba('#' + action.style.color)
      } else return state

      return state
    case Types.SET_PERIODICITY:
            state.ciq.setPeriodicity(action.periodicity, ()=>{});
      return Object.assign({}, state, {
        periodicity: {
          period: action.periodicity.period,
                    interval: action.periodicity.interval,
                    timeUnit: action.periodicity.timeUnit
        }
      })
    case Types.SET_SYMBOL:
            state.ciq.newChart(action.symbol);
      return Object.assign({}, state, {
        symbol: action.symbol
      })
    case Types.SET_REFRESH_INTERVAL:
      return Object.assign({}, state, {
        interval: refreshInterval
      })
    case Types.SET_SPAN:

      var params = {
        multiplier: action.multiplier,
        base: action.base
      };

      if (action.interval) {
        params.periodicity = {
          interval: action.interval,
          period: action.period || 1,
          timeUnit: action.timeUnit
        }
      }

      state.ciq.setSpan(params, () => {
      })

      return state

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
