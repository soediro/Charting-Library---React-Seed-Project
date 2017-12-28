import { combineReducers } from 'redux'
import chart from './chartReducer'
import draw from './drawingReducer'

const reducer = combineReducers({
    chart,
    draw
});

export default reducer