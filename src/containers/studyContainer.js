//modules
import { connect } from 'react-redux'

//actions
import { toggleStudyModal,
         toggleOverlay,
         addStudy,
         updateStudy,
         removeStudy } from '../actions/studyActions'

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
        toggleStudyModal: (params) => {
            dispatch(toggleStudyModal(params))
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