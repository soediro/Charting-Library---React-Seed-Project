//modules
import { connect } from 'react-redux'

//actions
import { toggleOverlay,
         addStudy,
         updateStudy,
         removeStudy, 
         openStudyModal,
         closeStudyModal} from '../actions/studyActions'

import { saveLayout } from '../actions/chartActions'

//components
import StudyUI from '../components/UI/StudyUI'

const mapStateToProps = (state) => {
    return {
        studyOverlay: state.study.studyOverlay,
        showStudyModal: state.study.showStudyModal,
        studyHelper: state.study.studyHelper,
        studyList: state.study.studyList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openStudyModal: (params) => {
            dispatch(openStudyModal(params))
        },
        closeStudyModal: () => {
            dispatch(closeStudyModal())
        },
        toggleOverlay: (params) => {
            dispatch(toggleOverlay(params))
        },
        addStudy: (ciq, study) => {
            dispatch(addStudy(ciq, study))
        },
        updateStudy: (inputs, outputs, parameters) => {
            dispatch(updateStudy(inputs, outputs, parameters))
        },
        removeStudy: (params) => {
            dispatch(removeStudy(params))
        },
        saveLayout: () => {
            dispatch(saveLayout())
        }
    }
}

const StudyContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(StudyUI)

export default StudyContainer