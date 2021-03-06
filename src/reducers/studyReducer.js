//actiont types
import Types from '../actions/studyActions'

const initialState = {
    showStudyModal: false,
    studyList: CIQ.Studies.studyLibrary,
    studyHelper: null,
    studyOverlay: {
        show: false,
        top: 0,
        left: 0
    }
}

const study = (state = initialState, action) => {
    switch(action.type){
        case Types.TOGGLE_STUDY_OVERLAY:
            let flipOverlay = !state.studyOverlay.show
            return Object.assign({}, state, {
                studyOverlay: {
                    show: flipOverlay,
                    top: action.params.stx.cy,
                    left: action.params.stx.cx
                },
                studyHelper: flipOverlay ? new CIQ.Studies.DialogHelper(action.params) : null
            })
        case Types.OPEN_STUDY_MODAL:
            let needsStudyHelper = action.params.hasOwnProperty('stx')
            return Object.assign({}, state, {
                showStudyModal: true,
                studyHelper: needsStudyHelper ? new CIQ.Studies.DialogHelper(action.params) : state.studyHelper,
                studyOverlay: {
                    show: false,
                    top: 0,
                    left: 0
                }
            })
        case Types.CLOSE_STUDY_MODAL:
            return Object.assign({}, state, {
                showStudyModal: false,
                studyOverlay: {
                    show: false,
                    top: 0,
                    left: 0
                },
                studyHelper: null
            })
        case Types.ADD_STUDY:
            let studyLookup = {}
            for(let libraryEntry in state.studyList){
                studyLookup[state.studyList[libraryEntry].name] = libraryEntry
            }
            CIQ.Studies.addStudy(action.ciq, studyLookup[action.study.name])
            return state
        case Types.UPDATE_STUDY:
            state.studyHelper.updateStudy({ inputs: action.inputs, outputs: action.outputs, parameters: action.parameters });
            return Object.assign({}, state, {
                showStudyModal: false,
                studyOverlay: {
                    show: false,
                    top: 0,
                    left: 0
                },
                studyHelper: null
            })
        case Types.REMOVE_STUDY:
            if(state.studyHelper !== null) CIQ.Studies.removeStudy(state.studyHelper.stx, state.studyHelper.sd)
            return Object.assign({}, state, {
                studyOverlay: {
                    show: false,
                    top: 0,
                    left: 0
                }
            })
        default:
            return state
    }
}

export default study