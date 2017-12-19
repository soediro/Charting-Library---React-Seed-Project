//modules
import { connect } from 'react-redux'

//actions
import { setChartContainer,
        addComparison,
        addStudy,
        removeComparison,
        removeStudy,
        toggleDrawing,
        toggleCrosshairs,
        setSpan,
        changeContainerSize,
        setPeriodicity,
        setChartType,
        toggleLoader,
        setRefreshInterval,
        setSymbol, 
        changingChartData,
        setPeriodicityWithLoader,
        toggleTimezoneModal} from '../actions/chartActions'

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
        showDrawingToolbar: state.chart.showDrawingToolbar,
        showCrosshairs: state.chart.showCrosshairs,
        showTimezoneModal: state.chart.showTimezoneModal,
        chartSeries: state.chart.chartSeries
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setChartContainer: (container) => {
            dispatch(setChartContainer(container))
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
        setSymbol: (symbol) => {
            dispatch(setSymbol(symbol))
        },
        setDrawingToolbarVisibility: () => {
            dispatch(setDrawingToolbarVisibility(ownProps.drawingToolbarVisible))
        },
        setPeriodicity: (period, interval) => {
            dispatch(setPeriodicity(period, interval))
        },
        setPeriodicityWithLoader: (periodicity) => {
            dispatch(setPeriodicityWithLoader(periodicity))
        },
        setChartType: (type) => {
            dispatch(setChartType(type))
        }
    }
}

const ChartContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Chart)

export default ChartContainer