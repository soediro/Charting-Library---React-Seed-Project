//modules
import { connect } from 'react-redux'

//actions
import { toggleDrawing,
         setFontFamily,
         setFontStyle,
         setFontSize,
         setLineWidth,
         setLineStyle,
         setFillStyle,
         setFillColor,
         setLineColor,
         setLineParams,
         changeTool} from '../actions/drawActions'

import { draw } from '../actions/chartActions'

//components
import DrawingToolbar from '../components/DrawingToolbar'

const mapStateToProps = (state, props) => {
    return {
        showDrawingToolbar: state.draw.showDrawingToolbar,
        tools: state.draw.tools,
        selectedTool: state.draw.selectedTool,
        fill: state.draw.fill,
        line: state.draw.line,
        lineWidth: state.draw.lineWidth,
        linePattern: state.draw.linePattern,
        fontOptions: state.draw.fontOptions,
        fontFamily: state.draw.fontFamily,
        fontSize: state.draw.fontSize,
        fontStyle: state.draw.fontStyle,
        color: state.draw.color
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        toggleDrawing: () => {
            dispatch(toggleDrawing())
        },
        setFontFamily: (family) => {
            dispatch(setFontFamily(family))
        },
        setFontStyle: (styleType) => {
            dispatch(setFontStyle(styleType))
        },
        setFontSize: (size) => {
            dispatch(setFontSize(size))
        },
        setFillColor: (color) => {
            dispatch(setFillColor(color))
        },
        setLineColor: (color) => {
            dispatch(setLineColor(color))
        },
        setFillStyle: (style) => {
            dispatch(setLineStyle(style))
        },
        setLineParams: (weight, pattern) => {
            dispatch(setLineParams(weight, pattern))
        },
        changeTool: (tool, params) => {
            dispatch(changeTool(tool, params))
        },
        draw: () => {
            dispatch(draw())
        }
    }
}

const DrawingContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DrawingToolbar)

export default DrawingContainer