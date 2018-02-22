//modules
import { connect } from 'react-redux'

//actions
import { setChartContainer,
        addComparisonAndSave,
        removeComparisonAndSave,
        toggleCrosshairsAndSave,
        setSpanWithLoader,
        shareChart,
        setShareStatus,
        changeVectorParams,
        changeVectorLineParams,
        changeVectorStyle,
        setPeriodicity,
        setChartType,
        toggleLoader,
        setSymbolAndSave,
        changingChartData,
        setPeriodicityWithLoader,
        toggleTimezoneModal,
        setTimeZone,
        draw,
        toggleAxisLabels,
        undo,
        redo,
        clear,
        importDrawings,
        saveLayout } from '../actions/chartActions'

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
        shareStatusMsg : state.chart.shareStatusMsg,
        drawings: state.chart.drawings,
        canUndo: state.chart.canUndo,
        canRedo: state.chart.canRedo,
        canClear: state.chart.canClear
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setChartContainer: (container) => {
      dispatch(setChartContainer(container))
    },
    importDrawings: () => {
      dispatch(importDrawings())
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
    addComparisonAndSave: (symbol, params) => {
      dispatch(addComparisonAndSave(symbol, params))
    },
    addStudy: (study) => {
      dispatch(addStudy(study))
    },
    removeComparisonAndSave: (comparison) => {
      dispatch(removeComparisonAndSave(comparison))
    },
    removeStudy: (params) => {
      dispatch(removeStudy(params))
    },
    toggleCrosshairsAndSave: () => {
      dispatch(toggleCrosshairsAndSave())
    },
    toggleTimezoneModal: () => {
      dispatch(toggleTimezoneModal())
    },
    setTimeZone: (zone) => {
      dispatch(setTimeZone(zone))
    },
    setSymbolAndSave: (symbol) => {
      dispatch(setSymbolAndSave(symbol))
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
    undo: () => {
        dispatch(undo())
    },
    redo: () => {
        dispatch(redo())
    },
    clear: () => {
      dispatch(clear())
    },
    toggleAxisLabels: () => {
        dispatch(toggleAxisLabels())
    },
    saveLayout: () => {
      dispatch(saveLayout())
    }
  }
}


const ChartContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Chart)

export default ChartContainer
