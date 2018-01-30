//modules
import { connect } from 'react-redux'

//actions
import { setChartContainer,
        addComparison,
        removeComparison,
        toggleCrosshairs,
        setSpanWithLoader,
        shareChart,
        setShareStatus,
        changeContainerSize,
        changeVectorParams,
        changeVectorLineParams,
        changeVectorStyle,
        setPeriodicity,
        setChartType,
        toggleLoader,
        setRefreshInterval,
        setSymbol,
        changingChartData,
        setPeriodicityWithLoader,
        toggleTimezoneModal,
        setTimeZone,
        draw,
        toggleAxisLabels } from '../actions/chartActions'

import { toggleDrawing } from '../actions/drawActions'

//components
import Chart from '../components/Chart'

const mapStateToProps = (state, props) => {
    return {
        ciq: state.chart.ciq,
        chartType: state.chart.chartType,
        periodicity: state.chart.periodicity,
        isLoadingPeriodicity: state.chart.isLoadingPeriodicity,
        comparisons: state.chart.comparisons,
        service: state.chart.service,
        symbol: state.chart.symbol,
        refreshInterval: state.chart.refreshInterval,
        showCrosshairs: state.chart.showCrosshairs,
        showTimezoneModal: state.chart.showTimezoneModal,
        showAxisLabels: state.chart.showAxisLabels,
        setTimeZone: state.chart.setTimeZone,
        chartSeries: state.chart.chartSeries,
        shareStatus: state.chart.shareStatus,
        shareStatusMsg : state.chart.shareStatusMsg
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setChartContainer: (container) => {
      dispatch(setChartContainer(container))
    },
    changeVectorParams: (tool) => {
      dispatch(changeVectorParams(tool))
    },
    changeVectorLineParams: (weight, pattern) => {
      dispatch(changeVectorLineParams(weight, pattern))
    },
    changeVectorStyle: (styleType, style) => {
      dispatch(changeVectorStyle(styleType, style))
    },
    addComparison: (comparison, color) => {
      dispatch(addComparison(comparison, color))
    },
    addStudy: (study) => {
      dispatch(addStudy(study))
    },
    removeComparison: (comparison) => {
      dispatch(removeComparison(comparison))
    },
    removeStudy: (params) => {
      dispatch(removeStudy(params))
    },
    toggleCrosshairs: () => {
      dispatch(toggleCrosshairs())
    },
    toggleTimezoneModal: () => {
      dispatch(toggleTimezoneModal())
    },
        setTimeZone: (zone) => {
          dispatch(setTimeZone(zone))
        },
        setSymbol: (symbol) => {
            dispatch(setSymbol(symbol))
        },
        toggleDrawingToolbar: () => {
            Promise.all([
                dispatch(toggleDrawing()),
                dispatch(changeVectorParams())
            ])
        },
        setPeriodicity: (period, interval) => {
            dispatch(setPeriodicity(period, interval))
        },
        setPeriodicityWithLoader: (periodicity) => {
            dispatch(setPeriodicityWithLoader(periodicity))
        },
        setChartType: (type) => {
            dispatch(setChartType(type))
        },
        setSpanWithLoader: (multiplier, base, interval, period, timeUnit) => {
            dispatch(setSpanWithLoader(multiplier, base, interval, period, timeUnit))
        },
        draw: () => {
            dispatch(draw())
        },
        toggleAxisLabels: () => {
            dispatch(toggleAxisLabels())
        }
    }
  }
}


const ChartContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Chart)

export default ChartContainer
