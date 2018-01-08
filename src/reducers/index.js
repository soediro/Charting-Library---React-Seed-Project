import { combineReducers } from 'redux'
import chart from './chartReducer'
import draw from './drawingReducer'
import theme from './themeReducer'

const reducer = combineReducers({
    chart,
    draw,
    theme
});

export default reducer