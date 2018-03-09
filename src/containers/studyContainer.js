//modules
import { connect } from 'react-redux'

//actions
import { toggleOverlay,
         addStudy,
         updateStudy,
         removeStudy, 
         openStudyModal,
         closeStudyModal,
         removeAllStudies,
         syncStudies } from '../actions/studyActions'

//components
// import StudyUI from '../components/UI/StudyUI'
import UIStudyContainer from '../components/UI/UIStudyContainer';

const mapStateToProps = (state, props) => {
    return {
        uiType: props.uiType,
        studyOverlay: state.study.studyOverlay,
        showStudyModal: state.study.showStudyModal,
        studyHelper: state.study.studyHelper,
        studyList: state.study.studyList,
        studies: state.study.studies
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
        },
        removeAllStudies: () => {
            dispatch(removeAllStudies())
        },
        syncStudies: (params) => {
            dispatch(syncStudies(params))
        }
    }
}

const StudyContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UIStudyContainer)

export default StudyContainer