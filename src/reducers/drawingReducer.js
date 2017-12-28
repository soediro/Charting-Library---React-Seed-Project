//action types
import Types from '../actions/drawActions'

let tools = CIQ.Drawing.getDrawingToolList({});
let toolsArray = Object.keys(tools).map((key) => {
    return tools[key]
})

const initialState = {
    showDrawingToolbar: false,
    tools: toolsArray.sort(),
    selectedTool: null,
    fill: null,
    line: null,
    lineWidth: null,
    linePattern: null,
    fontOptions: null,
    fontFamily: null,
    fontSize: null,
    fontStyle: {
        bold: false,
        italic: false
    },
    color: null
}

const draw = (state = initialState, action) => {
    switch(action.type){
        case Types.TOGGLE_DRAWING:
            let elem = document.getElementById('chartContainer'),
            flipToolbar = !state.showDrawingToolbar

            if(flipToolbar){
                elem.classList.add('toolbarOn')
            }else{
                elem.classList.remove('toolbarOn')
            }

            return Object.assign({}, state, {
                showDrawingToolbar: flipToolbar,
                selectedTool: !flipToolbar ? null : state.selectedTool
            })
        case Types.SET_FONT_FAMILY:
            return Object.assign({}, state, {
                fontFamily: action.family
            })
        case Types.SET_FONT_SIZE:
            return Object.assign({}, state, {
                fontSize: action.size
            })
        case Types.SET_FONT_STYLE:
            if (action.styleType==="bold"){
                return Object.assign({}, state, {
                    fontStyle: {
                        bold: !state.fontStyle.bold,
                        italic: state.fontStyle.italic
                    }
                })
            }else if (action.styleType==="italic"){
                return Object.assign({}, state, {
                    fontStyle: {
                        bold: state.fontStyle.bold,
                        italic: !state.fontStyle.italic
                    }
                })
            }else return state
        case Types.SET_FONT_COLOR:
            return Object.assign({}, state, {
                color: action.color
            })
        case Types.SET_LINE_WIDTH:
            return Object.assign({}, state, {
                lineWidth: action.width
            })
        case Types.SET_LINE_STYLE:
            return Object.assign({}, state, {
                line: action.style
            })
        case Types.SET_FILL_STYLE:
            return Object.assign({}, state, {
                fill: action.style
            })
        case Types.CHANGE_TOOL:
            return Object.assign({}, state, {
                selectedTool: action.tool.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}),
                fontOptions: action.params.font ? action.params.font : null,
                fontSize: action.params.font ? action.params.font.size : null,
                fontFamily: action.params.font ? action.params.font.family : null,
                fill: action.params ? action.params.fillColor : null,
                line: action.params ? action.params.color : null,
                lineWidth: action.params ? action.params.lineWidth : null,
                linePattern: action.params ? action.params.pattern : null
            })
        case Types.CHANGE_LINE_PARAMS:
            return Object.assign({}, state, {
                lineWidth: action.weight,
                linePattern: action.pattern
            })
        default:
            return state
    }
}

export default draw