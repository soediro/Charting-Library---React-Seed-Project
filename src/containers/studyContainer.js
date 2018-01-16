//modules
import { connect } from 'react-redux'

//actions
import { toggleStudyModal,
         toggleOverlay,
         addStudy,
         removeStudy } from '../actions/studyActions'

//components
import StudyUI from '../components/UI/StudyUI'

const mapStateToProps = (state, props) => {
    return {
        showStudyOverlay: state.study.showStudyOverlay,
        showStudyModal: state.study.showStudyModal,
        studyHelper: state.study.studyHelper,
        studyList: state.study.studyList,
        overlayTop: state.study.overlayTop,
        overlayLeft: state.study.overlayLeft
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