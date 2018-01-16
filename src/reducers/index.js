import { combineReducers } from 'redux'
import chart from './chartReducer'
import draw from './drawingReducer'
import study from './studyReducer'

const reducer = combineReducers({
    chart,
    draw,
    study
});

export default reducer