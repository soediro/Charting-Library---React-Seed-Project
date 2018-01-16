//actiont types
import Types from '../actions/studyActions'

const initialState = {
    showStudyOverlay: false,
    showStudyModal: false,
    studyList: CIQ.Studies.studyLibrary,
    studyHelper: null,
    overlayTop: 0,
    overlayLeft: 0
}

const study = (state = initialState, action) => {
    switch(action.type){
        case Types.TOGGLE_STUDY_OVERLAY:
        console.log('action.params: ', action.params)
            return Object.assign({}, state, {
                showStudyOverlay: !state.showStudyOverlay,
                overlayTop: action.params.stx.cy,
                overlayLeft: action.params.stx.cx,
                studyHelper: new CIQ.Studies.DialogHelper(action.params)
            })
        case Types.TOGGLE_STUDY_MODAL:
            return Object.assign({}, state, {
                showStudyModal: !state.showStudyModal,
                showStudyOverlay: state.showStudyModal
            })
        case Types.ADD_STUDY:
            let studyLookup = {}
            for(let libraryEntry in state.studyList){
                studyLookup[state.studyList[libraryEntry].name] = libraryEntry
            }
            CIQ.Studies.addStudy(action.ciq, studyLookup[action.study.name])
            return state
        case Types.REMOVE_STUDY:
            CIQ.Studies.removeStudy(params.stx, params.sd)
            return state
        default:
            return state
    }
}

export default study