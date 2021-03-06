//modules
import { connect } from 'react-redux'

//actions
import { toggleOverlay,
         addStudy,
         updateStudy,
         removeStudy, 
         openStudyModal,
         closeStudyModal} from '../actions/studyActions'

//components
import StudyUI from '../components/UI/StudyUI'

const mapStateToProps = (state, props) => {
    return {
        studyOverlay: state.study.studyOverlay,
        showStudyModal: state.study.showStudyModal,
        studyHelper: state.study.studyHelper,
        studyList: state.study.studyList
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
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
        }
    }
}

const StudyContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(StudyUI)

export default StudyContainer