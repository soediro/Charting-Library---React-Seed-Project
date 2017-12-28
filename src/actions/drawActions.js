import createTypes from 'redux-create-action-types'

/*
 * action types
 */

const Types = createTypes(
    'TOGGLE_DRAWING',
    'SET_FONT_FAMILY',
    'SET_FONT_SIZE',
    'SET_FONT_STYLE',
    'SET_FONT_COLOR',
    'SET_LINE_WIDTH',
    'SET_LINE_STYLE',
    'SET_FILL_STYLE',
    'CHANGE_LINE_PARAMS',
    'CHANGE_TOOL'
)

export default Types

/*
 * action creators
 */

export function toggleDrawing(){
    return { type: 'TOGGLE_DRAWING' }
}

export function setFontFamily(family){
    return { type: 'SET_FONT_FAMILY', family: family }
}

export function setFontStyle(type){
    return { type: 'SET_FONT_STYLE', styleType: type }
}

export function setFontSize(size){
    return { type: 'SET_FONT_SIZE', size: size }
}

export function setFontColor(color){
    return { type: 'SET_FONT_COLOR', color: color }
}

export function setLineWidth(width){
    return { type: 'SET_LINE_WIDTH', width: width }
}

export function setLineStyle(style){
    return { type: 'SET_LINE_STYLE', style: style }
}

export function setFillStyle(style){
    return { type: 'SET_FILL_STYLE', style: style }
}

export function setLineParams(weight, pattern){
    return { type: 'CHANGE_LINE_PARAMS', weight: weight, pattern: pattern }
}

export function changeTool(tool, params){
    return { type: 'CHANGE_TOOL', tool: tool, params: params }
}